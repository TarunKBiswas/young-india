/* eslint-disable react/prop-types */

const BulkPricing = ({ data }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500  border-none ">
      <thead className="text-xs text-gray-700 uppercase ">
        <tr className="px-6 py-2 ">
          {/* <th
            scope="col"
            className=" text-neutral-800  text-opacity-70 text-xs font-semibold uppercase leading-normal tracking-wide"
          ></th> */}
          <th
            scope="col"
            className=" text-neutral-800 px-6 py-0.5 text-opacity-70 text-xs font-semibold text-start uppercase leading-normal tracking-wide"
          >
            {/* Range */}
            Quantity
          </th>
          <th
            scope="col"
            className=" text-neutral-800 px-6 py-2 text-opacity-70 text-xs font-semibold uppercase text-start leading-normal tracking-wide"
          >
            Price
          </th>
        </tr>
      </thead>
      <tbody className="border-x">
        {data?.map((item) => {
          return (
            <tr
              className="border-b border-gray-300 border-t bg-white"
              key={item?.id}
            >
              {/* <td className="px-6 py-2 border-r">
                <span className="text-neutral-800  text-opacity-80 text-xs font-medium leading-normal">
                  {i + 1}
                </span>
              </td> */}
              <td className="px-6 py-2 border-gray-300 border-r">
                <span className="text-neutral-800 text-opacity-80 text-xs font-medium leading-normal">
                  {item?.from} to {item?.to}
                </span>
              </td>
              <td className="px-6 py-2">
                <span className="text-neutral-800 text-opacity-80 text-xs font-medium leading-normal">
                  ₹ {item?.price}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BulkPricing;
