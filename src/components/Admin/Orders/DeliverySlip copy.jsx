/* eslint-disable react/prop-types */

import moment from "moment";

const DeliverySlip = ({ pdfRef, details }) => {
  let address = details?.order?.address;
  // let product = details?.variant;
  let product = details;
  let user = details?.order?.store_user;
  // console.log(product);
  return (
    <div className="w-full h-full bg-white max-w-xl mx-auto p-4" ref={pdfRef}>
      {/* <div className="w-full flex flex-col items-center p-4"> */}
        <div className="w-full flex flex-col items-start gap-2 text-start">
          <div className="w-full flex items-center justify-start gap-2">
            <span className="font-medium text-sm">Orderd At : </span>
            {moment(details?.createdAt)?.format("DD MMM YYYY hh:mm")}
          </div>
          <hr className="w-full mt-0.5" />
          <div className="w-full flex items-start gap-2 mb-5">
            <div className=" w-full flex flex-col">
              <span className="font-medium text-sm">Order By: </span>
              <div className="!text-xs w-full flex gap-1 flex-col mt-1">
                <span>
                  Name : <span>{user?.name}</span>
                </span>
                <span>
                  Phone : <span>{user?.phone}</span>
                </span>
                <span>
                  Email : <span>{user?.email}</span>
                </span>
              </div>
            </div>
            <div className=" w-full flex flex-col">
              <span className="font-medium text-sm">Ship To: </span>
              <div className="!text-xs w-full gap-1 flex flex-col mt-1">
                <span>
                  Name : <span>{address?.name}</span>
                </span>
                <span>
                  {address?.addressLine1}, {address?.area}, {address?.city}.{address?.pincode}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 mb-5">
            <div className="w-full flex flex-col">
              {/* <span className="font-medium text-sm">Items Details: </span> */}
              <span className="font-medium text-sm">Item Ordered: </span>
              <div className="!text-xs w-full flex gap-1 !max-w-[500px] flex-col items-start">
                {/* <span>Name : {product?.name} </span>
              <span>Qnt :{product?.quantity} </span>
              <span>Price : ₹ {product?.price} /- </span>
              <span>Variant : {product?.name} </span> */}
                <span>Name : {product?.variant?.product?.name} </span>
                <span>Qnt : {product?.quantity} </span>
                <span>Price : ₹ {product?.price} /- </span>
                <span>Variant : {product?.variant?.name} </span>
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-2 mb-5 w-full">
            <div className="w-full flex flex-col">
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
            </div>
            <div className="w-full flex flex-col">
              <span className="font-medium text-sm">Shipped By: </span>
              <div className="!text-xs w-full flex gap-1 !max-w-[500px] flex-col items-start">
                <span>Bee Bambini</span>
                <span>Email: beebambini04@gmail.com</span>
                <span>Contact: 6268054330</span>
              </div>
            </div>
          </div> */}
        </div>
      {/* </div> */}
    </div>
  );
};

export default DeliverySlip;
