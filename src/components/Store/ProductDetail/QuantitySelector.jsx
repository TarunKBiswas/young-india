/* eslint-disable react/prop-types */
const purchaseQuantity = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const QuantitySelector = ({ setQuantity }) => {
  return (
    <div className="mt-3">
      <div className="text-neutral-800 text-sm lg:text-base font-semibold leading-tight">
        Quantity
      </div>
      <select
        id="quantity"
        name="quantity"
        className="quantityBox gap-3 py-2 px-3 h-9 bg-white max-w-[80px] focus:border-primaryColor rounded-full !border-primaryColor border-opacity-30 mt-1 w-full font-semibold !text-primaryColor text-sm md:text-sm !outline-none !ring-0"
        defaultValue="1"
        onChange={(e) => setQuantity(e.target.value)}
      >
        {purchaseQuantity.map((d, i) => {
          return (
            <option key={i} className="p-2" value={d}>
              {d}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default QuantitySelector;
