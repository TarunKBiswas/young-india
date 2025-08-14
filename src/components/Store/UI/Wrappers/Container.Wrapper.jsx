/* eslint-disable react/prop-types */

const Container = ({ className, children }) => {
  return (
    <div
      className={`w-full lg:max-w-7xl bigScreen:max-w-[90rem] mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
