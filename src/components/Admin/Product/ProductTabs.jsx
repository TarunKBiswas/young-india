import { useSnapshot } from "valtio";
import { state } from "../../../data/state";
import { productStats } from "../../../utils/productsAPI";
import { useEffect, useState } from "react";
import { ProductStats } from "../../../data/ProductsStats";

const ProductTabs = () => {
  const snap = useSnapshot(state);
  const [active, setActive] = useState("true");

  const getStats = async () => {
    try {
      let res = await productStats();

      let productStat = ProductStats(res?.data?.data);
      state.productStatsInfo = productStat;
    } catch (error) {
      console.log(error);
    }
  };

  const setTag = (e, id) => {
    setActive(id);
    state.productStatsTag = id;
  };

  useEffect(() => {
    getStats();
  }, [snap.refreshProductList]);

  return (
    <div className="w-full flex items-center justify-start gap-2">
      {snap.productStatsInfo?.map((data) => {
        return (
          <div className="relative" key={data?.id}>
            <div
              className={`rounded-lg px-3 py-3 gap-3 cursor-pointer border flex items-center justify-between ${
                active === data.id ? "bg-[#222222] text-white" : null
              }
                `}
              id={data?.id}
              onClick={(e) => setTag(e, data?.id)}
            >
              <span className="text-[10px] lg:text-sm capitalize">
                {data?.statsTitle}
              </span>
              <span
                className={`bg-[#222222] rounded-full px-2 py-1 text-xs text-white`}
              >
                {data?.statsValue}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductTabs;
