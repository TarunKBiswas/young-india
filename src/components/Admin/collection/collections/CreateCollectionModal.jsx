import { state } from "../../../../data/state.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCollection } from "../../../../utils/collectionsAPI.js";
import { useNavigate } from "react-router-dom";
import { lengthMsg, reqMsg, uploadImage } from "../../../../utils/const_API.js";
import InputComp3 from "../../UI/Inputs/InputComp3.jsx";
import { useEffect, useState } from "react";
import MediaInput from "../../UI/Inputs/MediaInput.jsx";
import { FailureAlert, SuccessAlert } from "../../../Toast.jsx";
import Multiselect from "multiselect-react-dropdown";
import { listAllProducts } from "../../../../utils/productsAPI.js";
import { SubmitButton } from "../../UI/Buttons/AddButton.jsx";
import SimpleModal from "../../Modals/SimpleModal.jsx";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
});

const CreateCollectionModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [thumbnail, setThumbnail] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProd, setSelectedProd] = useState([]);
  const navigate = useNavigate();

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

  const selectProductsHandler = (e) => {
    e.map((id) => setSelectedProd([...selectedProd, id.id]));
  };

  const removeProductsHandler = (e) => {
    let newList = e.map((id) => id.id);
    setSelectedProd(newList);
  };

  const createCollectionHandler = async (data) => {
    // Check for missing required fields
    if (!thumbnail) {
      FailureAlert("Thumbnail is required");

      return;
    }

    if (!selectedProd || selectedProd.length === 0) {
      FailureAlert("At least one product must be selected");

      return;
    }

    if (!data.name) {
      FailureAlert("Name is required");

      return;
    }

    try {
      const updatedData = {
        ...data,
        products: selectedProd,
      };
      closeModalHandler();
      const formData = new FormData();
      formData.append("file", thumbnail);
      const res = await uploadImage(formData);
      if (res?.status === 200) {
        updatedData.ThumbnailId = res?.data[0]?.id;
        const response = await createCollection(updatedData);
        if (response?.status === 200) {
          SuccessAlert("Collection Created");
          navigate("/collection");
          state.refreshCollectionTable = true;
        } else {
          throw new Error("Collection creation failed");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      FailureAlert("Error creating collection: " + error.message);
    } finally {
    }
  };

  const closeModalHandler = () => {
    state.showAddCollectionModal = false;
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-2xl"}>
      <form
        className="w-full p-6 flex flex-col gap-4"
        onSubmit={handleSubmit(createCollectionHandler)}
      >
        <InputComp3
          register={register}
          label={"Name"}
          registerValue={"name"}
          error={errors.name?.message}
        />

        <div className="w-full flex  flex-col gap-1">
          <label className=" ">Products</label>
          <div className="w-full">
            <Multiselect
              displayValue="name"
              options={products?.map((prod) => prod)}
              isObject={true}
              onSelect={(e) => selectProductsHandler(e)}
              onRemove={(e) => removeProductsHandler(e)}
              showCheckbox
              className="h-full "
            />
          </div>
        </div>
        <MediaInput
          label={"Thumbnail"}
          image={thumbnail}
          setImage={setThumbnail}
          required
          style={"flex flex-col gap-1"}
        />

        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default CreateCollectionModal;
