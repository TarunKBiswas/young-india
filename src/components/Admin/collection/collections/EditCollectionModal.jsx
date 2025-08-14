/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { state } from "../../../../data/state.js";
import {
  editCollection,
  getCollectionDetail,
} from "../../../../utils/collectionsAPI.js";
import { useSnapshot } from "valtio";
import { listAllProducts } from "../../../../utils/productsAPI.js";
import { FailureAlert, SuccessAlert } from "../../../Toast.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Multiselect from "multiselect-react-dropdown";
import MediaInputUpdate from "../../UI/Inputs/MediaInputUpdate.jsx";
import { uploadImage } from "../../../../utils/const_API.js";
import SimpleModal from "../../Modals/SimpleModal.jsx";
import { SubmitButton } from "../../UI/Buttons/AddButton.jsx";

const schema = yup.object({
  name: yup.string().required(),
});

const EditCollectionModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => await getCellectionInfo(),
  });

  const snap = useSnapshot(state);
  let id = snap.selectedColID;

  const [collectionInfo, setCollectionInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsTemp, setProductsTemp] = useState([]);
  const [selectedProd, setSelectedProd] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const getCellectionInfo = async () => {
    try {
      const res = await getCollectionDetail(id);
      if (res?.status === 200) {
        setCollectionInfo(res?.data?.data);
        setProductsTemp(res?.data?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    getCellectionInfo();
  }, []);

  const editModalHandler = () => {
    state.showEditCollectionModal = false;
  };

  const selectProductsHandler = (e) => {
    e.map((id) => setSelectedProd([...selectedProd, id.id]));
  };

  const removeProductsHandler = (e) => {
    selectedProd.filter((item) => item.selectedProd !== e[0].id);
  };

  const removePrevProdHandler = (id) => {
    let newPrevProdList = productsTemp?.filter((item) => item.id !== id);
    setProductsTemp(newPrevProdList);
  };

  const updateCollectionHandler = async (data) => {
    let prevThumbaiId = collectionInfo?.ThumbnailId;
    let previousProductList = productsTemp?.map((id) => id.id);
    let newList = previousProductList.concat(
      selectedProd.filter((item) => previousProductList.indexOf(item) < 0)
    );

    try {
      if (thumbnail !== null) {
        const formdata = new FormData();
        formdata.append("file", thumbnail);
        let res = await uploadImage(formdata);
        if (res?.status === 200) {
          let finalData = {
            ...data,
            products: newList,
            ThumbnailId: res?.data[0]?.id,
          };
          const res2 = await editCollection(id, finalData);
          if (res2?.status === 200) {
            state.refreshCollectionTable = true;
            state.showEditCollectionModal = false;
            SuccessAlert("Collection Updated");
          }
        }
      } else {
        let finalData = {
          ...data,
          products: newList,
          ThumbnailId: prevThumbaiId,
        };
        const res = await editCollection(id, finalData);
        if (res?.status === 200) {
          state.refreshCollectionTable = true;
          state.showEditCollectionModal = false;
          SuccessAlert("Collection Updated");
        }
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Somthing went wrong");
    }
  };

  return (
    <SimpleModal closeModalHandler={editModalHandler} modalSize={"max-w-xl"}>
      <form
        className="p-6 w-full flex flex-col gap-4"
        onSubmit={handleSubmit(updateCollectionHandler)}
      >
        <div className="w-full flex flex-col ">
          <label className="col-sm-3">Name</label>
          <div className="w-full">
            <input
              className="formInput"
              type="text"
              placeholder="Category Name"
              {...register("name", { value: collectionInfo?.name })}
              defaultValue={collectionInfo?.name}
            />
            <p className="text-red-600 text-sm ">{errors.name?.message}</p>
          </div>
        </div>

        <MediaInputUpdate
          label={"Thumbnail"}
          state={thumbnail}
          setState={setThumbnail}
          image={collectionInfo?.thumbnail?.url}
          size={"w-52"}
          style={"flex-col"}
        />

        <div className="mb-4 row align-items-center">
          <label className="col-sm-3 col-form-label form-label-title">
            Products
          </label>
          <div className="col-sm-9">
            <Multiselect
              displayValue="name"
              options={products?.map((prod) => prod)}
              isObject={true}
              onSelect={(e) => selectProductsHandler(e)}
              onRemove={(e) => removeProductsHandler(e)}
            />
          </div>

          <div className="w-full grid grid-cols-4 gap-3 items-start mt-2 max-h-[180px] thinScrollbar overflow-auto">
            {productsTemp?.map((coll) => (
              <div className="w-full mt-2 col-sm-3" key={coll.id}>
                <p
                  className="p-2 text-xs text-white rounded-lg bg-[#222222]"
                  role="alert"
                >
                  <span className="flex items-center justify-between gap-2 text-ellipsis">
                    {coll?.name}
                    <span
                      className="font-bold hover:text-red-400 transition-all duration-300 cursor-pointer"
                      onClick={() => removePrevProdHandler(coll.id)}
                    >
                      X
                    </span>
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default EditCollectionModal;
