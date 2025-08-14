/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  getBanners,
  getTopSellingingProducts,
  getTrendingProducts,
} from "../../../utils/Store/Homepage";
import Banners from "./Banners";
import Stories from "./Stories";
import Marquees from "./Marquees";
import Contact from "./Contact";
// import Blogs from "./Blogs/Blogs";
// import Promises from "./Promises";
import Categories from "./Categories";
import PopularProducts from "./PopularProducts";
import Testimonial from "./Testimony/Testimonial";
import { webState } from "../../../data/webStates";
import { getStories } from "../../../utils/stories";
import { BannerSkeleton } from "../UI/Cards/Skeletons";
import SeperatorBanner from "../../Admin/SeperatorBanner";
import ScrollAnimation from "../../../hooks/ScrollAnimation";
import { getTestimonials } from "../../../utils/testimonials";
import { useSnapshot } from "valtio";

const Home = () => {
  const snap = useSnapshot(webState);
  const categories = snap.categoriesData;

  const [pageData, setPageData] = useState({
    trendingProducts: [],
    topSellingProducts: [],
    videos: [],
    testimonials: [],
  });

  const [banners, setBanners] = useState([]);

  const [hasFetched, setHasFetched] = useState({
    trending: false,
    topSelling: false,
    stories: false,
    testimonials: false,
  });

  const sectionRefs = useRef({
    popularProducts: null,
    topSellingProducts: null,
    stories: null,
    testimonial: null,
  });

  const [isBanneroading, setIsBannerLoading] = useState(false);

  ScrollAnimation(); //scroll animation

  const getBannersData = useCallback(async () => {
    setIsBannerLoading(true);
    try {
      let res = await getBanners();
      if (res?.status === 200) {
        setBanners(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsBannerLoading(false);
  }, []);

  useLayoutEffect(() => {
    getBannersData();
  }, []);

  const fetchHandlers = {
    trending: useCallback(async () => {
      if (hasFetched.trending) return;
      try {
        const response = await getTrendingProducts();
        if (response?.status === 200) {
          const products = response.data.data;
          setPageData((prev) => ({ ...prev, trendingProducts: products }));
          webState.searchModelData = products;
          setHasFetched((prev) => ({ ...prev, trending: true }));
        }
      } catch (error) {
        console.error("Trending products fetch error:", error);
      }
    }, [hasFetched]),

    topSelling: useCallback(async () => {
      if (hasFetched.topSelling) return;
      try {
        const response = await getTopSellingingProducts();
        if (response?.status === 200) {
          const products = response.data.data;
          setPageData((prev) => ({ ...prev, topSellingProducts: products }));
          webState.searchModelData = products;
          setHasFetched((prev) => ({ ...prev, topSelling: true }));
        }
      } catch (error) {
        console.error("Top selling products fetch error:", error);
      }
    }, [hasFetched]),

    stories: useCallback(async () => {
      if (hasFetched.stories) return;
      try {
        const response = await getStories();
        if (response?.status === 200) {
          setPageData((prev) => ({ ...prev, videos: response.data.data }));
          setHasFetched((prev) => ({ ...prev, stories: true }));
        }
      } catch (error) {
        console.error("Stories fetch error:", error);
      }
    }, [hasFetched]),

    testimonials: useCallback(async () => {
      if (hasFetched.testimonials) return;
      try {
        const response = await getTestimonials();
        if (response?.status === 200) {
          setPageData((prev) => ({
            ...prev,
            testimonials: response.data.data,
          }));
          setHasFetched((prev) => ({ ...prev, testimonials: true }));
        }
      } catch (error) {
        console.error("Testimonials fetch error:", error);
      }
    }, [hasFetched]),
  };

  useLayoutEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const refToHandler = {
            popularProducts: fetchHandlers.trending,
            topSellingProducts: fetchHandlers.topSelling,
            stories: fetchHandlers.stories,
            testimonial: fetchHandlers.testimonials,
          };

          Object.entries(sectionRefs.current).forEach(([key, ref]) => {
            if (entry.target === ref && refToHandler[key]) {
              refToHandler[key]();
              observer.unobserve(entry.target);
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [fetchHandlers]);

  const separators = useMemo(
    () => banners?.filter((banner) => banner?.type === "SEPARATOR"),
    [banners]
  );

  const renderSection = useMemo(
    () => ({
      stories: () =>
        pageData.videos[0]?.products?.length > 0 && (
          <Stories videos={pageData.videos} />
        ),

      trending: () =>
        pageData.trendingProducts?.length > 0 && (
          <PopularProducts
            products={pageData.trendingProducts}
            title="Trending Products"
          />
        ),

      topSelling: () =>
        pageData.topSellingProducts?.length > 0 && (
          <PopularProducts
            products={pageData.topSellingProducts}
            title="Top Selling Products"
          />
        ),

      testimonials: () =>
        pageData.testimonials?.length > 0 && (
          <Testimonial data={pageData.testimonials} />
        ),
    }),
    [pageData]
  );

  return (
    <div className="w-full flex flex-col items-center gap-10 md:gap-20">
      <div className="flex flex-col gap-4">
        {isBanneroading ? <BannerSkeleton /> : <Banners banners={banners} />}
        {banners?.length > 0 && <Marquees />}
      </div>

      {/* {sectionRefs.stories > 0 && ( */}
      {/* <div ref={(el) => (sectionRefs.current.stories = el)}>
        {renderSection.stories()}
      </div> */}
      {/* )} */}
      {pageData?.videos?.length > 0 && (
        <div ref={(el) => (sectionRefs.current.stories = el)}>
          {renderSection.stories()}
        </div>
      )}
      {categories?.length > 0 && <Categories />}

      {/* <div
        className="w-full"
        ref={(el) => (sectionRefs.current.popularProducts = el)}
      >
        {renderSection.trending()}
      </div> */}
      {pageData?.trendingProducts?.length > 0 && (
        <div
          className="w-full"
          ref={(el) => (sectionRefs.current.popularProducts = el)}
        >
          {renderSection.trending()}
        </div>
      )}

      {separators?.length > 0 && <SeperatorBanner banners={separators[0]} />}

      <div
        className="w-full"
        ref={(el) => (sectionRefs.current.topSellingProducts = el)}
      >
        {renderSection.topSelling()}
      </div>

      {/* {<Promises />} */}

      <div
        className="w-full"
        ref={(el) => (sectionRefs.current.testimonial = el)}
      >
        {renderSection.testimonials()}
      </div>

      {separators?.length > 1 && <SeperatorBanner banners={separators[1]} />}

      {/* <Blogs /> */}

      {pageData.trendingProducts?.length > 0 && <Contact />}
    </div>
  );
};

export default Home;
