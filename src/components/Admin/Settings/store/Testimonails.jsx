import { useEffect, useState } from "react";
import { getTestimonials } from "../../../../utils/testimonials";
import { state } from "../../../../data/state";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable";
import Actions from "../../UI/Actions";
import { useSnapshot } from "valtio";
import CreateButton from "../../UI/Buttons/CreateButton";

const Testimonails = () => {
  const [data, setDtata] = useState([]);
  const snap = useSnapshot(state);

  const getData = async () => {
    try {
      let res = await getTestimonials();

      if (res?.status === 200) {
        setDtata(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    state.refreshTestimonialList = false;
  }, [snap.refreshTestimonialList]);

  const deleteHandler = (id) => {
    state.selectedTestimonialID = id;
    state.showDeleteTestimonials = true;
  };

  const createHandler = () => {
    state.showCreateTestimonidalModal = true;
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between my-4">
        <span className="text-black text-xl font-semibold">Testimonials</span>
        <CreateButton title={"Create New"} action={createHandler} />
      </div>
      {data?.length > 0 && (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>User</TH>
              <TH>Message</TH>
              <TH>Rating</TH>
              <TH>Options</TH>
            </TR>
          </THead>
          <TBody>
            {data?.map((data) => (
              <TR key={data?.id}>
                <TD>{data?.id}</TD>
                <TD>
                  <div className="flex items-center">
                    <img
                      src={data?.thumbnail?.url}
                      alt="avatar"
                      width={"auto"}
                      height={"auto"}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="ml-2">{data?.name}</span>
                  </div>
                </TD>
                <TD>
                  <div className="max-w-xs">
                    <span>{data?.content}</span>
                  </div>
                </TD>
                <TD>{data?.rating}</TD>
                <TD>
                  <Actions data={data} deleteHandler={deleteHandler} />
                </TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      )}
    </div>
  );
};

export default Testimonails;
