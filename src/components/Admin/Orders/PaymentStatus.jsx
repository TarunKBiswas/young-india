/* eslint-disable react/prop-types */

const PaymentStatus = ({ status }) => {
  return (
    <span>
      {status ? (
        <span className=" text-green-500 font-medium gap-2  ">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span> Paid
        </span>
      ) : (
        <span className="text-yellow-500 font-medium gap-2">
          <span className="h-2 w-2 bg-yellow-500 rounded-full"></span> Pending
        </span>
      )}
    </span>
  );
};

export default PaymentStatus;
