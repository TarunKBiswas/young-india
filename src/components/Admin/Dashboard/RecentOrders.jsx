import { useEffect, useState } from "react";
import { state } from "../../../data/state.js";
import { getRecentOrder } from "../../../utils/dashboard.js";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { TBody, TD, TR, XTable } from "../UI/Table/XTable.jsx";
import NoDataAnime from "../UI/NoDataAnime.jsx";

const RecentOrders = () => {
  const [recentOrder, setRecentOrder] = useState(null);

  const navigate = useNavigate();

  const goToOrderHandler = () => {
    navigate("/orders");
  };

  const getData = async () => {
    try {
      let res = await getRecentOrder();
      if (res?.status === 200) {
        setRecentOrder(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (recentOrder === null) {
      getData();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="card border">
        <div>
          <h4 className="text-xl font-semibold">Recent Orders</h4>
        </div>

        <div className="pt-4">
          {recentOrder?.length > 0 ? (
            <XTable className="best-selling-table table ">
              <TBody>
                {recentOrder?.map((order) => {
                  return (
                    <TR key={order?.id} className="cursor-pointer px-2">
                      <TD>
                        <div
                          className="w-full flex items-center gap-1"
                          onClick={goToOrderHandler}
                        >
                          <div className="w-20 2xl:w-14 h-14 rounded-full">
                            <img
                              className="rounded-full shadow h-14 w-14 object-fill"
                              src={
                                order?.product_variant?.product?.thumbnail?.url
                              }
                              alt="Image"
                              width="auto"
                              height="auto"
                            />
                          </div>

                          <div className="flex flex-col gap-1 text-xs">
                            <span>{order?.product_variant?.product?.name}</span>
                            <span>
                              {moment(
                                order?.product_variant?.product?.createdAt
                              ).format("DD MMM, hh:mm")}
                            </span>
                          </div>
                        </div>
                      </TD>

                      <TD>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">Variant</span>
                          <span className="text-xs">
                            {order?.product_variant?.name}
                          </span>
                        </div>
                      </TD>

                      <TD>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">Price</span>
                          <span className="text-xs">
                            {"₹" + order?.product_variant?.price}
                          </span>
                        </div>
                      </TD>

                      <TD>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">Status</span>
                          <span className="text-xs">{order?.status}</span>
                        </div>
                      </TD>

                      <TD>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">Mode</span>
                          <span className="text-xs">
                            {order?.order?.payment_mode}
                          </span>
                        </div>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </XTable>
          ) : (
            <NoDataAnime msg={"No Recent Orders"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
