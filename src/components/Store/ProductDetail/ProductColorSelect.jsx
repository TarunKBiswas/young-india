/* eslint-disable react/prop-types */

const ProductColorSelect = ({
  productDetail,
  selectColorhandler,
  selectedColor,
}) => {
    console.log(productDetail)
  return (
    <div className="flex flex-col mt-3">
      <div className="text-neutral-800 text-sm lg:text-base font-semibold leading-tight">
        Color
      </div>
      <div className="flex gap-3 flex-wrap mt-1">
        {productDetail?.variants?.map((variant) => {
          return (
            <span
              key={variant?.id}
              onClick={() => selectColorhandler(variant)}
              style={{
                backgroundColor: variant?.primary_attribute?.hex_code,
              }}
              className={`${
                selectedColor === variant.primary_attribute.hex_code
                  ? "border-primaryColor"
                  : "border-neutral-300"
              } rounded-full border-3 shadow-[0_1px_3px_0_rgba(0,_0,_0,_0.33)] cursor-pointer w-8 h-8 md:w-9 md:h-9 flex`}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default ProductColorSelect;
