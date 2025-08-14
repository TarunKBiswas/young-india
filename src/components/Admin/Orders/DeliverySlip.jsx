/* eslint-disable react/prop-types */

import moment from "moment";

const DeliverySlip = ({ pdfRef, details }) => {
  let address = details?.order?.address;
  let product = details;
  let user = details?.order?.store_user;
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-xl rounded-xl max-w-2xl w-full p-8 pt-0 border border-gray-200"
        ref={pdfRef}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">Delivery Slip</h1>
          <p className="text-sm text-gray-500 mt-1">
            Orderd At: <span className="font-semibold text-gray-700">{moment(details?.createdAt)?.format("DD MMM YYYY hh:mm")}</span>
          </p>
        </div>
        <hr className="mb-6" />

        {/* Order & Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-2">Order By:</h2>
            <p className="text-sm text-gray-600">Name: <span className="font-medium">{user?.name}</span></p>
            <p className="text-sm text-gray-600">Phone: <span className="font-medium">{user?.phone}</span></p>
            <p className="text-sm text-gray-600">Email: <span className="font-medium">{user?.email}</span></p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-2">Ship To:</h2>
            <p className="text-sm text-gray-600">Name: <span className="font-medium">{address?.name}</span></p>
            <p className="text-sm text-gray-600">{address?.addressLine1}, {address?.area}, {address?.city}.{address?.pincode}</p>
          </div>
        </div>

        {/* Item Ordered */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-gray-700 mb-2">Item Ordered:</h2>
          <p className="text-sm text-gray-600">Name: <span className="font-medium">{product?.variant?.product?.name}</span></p>
          <p className="text-sm text-gray-600">Qnt: <span className="font-medium">{product?.quantity}</span></p>
          <p className="text-sm text-gray-600">Price: <span className="font-bold">₹ {product?.price} /-</span></p>
          <p className="text-sm text-gray-600">Variant: <span className="font-medium">{product?.variant?.name}</span></p>
        </div>
      </div>
    </div>
  );
};

export default DeliverySlip;
