import { useEffect, useState, useMemo } from "react";
import CategoryCard from "../UI/CategoryCard";

 const categories = [
   {
     name: "Trendy Apparel Co.",
     image_url: "https://i.ytimg.com/vi/CLWDAjwDr-E/hqdefault.jpg",
   },
   {
     name: "NextGen Gadgets",
     image_url: "https://i.ytimg.com/vi/CLWDAjwDr-E/hqdefault.jpg",
   },
   {
     name: "Urban Kicks",
     image_url: "https://i.ytimg.com/vi/d9Rk0_Rz9pI/hqdefault.jpg",
   },
   {
     name: "Timeless Luxury",
     image_url: "https://i.ytimg.com/vi/CLWDAjwDr-E/hqdefault.jpg",
   },
   // {
   //   name: "Shiny Stones",
   //   image_url: "https://course.socialseller.in/storage/course/1727095896.png",
   // },
 ];

 const showAllData = [
   {
     name: "Trendy Apparel Co.",
     image_url: "https://mtt-ssa.s3.eu-north-1.amazonaws.com/Category03.png",
   },
   {
     name: "NextGen Gadgets",
     image_url: "https://i.ytimg.com/vi/CLWDAjwDr-E/hqdefault.jpg",
   },
   {
     name: "Urban Kicks",
     image_url: "https://i.ytimg.com/vi/d9Rk0_Rz9pI/hqdefault.jpg",
   },
   {
     name: "Timeless Luxury",
     image_url: "https://course.socialseller.in/storage/course/1727095776.jpg",
   },
   {
     name: "Shiny Stones",
     image_url: "https://course.socialseller.in/storage/course/1727095896.png",
   },
   {
     name: "Modern Homes",
     image_url: "https://i.ytimg.com/vi/d9Rk0_Rz9pI/hqdefault.jpg",
   },
   {
     name: "Comfort Creations",
     image_url: "https://i.ytimg.com/vi/CLWDAjwDr-E/hqdefault.jpg",
   },
   {
     name: "Glow & Shine",
     image_url: "https://i.ytimg.com/vi/d9Rk0_Rz9pI/hqdefault.jpg",
   },
   {
     name: "Drive Ahead",
     image_url: "https://course.socialseller.in/storage/course/1727095776.jpg",
   },
   {
     name: "Active Gear",
     image_url: "https://course.socialseller.in/storage/course/1727095896.png",
   },
 ];

 
const Category = () => {
 

  const [state, setState] = useState({
    visibleData: categories.slice(0, 5), // Initial visible data
    loadedImages: [],
    showAll: false, // Track if we should show all or limited categories
  });

  const { visibleData, loadedImages, showAll } = state;

  // Toggle the view between showing all categories or just the first 5
  const handleToggleView = () => {
    setState((prevState) => ({
      ...prevState,
      showAll: !prevState.showAll, // Toggle the state of showAll
      visibleData: !prevState.showAll ? showAllData : categories.slice(0, 5), // Update visibleData based on showAll
    }));
  };

  // useEffect(() => {
  //   if (categories) {
  //     setState((prev) => ({
  //       ...prev,
  //       visibleData: showAll ? categories : categories?.slice(0, 5),
  //     }));
  //   }
  // }, [categories, showAll]);

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
    () => categories.length > 4,
    [categories]
  );

  return (
    <div className="flex flex-col">
      {categories.length > 1 && (
        <div className="w-full flex items-center justify-start mb-4">
          <h3 className="font-medium text-xl">Category</h3>
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
      <div
        className={`w-full overflow-x-scroll ${
          categories.length > 1
            ? "pl-2 grid grid-flow-col"
            : "px-2 flex items-center"
        } scrollbar-hide gap-2.5 md:hidden`}
      >
        {categories.map((item, index) => (
          <div
            key={item.id}
            // data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={index * 100}
          >
            <CategoryCard categories={item} />
          </div>
        ))}
      </div>

      <div className="hidden md:flex md:flex-col md:items-center md:justify-center w-full">
        <div
          className={`${
            categories.length >= 5
              ? "grid md:grid-cols-2 xl:grid-cols-4 gap-3 w-full"
              : "flex items-center justify-start gap-3 w-full"
          }`}
        >
          {visibleData.map((item, index) => (
            <div
              key={item.id}
              // data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={index * 100}
            >
              <CategoryCard categories={item} loadedImages={loadedImages} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
