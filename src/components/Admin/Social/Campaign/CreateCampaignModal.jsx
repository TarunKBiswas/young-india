import { state } from "../../../../data/state.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  COLLECTION_TYPE,
  reqMsg,
  thankyouModalHandler,
  uploadImage,
} from "../../../../utils/const_API.js";
import { createCampaign } from "../../../../utils/campaigns.js";
import { listAllProducts } from "../../../../utils/productsAPI.js";
import { getCollections } from "../../../../utils/collectionsAPI.js";
import DataDropDown from "../../UI/DataDropDown.jsx";
import MediaInput from "../../UI/Inputs/MediaInput.jsx";
import CheckTabInput from "../../UI/Inputs/CheckTabInput.jsx";
import InputComp3 from "../../UI/Inputs/InputComp3.jsx";
import SimpleModal from "../../Modals/SimpleModal.jsx";
import { SubmitButton } from "../../UI/Buttons/AddButton.jsx";

const schema = yup
  .object({
    notification_title: yup.string().required(reqMsg),
    notification_body: yup.string().required(reqMsg),
  })
  .required();

const CreateCampaignModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [image, setImage] = useState(null);
  const [type, setType] = useState(COLLECTION_TYPE.Link);
  const [products, setProducts] = useState(null);
  const [selectedProd, setSelectedProd] = useState([]);
  const [collection, setCollection] = useState(null);
  // const [link, setLinke] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [web_notification, setWebNotification] = useState(false);
  const [app_notification, setAppNotification] = useState(false);

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

  const getCollection = async () => {
    try {
      const res = await getCollections();

      if (res?.status === 200) {
        setCollection(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type === COLLECTION_TYPE.Product) {
      getProducts();
    } else if (type === COLLECTION_TYPE.Collection) {
      getCollection();
    }
  }, [type]);

  const closeModalHandler = () => {
    state.showCreateCampaignModal = false;
  };

  const campaignHandler = async (data) => {
    closeModalHandler();
    let product = selectedProd?.id;
    let collection = selectedCollection?.id;
    let data2 = product || collection;
    let fData = { ...data, product, collection };

    try {
      const formdata = new FormData();
      formdata.append("file", image);
      let res = await uploadImage(formdata);
      if (res?.status === 200) {
        let finalData = {
          ...fData,
          NotificationImageId: res?.data[0]?.id,
          web_notification,
          app_notification,
          data: data2?.toString(),
        };
        delete finalData.product;
        delete finalData.collection;
        let res2 = await createCampaign(finalData);
        if (res2?.status === 200) {
          thankyouModalHandler();
          state.refreshCampaignList = true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal
      closeModalHandler={closeModalHandler}
      title={"Create Campaign"}
      modalSize={"max-w-2xl"}
    >
      <form onSubmit={handleSubmit(campaignHandler)} className="p-8">
        <div className="w-full flex flex-col gap-4 mb-4">
          <InputComp3
            register={register}
            registerValue={"notification_title"}
            label={"Notification title"}
            error={errors.notification_title?.message}
          />
          <InputComp3
            register={register}
            registerValue={"notification_body"}
            label={"Notification body"}
            error={errors.notification_body?.message}
          />

          <div className="w-full flex flex-col gap-1">
            <label className="">
              Type<span className="text-red-500">*</span>
            </label>
            <div className="w-full">
              <select
                className="formInput"
                name="state"
                {...register("type")}
                onChange={(e) => setType(e.target.value)}
              >
                {/* <option value={"LINK"}>Link</option> */}
                <option value={"PRODUCT"}>Product</option>
                <option value={"COLLECTION"}>Collection</option>
              </select>
            </div>
          </div>

          {/* {type === COLLECTION_TYPE?.Link ? (
            <div className="mb-4 flex items-center">
              <label className="">
                Link<span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  className="formInput"
                  type="url"
                  placeholder="Link"
                  value={link}
                  onChange={(e) => setLinke(e.target.value)}
                />
              </div>
            </div>
          ) : null} */}

          {type === COLLECTION_TYPE?.Product ? (
            <div className="mb-4 flex flex-col">
              <label>Products</label>
              <div className="w-full">
                <DataDropDown
                  data={products}
                  selected={selectedProd}
                  setSelected={setSelectedProd}
                />
              </div>
            </div>
          ) : null}

          {type === COLLECTION_TYPE?.Collection ? (
            <div className="mb-4 flex flex-col">
              <label className="">Collection</label>
              <div className="w-full">
                <DataDropDown
                  data={collection}
                  selected={selectedCollection}
                  setSelected={setSelectedCollection}
                />
              </div>
            </div>
          ) : null}
        </div>

        <MediaInput
          label={"Images"}
          size={""}
          image={image}
          setImage={setImage}
          required
          style={"w-full flex flex-col gap-1"}
        />
        <div className="w-full flex items-center justify-start gap-6 mt-6">
          <CheckTabInput
            value={web_notification}
            setValue={setWebNotification}
            label={"Web Notification :"}
          />
          <CheckTabInput
            value={app_notification}
            setValue={setAppNotification}
            label={"App Notification :"}
          />
        </div>
        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default CreateCampaignModal;
