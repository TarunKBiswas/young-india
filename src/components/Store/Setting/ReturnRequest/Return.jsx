import { useEffect, useState } from "react";
import { getReturnProduct } from "../../../../utils/Store/Setting";
import ReturnRequestCard from "./ReturnRequestCard";
import { webState } from "../../../../data/webStates";
import NoDataAnime from "../../../Admin/UI/NoDataAnime";

const Return = () => {
  const [returnProducts, setReturnProduct] = useState([]);

  const returnOrderProduct = async () => {
    try {
      let res = await getReturnProduct();
      if (res?.status === 200) {
        setReturnProduct(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    returnOrderProduct();
  }, []);

  return (
    <div className="bg-white w-full flex flex-col items-center justify-center max-w-[1440px] mx-auto ">
      <div className="w-full p-2">
        <div className=" w-full flex flex-col-reverse items-start justify-between lg:flex-row lg:items-center gap-2 mb-2">
          <span className="w-full font-medium md:text-xl">Return Orders</span>
        </div>

        <div className="w-full h-[600px] overflow-scroll scrollbar-hide flex flex-col gap-2 mt-4">
          {returnProducts?.length > 0 ? (
            <ReturnRequestCard returnProducts={returnProducts} />
          ) : (
            <div>
              <NoDataAnime msg={"No Orders Found"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Return;
