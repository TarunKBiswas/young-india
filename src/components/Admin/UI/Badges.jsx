/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
export const PdfVariantBadge = ({ className, variant }) => {
  return (
    <>
      <div className="flex items-center gap-2 py-2">
        {variant?.map((variant) => (
          <span
            className={`p-2 rounded-sm text-xs font-semibold border-[1px] border-green-500 cursor-pointer ${className}`}
          >
            {variant.name}
          </span>
        ))}
      </div>
    </>
  );
};

export const PdfCategoryBadge = ({ className, category, subCat }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span
          className={`px-1.5 py-0.5 bg-green-700 text-white font-semibold text-xs rounded-lg ${className}`}
        >
          {category}
        </span>
        <span
          className={`px-1.5 py-0.5 bg-green-700 text-white font-semibold text-xs rounded-lg ${className}`}
        >
          {subCat}
        </span>
      </div>
    </>
  );
};
