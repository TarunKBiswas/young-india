import { useEffect, useState } from "react";
import Actions from "../../UI/Actions";
import CreateButton from "../../UI/Buttons/CreateButton";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable";
import { getStories } from "../../../../utils/stories";
import { state } from "../../../../data/state";
import { useSnapshot } from "valtio";
import EditStory from "./EditStory";
import { listAllProducts } from "../../../../utils/productsAPI";
import NoDataAnime from "../../UI/NoDataAnime";

const Story = () => {
  const [stories, setStories] = useState([]);
  const [showEditStoryModal, setShowStoryModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(null);
  const snap = useSnapshot(state);

  const getProducts = async () => {
    try {
      const res = await listAllProducts();
      if (res?.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getData = async () => {
    const res = await getStories();

    setStories(res?.data?.data);
  };

  useEffect(() => {
    getData();
    state.refreshStoryList = false;
  }, [snap.refreshStoryList]);

  const deleteHandler = (id) => {
    state.selectedStoryID = id;
    state.showDeleteStoryModal = true;
  };

  const createHandler = () => {
    state.showAddStoryModal = true;
  };

  const editHandler = (id) => {
    setId(id);
    setShowStoryModal(true);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between my-4">
        <span className="text-black text-xl font-semibold">Story</span>
        <CreateButton title={"Create New"} action={createHandler} />
      </div>
      {stories?.length > 0 ? (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Product</TH>
              <TH>Video</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {stories?.map((data) => (
              <TR key={data?.id}>
                <TD>{data?.id}</TD>
                <TD>
                  <div className="flex  items-center">
                    <img
                      src={data?.products[0]?.thumbnail?.url}
                      alt="avatar"
                      width={"auto"}
                      height={"auto"}
                      className="w-20 h-20 rounded-full"
                    />
                    <span className="ml-2">{data?.products[0]?.name}</span>
                  </div>
                </TD>
                <TD>
                  <div className="flex items-start">
                    <video width="200" controls>
                      <source src={data?.video?.url} type="video/mp4" />
                    </video>
                  </div>
                </TD>
                <TD>
                  <Actions
                    data={data}
                    deleteHandler={deleteHandler}
                    editHandler={editHandler}
                  />
                </TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      ) : (
        <NoDataAnime msg={"No Stories Found"} />
      )}

      {showEditStoryModal && (
        <EditStory
          setShowEditModal={setShowStoryModal}
          products={products}
          id={id}
        />
      )}
    </div>
  );
};

export default Story;
