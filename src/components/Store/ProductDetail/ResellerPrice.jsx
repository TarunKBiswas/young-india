/* eslint-disable react/prop-types */

const ResellerPrice = ({
  quantity,
  price,
  total,
  marginCompare,
  totalMargin,
}) => {
  return (
    <table className="w-full text-sm text-left text-gray-500  border-none ">
      <thead className="text-xs text-gray-700 uppercase ">
        <tr className="px-6 py-2 ">
          <th
            scope="col"
            className=" text-neutral-800 px-6 py-0.5 text-opacity-70 text-xs font-semibold text-start uppercase leading-normal tracking-wide"
          >
            Price
          </th>
          <th
            scope="col"
            className=" text-neutral-800 px-6 py-2 text-opacity-70 text-xs font-semibold uppercase text-start leading-normal tracking-wide"
          >
            Total
          </th>
        </tr>
      </thead>
      <tbody className="border-x  bg-white">
        <tr className="border-b border-gray-300 border-t ">
          <td className="px-6 py-2 border-gray-300">
            <span className="text-neutral-800 text-opacity-70 text-xs font-medium leading-normal">
              {quantity} Pcs - ₹ {price}
            </span>
          </td>
          <td className="px-6 py-2 border-gray-300">
            <span className="text-neutral-800 text-opacity-70 text-xs font-medium leading-normal">
              ₹ {total}
            </span>
          </td>
        </tr>
        {marginCompare && (
          <tr className="border-b">
            <td className="px-6 py-2 border-gray-300">
              <span className="text-neutral-800 text-xs font-medium leading-normal">
                Total Margin
              </span>
            </td>
            <td className="px-6 py-2 border-gray-300 ">
              <span className="text-neutral-800 text-xs font-medium leading-normal">
                ₹ {totalMargin}
              </span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ResellerPrice;
