/* eslint-disable react/prop-types */
const ProductDetailContainer = ({ className, children }) => {
  return (
    <div
      className={`w-full overflow-x-scroll scrollbar-hide md:max-w-[900px] xl:max-w-[1200px] mx-auto  ${className}`}
    >
      {children}
    </div>
  );
};

export default ProductDetailContainer;
