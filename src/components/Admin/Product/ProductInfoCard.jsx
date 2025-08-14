/* eslint-disable react/prop-types */

const ProductInfoCard = ({ prod, orderDetailsHandler }) => {
  let image =
    prod?.thumbnail?.url ||
    prod?.variant?.thumbnail?.url ||
    prod?.variant?.product?.thumbnail?.url;

  return (
    <div
      className="flex items-center gap-2 cursor-pointer h-full w-full"
      onClick={orderDetailsHandler ? () => orderDetailsHandler(prod?.id) : null}
    >
      <div className="w-14 h-14 bg-gray-200 flex items-center justify-center">
        <img
          className="rounded  h-full w-full object-cover object-top"
          src={image}
          width={"auto"}
          height={"auto"}
          alt="image"
        />
      </div>

      <p className="flex flex-col gap-1">
        <span className="font-semibold text-sm text-[#222222]">
          {prod?.name?.slice(0, 25)}
        </span>
        <span className="text-sm">{prod?.category?.name}</span>
      </p>
    </div>
  );
};

export default ProductInfoCard;
