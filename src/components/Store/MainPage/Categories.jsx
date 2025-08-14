import { useEffect, useState, useMemo } from "react";
import CategoryCard from "../UI/Cards/CategoryCard";
import { HeadingName } from "../UI/Buttons";
import Container from "../UI/Wrappers/Container.Wrapper";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";

const Categories = () => {
  const snap = useSnapshot(webState);
  const categories = snap.categoriesData;
  const showAll = snap.showAllCategories;

  const [state, setState] = useState({
    visibleData: categories?.slice(0, 5) || [],
    loadedImages: [],
  });

  const { visibleData, loadedImages } = state;

  const handleToggleView = () => {
    webState.showAllCategories = !showAll;
  };

  useEffect(() => {
    if (categories) {
      setState((prev) => ({
        ...prev,
        visibleData: showAll ? categories : categories?.slice(0, 5),
      }));
    }
  }, [categories, showAll]);

  useEffect(() => {
    if (!categories) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= categories.length) {
        clearInterval(interval);
        return;
      }
      setState((prev) => {
        if (!prev.loadedImages.includes(currentIndex)) {
          return {
            ...prev,
            loadedImages: [...prev.loadedImages, currentIndex++],
          };
        }
        return prev;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [categories]);

  const shouldShowViewToggle = useMemo(
    () => categories?.length > 4,
    [categories]
  );

  return (
    <Container>
      <div className="flex flex-col" id="categories">
        {categories?.length > 0 && (
          <div className="w-full flex items-center justify-end mb-4">
            <HeadingName title={"categories"} />
            {shouldShowViewToggle && (
              <div className="hidden lg:flex w-full text-end justify-end">
                <span
                  onClick={handleToggleView}
                  className="border border-gray-200 px-3 py-2 rounded text-themecolor cursor-pointer hover:bg-stone-100 transition-all duration-300"
                >
                  {showAll ? "Hide others" : "View all"}
                </span>
              </div>
            )}
          </div>
        )}
        {/* mobile */}

        <div
          className={`w-full overflow-x-scroll ${
            categories?.length > 1
              ? "px-3 grid grid-flow-col"
              : "px-2 flex items-center"
          }  scrollbar-hide gap-3 md:hidden`}
        >
          {categories?.map((item, index) => (
            // <CategoryCard categories={item} key={item.id} index={index} />
            <div
              key={item?.id}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >
              <CategoryCard categories={item} />
            </div>
          ))}
        </div>

        {/* desktop */}
        <div className="hidden md:flex md:flex-col md:items-center md:justify-center w-full">
          <div
            className={`${
              categories?.length >= 5
                ? "grid md:grid-cols-3 xl:grid-cols-5 gap-5 w-full"
                : "flex items-center justify-start gap-3 w-full"
            }`}
          >
            {visibleData?.map((item, index) => (
              <div
                key={item?.id}
                data-aos="fade-up"
                data-aos-duration="300"
                data-aos-delay={index * 100}
              >
                <CategoryCard
                  categories={item}
                  key={item.id}
                  loadedImages={loadedImages}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Categories;
