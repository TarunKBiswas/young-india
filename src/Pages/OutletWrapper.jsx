/* eslint-disable react/prop-types */
const OutletWrapper = ({ className, children }) => {
  return (
    <div className={`w-full px-4 py-8 max-w-[1500px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default OutletWrapper;
