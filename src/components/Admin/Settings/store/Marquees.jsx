import { useEffect, useState } from "react";
import { deleteMarquee, getMarqueeData } from "../../../../utils/Marquees";
import CreateButton from "../../UI/Buttons/CreateButton";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable";
import Actions from "../../UI/Actions";
import NoDataAnime from "../../UI/NoDataAnime";
import { SuccessAlert } from "../../../Toast";
import { state } from "../../../../data/state";
import { useSnapshot } from "valtio";

const Marquees = () => {
  const [data, setData] = useState([]);

  const snap = useSnapshot(state);

  const getData = async () => {
    let res = await getMarqueeData();

    setData(res?.data?.data);
  };

  useEffect(() => {
    getData();
    state.refreshMarqueeList = false;
  }, [snap.refreshMarqueeList]);

  const deleteHandler = async (id) => {
    try {
      let res = await deleteMarquee(id);
      if (res === true) {
        SuccessAlert("Marquee Deleted");
        state.refreshMarqueeList = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createMarquee = () => {
    state.createMarqueeModal = true;
  };

  return (
    <div className="px-2 mt-[-55px]">
      <div className="w-full flex items-center justify-between pb-4 ">
        <span
          className="text-black
           text-2xl font-semibold"
        ></span>
        <div className="max-w-xl flex gap-3 mt-16 lg:mt-0">
          <CreateButton action={createMarquee} title={"Create Marquee"} />
        </div>
      </div>

      {data?.length > 0 ? (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Image</TH>
              <TH>Name</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            {data?.map((maq) => (
              <TR key={maq?.id}>
                <TD>{maq?.id}</TD>
                <TD>
                  <img
                    src={maq?.image?.url}
                    width={"auto"}
                    height={"auto"}
                    alt="image"
                    className="h-full w-full max-w-[120px]"
                  />
                </TD>
                <TD>{maq?.name}</TD>
                <TD>
                  <Actions data={maq} deleteHandler={deleteHandler} />
                </TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      ) : (
        <NoDataAnime msg={"No Data Found"} />
      )}
    </div>
  );
};

export default Marquees;
