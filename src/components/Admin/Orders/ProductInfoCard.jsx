/* eslint-disable react/prop-types */

const ProductInfoCard = ({ order, orderDetailsHandler }) => {
  // const thumbnail = order?.orderVariants?.

  return (
    <div
      className="flex items-center justify-start gap-2 cursor-pointer"
      onClick={() => orderDetailsHandler(order?.id)}
    >
      <div className="w-20 2xl:w-14 h-14 rounded-full">
        <img
          className="rounded-full shadow h-full w-full object-fill"
          src={order?.product_variant?.product?.thumbnail?.url}
          alt="Image"
          width={"auto"}
          height={"auto"}
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="font-medium capitalize text-sm">
          {order?.product_variant?.product?.name?.toLowerCase()}
        </span>
        <span className="text-[10px] 2xl:text-xs">
          {order?.quantity} pcs X{" "}
          {"₹" + order?.product_variant?.price || order?.order_price} =
          {order?.order_price ||
            order?.product_variant?.price * order?.quantity}
        </span>
        <span
          className={`text-[10px] 2xl:text-xs ${
            order?.sellingPrice ? "block" : "hidden"
          } bg-green-200 px-2 rounded-full`}
        >
          {"Reselling Price ="}{" "}
          {"₹" + order?.sellingPrice ? order?.sellingPrice : null}
        </span>
      </div>
    </div>
  );
};

export default ProductInfoCard;
