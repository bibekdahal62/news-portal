import { useParams, Link } from "react-router-dom";
import { useCategories } from "../context/CategoryContext";
import { useLang } from "../context/LanguageContext";
import NewsPage from "./news";

function NewsCategoryPage() {
  const { categoryId } = useParams();
  const { getCategoryById } = useCategories();
  const { lang } = useLang();

  const category = getCategoryById(categoryId);

  if (!category || !category.enabled) {
    return (
      <main className="mx-6">
        <div className="container mx-auto mt-12 text-center py-20">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            श्रेणी फेला परेन
          </h3>
          <Link to="/" className="text-(--primary-color) underline">
            गृहपृष्ठमा फर्कनुहोस्
          </Link>
        </div>
      </main>
    );
  }

  // news.category is always stored in Nepali (see news-data.json), so the
  // filter value passed to NewsPage stays category.name regardless of
  // the active site language. Only the on-page heading changes with lang.
  return (
    <NewsPage
      category={category.name}
      categoryKey={null}
      headingOverride={lang === "ne" ? category.name : category.nameEn}
    />
  );
}

export default NewsCategoryPage;
