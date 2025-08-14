/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { deleteBlog, getBlogs } from "../../../utils/blog";
import { SuccessAlert } from "../../Toast";
import OutletWrapper from "../../../Pages/OutletWrapper";
import CreateButton from "../UI/Buttons/CreateButton";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable";
import CreateBlog from "./CreateBlog";
import DeleteModalLayout from "../Modals/DeleteModalLayout";
import EditBlog from "./EditBlog";
import Actions from "../UI/Actions";

const Blogs = () => {
  const [data, setData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [createBlog, setCreateBlog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const getData = useCallback(async () => {
    try {
      let res = await getBlogs();
      if (res?.status === 200) {
        setData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
    setRefreshList(false);
  }, [refreshList]);

  const addBloghandler = () => {
    setCreateBlog(true);
  };

  const deleteModalHandler = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const closeDeleteModal = () => {
    setShowDelete(false);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const editHandler = (id) => {
    setSelectedId(id);
    setShowEdit(true);
  };

  const deleteBlogHandler = async () => {
    try {
      let res = await deleteBlog(selectedId);
      if (res?.status === 200) {
        SuccessAlert("Blog deleted successfully");
        setShowDelete(false);
        setRefreshList(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between pb-4 pt-2">
        <span className="text-2xl font-semibold">Blogs</span>
        <div className="max-w-2xl flex gap-3">
          <div>
            <CreateButton action={addBloghandler} title={"Create New"} />
          </div>
        </div>
      </div>

      {data?.length > 0 && (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Image</TH>
              <TH>Title</TH>
              <TH>Description</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {data?.map((data, i) => {
              return (
                <TR key={i}>
                  <TD>{data?.id}</TD>
                  <TD>
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center ">
                      <img
                        className="rounded h-full w-full object-cover "
                        src={data?.thumbnail?.url}
                      />
                    </div>
                  </TD>
                  <TD>{data?.title}</TD>
                  <TD>{data?.description?.slice(0, 50)}...</TD>
                  <TD>
                    <Actions
                      data={data}
                      deleteHandler={deleteModalHandler}
                      editHandler={editHandler}
                    />
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </XTable>
      )}

      {createBlog && (
        <CreateBlog
          createBlog={createBlog}
          setCreateBlog={setCreateBlog}
          refreshList={refreshList}
          setRefreshList={setRefreshList}
        />
      )}

      {showDelete && (
        <DeleteModalLayout
          msg={"Are you sure you want to delete this blog?"}
          closeModalHandler={closeDeleteModal}
          action={() => deleteBlogHandler(selectedId)}
        >
          Delete
        </DeleteModalLayout>
      )}

      {showEdit && (
        <EditBlog
          selectedId={selectedId}
          closeModalHandler={closeEdit}
          setRefreshList={setRefreshList}
        />
      )}
    </OutletWrapper>
  );
};

export default Blogs;
