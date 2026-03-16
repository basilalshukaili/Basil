import { useParams } from 'react-router-dom';
import { findCategory, findSubcategory } from '../../data/learnData';
import Breadcrumbs from './Breadcrumbs';
import LearnHeader from './LearnHeader';
import ContentCard from './ContentCard';
import ComingSoon from './ComingSoon';

export default function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams();
  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);

  if (!subcategory) {
    return <ComingSoon title="Subcategory Not Found" backTo={`/learn/${categorySlug}`} />;
  }

  const breadcrumbs = [
    { label: category.title, to: `/learn/${categorySlug}` },
    { label: subcategory.title },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <LearnHeader
        title={subcategory.title}
        description={subcategory.description}
        gradient={category?.color}
      />

      {subcategory.topics && subcategory.topics.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold text-slate-300 mb-5">Available Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {subcategory.topics.map((topic, i) => (
              <ContentCard
                key={topic.slug}
                title={topic.title}
                description={topic.description}
                icon={topic.icon}
                to={`/learn/${categorySlug}/${subcategorySlug}/${topic.slug}`}
                available={topic.available !== false}
                gradient={category?.color}
                index={i}
              />
            ))}
          </div>
        </>
      ) : (
        <ComingSoon
          title="Topics Coming Soon"
          backTo={`/learn/${categorySlug}`}
          backLabel={`Back to ${category?.title}`}
        />
      )}
    </div>
  );
}
