import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BarChart3, Calendar, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import {
  findCategory,
  findSubcategory,
  findTopic,
  findSubtopic,
  physicalLayerContent,
} from '../../data/learnData';
import Breadcrumbs from './Breadcrumbs';
import ComingSoon from './ComingSoon';

/* ─── Renders a list item (plain string or { bold, text }) ─── */
function ListItem({ item }) {
  if (typeof item === 'string') {
    return <li className="text-slate-300">{item}</li>;
  }
  return (
    <li className="text-slate-300">
      <strong className="text-white">{item.bold}</strong> {item.text}
    </li>
  );
}

/* ─── Section renderer ─── */
function ContentSection({ section, index }) {
  const delay = 0.1 + index * 0.05;

  if (section.isInfoBox) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8 my-8"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldCheck size={20} className="text-emerald-400" />
          <h3 className="text-lg font-bold text-emerald-300">{section.heading}</h3>
        </div>
        {section.text && <p className="text-slate-400 mb-4">{section.text}</p>}
        {section.list && (
          <ul className="space-y-2 ml-4 list-disc marker:text-emerald-500/50">
            {section.list.map((item, i) => (
              <ListItem key={i} item={item} />
            ))}
          </ul>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="mb-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{section.heading}</h2>
      {section.text && (
        <p className="text-slate-400 leading-relaxed mb-4">{section.text}</p>
      )}

      {/* Subsections */}
      {section.subsections?.map((sub, i) => (
        <div key={i} className="mb-6 ml-0 sm:ml-4">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">{sub.heading}</h3>
          {sub.text && <p className="text-slate-400 mb-3">{sub.text}</p>}
          {sub.list && (
            <ul className="space-y-2 ml-4 list-disc marker:text-blue-500/40">
              {sub.list.map((item, j) => (
                <ListItem key={j} item={item} />
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Plain list */}
      {section.list && !section.subsections && (
        <ul className="space-y-2 ml-4 list-disc marker:text-blue-500/40">
          {section.list.map((item, i) => (
            <ListItem key={i} item={item} />
          ))}
        </ul>
      )}

      {/* Table */}
      {section.table && (
        <div className="overflow-x-auto mt-4">
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  {section.table.headers.map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-slate-400 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    {row.map((cell, j) => (
                      <td key={j} className="px-5 py-3 text-slate-300 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Content Page ─── */
export default function ContentPage() {
  const { categorySlug, subcategorySlug, topicSlug, subtopicSlug } = useParams();
  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  const topic = findTopic(categorySlug, subcategorySlug, topicSlug);
  const subtopic = findSubtopic(categorySlug, subcategorySlug, topicSlug, subtopicSlug);

  if (!subtopic) {
    return (
      <ComingSoon
        title="Content Not Found"
        backTo={`/learn/${categorySlug}/${subcategorySlug}/${topicSlug}`}
      />
    );
  }

  // Check if content is available
  if (!subtopic.available) {
    const breadcrumbs = [
      { label: category?.title, to: `/learn/${categorySlug}` },
      { label: subcategory?.title, to: `/learn/${categorySlug}/${subcategorySlug}` },
      { label: topic?.title, to: `/learn/${categorySlug}/${subcategorySlug}/${topicSlug}` },
      { label: subtopic.title },
    ];
    return (
      <div>
        <Breadcrumbs items={breadcrumbs} />
        <ComingSoon
          title={`${subtopic.title} — Coming Soon`}
          backTo={`/learn/${categorySlug}/${subcategorySlug}/${topicSlug}`}
          backLabel={`Back to ${topic?.title}`}
        />
      </div>
    );
  }

  // Currently only physical-layer has actual content
  const content = subtopicSlug === 'physical-layer' ? physicalLayerContent : null;

  if (!content) {
    return (
      <ComingSoon
        title="Content Not Found"
        backTo={`/learn/${categorySlug}/${subcategorySlug}/${topicSlug}`}
      />
    );
  }

  const breadcrumbs = [
    { label: category?.title, to: `/learn/${categorySlug}` },
    { label: subcategory?.title, to: `/learn/${categorySlug}/${subcategorySlug}` },
    { label: topic?.title, to: `/learn/${categorySlug}/${subcategorySlug}/${topicSlug}` },
    { label: subtopic.title },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold text-white mb-5"
      >
        {content.title}
      </motion.h1>

      {/* Meta */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8"
      >
        <span className="flex items-center gap-2 text-sm text-slate-400">
          <Clock size={14} className="text-blue-400" />
          {content.meta.readingTime}
        </span>
        <span className="flex items-center gap-2 text-sm text-slate-400">
          <BarChart3 size={14} className="text-emerald-400" />
          {content.meta.difficulty}
        </span>
        <span className="flex items-center gap-2 text-sm text-slate-400">
          <Calendar size={14} className="text-violet-400" />
          {content.meta.lastUpdated}
        </span>
      </motion.div>

      {/* Gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`h-[2px] w-24 mb-8 rounded-full bg-gradient-to-r ${category?.color || 'from-blue-500 to-cyan-400'} origin-left`}
      />

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 mb-10"
      >
        <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{content.intro}</p>
      </motion.div>

      {/* Sections */}
      {content.sections.map((section, i) => (
        <ContentSection key={i} section={section} index={i} />
      ))}

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-6 sm:p-8 mt-12"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ArrowRight size={18} className="text-blue-400" />
          Next Steps
        </h3>
        <p className="text-slate-400 mb-4">
          Now that you understand the {subtopic.title}, continue your learning with:
        </p>
        <ul className="space-y-2">
          {content.nextSteps.map((step) => (
            <li key={step.slug} className="flex items-center gap-2 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
              {step.available ? (
                <Link
                  to={`/learn/${categorySlug}/${subcategorySlug}/${topicSlug}/${step.slug}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {step.title}
                </Link>
              ) : (
                <span>
                  {step.title}{' '}
                  <span className="text-xs text-slate-600 ml-1">Coming Soon</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Back button */}
      <div className="mt-10">
        <Link
          to={`/learn/${categorySlug}/${subcategorySlug}/${topicSlug}`}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to {topic?.title}
        </Link>
      </div>
    </div>
  );
}
