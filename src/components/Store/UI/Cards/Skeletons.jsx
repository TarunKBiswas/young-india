export const ProductSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="group relative space-y-3 rounded-lg border p-3">
          {/* Image skeleton */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse" />

          {/* Title skeleton */}
          <div className="h-4 w-3/4 rounded-md bg-gray-200 animate-pulse" />

          {/* Price skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-4 w-16 rounded-md bg-gray-200/60 animate-pulse" />
          </div>

          {/* Rating skeleton */}
          <div className="flex items-center gap-1">
            <div className="h-4 w-24 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-4 w-4 rounded-md bg-gray-200 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const BannerSkeleton = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Desktop version */}
      <div className="hidden lg:block w-full">
        <div className="w-full h-[90vh] bg-white rounded-lg overflow-hidden relative">
          <div className="shimmer-desktop absolute inset-0 animate-pulse"></div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="block lg:hidden w-full">
        <div className="w-full h-[300px] bg-white rounded-lg overflow-hidden relative">
          <div className="shimmer-mobile absolute inset-0"></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmerDesktop {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes shimmerMobile {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shimmer-desktop {
          animation: shimmerDesktop 2.5s infinite;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        .shimmer-mobile {
          animation: shimmerMobile 2s infinite;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
        }
      `}</style>
    </div>
  );
};

export const ProductThumbnailSkeleton = () => {
  return (
    <>
      <div className="w-[200px] h-24 bg-gray-200 rounded-lg transition-all duration-100"></div>
      <div className="w-full  flex flex-col items-center justify-center h-96 xl:h-[79vh] bg-gray-200 animate-pulse transition-all duration-100">
        {/* Head */}
      </div>
    </>
  );
};

export const ProductButtonSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md h-96 xl:h-[79vh]">
      {/* Title Skeleton */}
      <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>

      {/* Price Skeleton */}
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>

      {/* Rating Skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-6 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>

      {/* Variants Skeleton */}
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>

      {/* Buttons Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      {/* Icons Section Skeleton */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {Array(4)
          .fill("")
          .map((_, idx) => (
            <div key={idx} className="h-12 w-12 bg-gray-200 rounded"></div>
          ))}
      </div>

      {/* Payment Icons Skeleton */}
      <div className="flex gap-4">
        {Array(4)
          .fill("")
          .map((_, idx) => (
            <div key={idx} className="h-8 w-12 bg-gray-200 rounded"></div>
          ))}
      </div>
    </div>
  );
};

export const HeadSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-center bg-themecolor py-2.5">
      <span className="capitalize text-[#222222]">
        {/* Skeleton placeholder */}
        <div className="animate-pulse bg-gray-900 rounded-md h-4 w-24"></div>
      </span>
    </div>
  );
};

export const CartProductCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-start gap-4">
      <div className="w-full lg:max-w-[65%] flex flex-col gap-5 px-0.5 shadow-sm rounded-lg overflow-hidden">
        <div className="w-1/3 lg:w-1/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        <div className="w-full p-2 flex flex-col justify-between gap-2">
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse mb-3 w-1/3"></div>
              <div className="flex gap-3">
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-3 justify-between mb-1">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:max-w-[30%] mx-auto px-3 lg:px-0 h-[400px] lg:h-[600px] mt-10 xl:mt-0">
        {/* Product Amount */}
        <div className="flex justify-between items-center py-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Delivery Charge */}
        <div className="flex justify-between items-center py-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 font-bold">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Checkout Button */}
        <div className="mt-6">
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const SubCategorySkeletonCard = () => {
  return (
    <div className="w-full flex bg-white shadow-sm min-w-[145px] border py-2 px-1 rounded-md overflow-hidden flex-col gap-1 items-center animate-pulse">
      <div className="h-20 w-20 bg-gray-200 rounded-md"></div>
      <div className="h-4 w-16 bg-gray-200 rounded"></div>
    </div>
  );
};
