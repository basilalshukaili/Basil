import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { findCategory, findSubcategory, findTopic } from '../../data/learnData';
import Breadcrumbs from './Breadcrumbs';
import LearnHeader from './LearnHeader';
import ContentCard from './ContentCard';
import ComingSoon from './ComingSoon';

export default function TopicPage() {
  const { categorySlug, subcategorySlug, topicSlug } = useParams();
  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  const topic = findTopic(categorySlug, subcategorySlug, topicSlug);

  if (!topic) {
    return (
      <ComingSoon
        title="Topic Not Found"
        backTo={`/learn/${categorySlug}/${subcategorySlug}`}
      />
    );
  }

  const breadcrumbs = [
    { label: category?.title, to: `/learn/${categorySlug}` },
    { label: subcategory?.title, to: `/learn/${categorySlug}/${subcategorySlug}` },
    { label: topic.title },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <LearnHeader
        title={topic.title}
        description={topic.description}
        gradient={category?.color}
      />

      {/* Table (e.g., OSI Model Layers) */}
      {topic.tableData && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-10 overflow-x-auto"
        >
          <h2 className="text-lg font-semibold text-slate-300 mb-4">
            {topic.title} Layers
          </h2>
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  {topic.tableData.headers.map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3.5 text-slate-400 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topic.tableData.rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    {row.map((cell, j) => (
                      <td key={j} className="px-5 py-3 text-slate-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Subtopics */}
      {topic.subtopics && topic.subtopics.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold text-slate-300 mb-5">Available Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topic.subtopics.map((st, i) => (
              <ContentCard
                key={st.slug}
                title={st.title}
                description={st.description}
                icon={st.icon}
                to={`/learn/${categorySlug}/${subcategorySlug}/${topicSlug}/${st.slug}`}
                available={st.available !== false}
                gradient={category?.color}
                index={i}
              />
            ))}
          </div>
        </>
      ) : (
        <ComingSoon
          title="Subtopics Coming Soon"
          backTo={`/learn/${categorySlug}/${subcategorySlug}`}
          backLabel={`Back to ${subcategory?.title}`}
        />
      )}
    </div>
  );
}
