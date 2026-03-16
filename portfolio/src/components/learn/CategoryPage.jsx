import { useParams } from 'react-router-dom';
import { findCategory } from '../../data/learnData';
import Breadcrumbs from './Breadcrumbs';
import LearnHeader from './LearnHeader';
import ContentCard from './ContentCard';
import ComingSoon from './ComingSoon';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = findCategory(categorySlug);

  if (!category) {
    return <ComingSoon title="Category Not Found" />;
  }

  const breadcrumbs = [{ label: category.title }];

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <LearnHeader
        title={category.title}
        description={category.description}
        gradient={category.color}
      />

      {category.subcategories.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold text-slate-300 mb-5">Available Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {category.subcategories.map((sub, i) => (
              <ContentCard
                key={sub.slug}
                title={sub.title}
                description={sub.description}
                icon={sub.icon}
                to={`/learn/${categorySlug}/${sub.slug}`}
                available={sub.available !== false}
                gradient={category.color}
                index={i}
              />
            ))}
          </div>
        </>
      ) : (
        <ComingSoon
          title="Content Coming Soon"
          backTo="/learn"
          backLabel="Back to Academy"
        />
      )}
    </div>
  );
}
