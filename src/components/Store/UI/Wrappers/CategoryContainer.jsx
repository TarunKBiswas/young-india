/* eslint-disable react/prop-types */
export const CategoryContainer = ({ children }) => {
  return (
    <div className="w-full md:max-w-[900px] xl:max-w-[1150px] 2xl:max-w-[1400px] mx-auto ">
      {children}
    </div>
  );
};
