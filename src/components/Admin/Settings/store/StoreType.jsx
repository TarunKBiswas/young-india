import { useForm } from "react-hook-form";
import CardSwitch from "../CardSwitch";
import { getStoreData, updatedStoreData } from "../../../../utils/settings";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { thankyouModalHandler } from "../../../../utils/const_API";
import TypeCard from "./TypeCard";

const options = [
  {
    id: "RESELLER-ECOMMERCE",
    name: "Reseller E-Commerce",
  },
  {
    id: "WHATSAPP",
    name: "WhatsApp Store",
  },
  {
    id: "E-COMMERCE",
    name: "E-Commerce",
  },
  {
    id: "ECOMMERCE",
    name: "E-Commerce",
  },
  {
    id: "B2B",
    name: "B2B : Business To Business",
  },
];

const StoreType = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: async () => await getData(),
  });

  const [selected, setSelected] = useState(null);
  const [storeData, setStoreData] = useState(null);

  const getData = useCallback(async () => {
    try {
      let res = await getStoreData();
      setStoreData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // if (storeData === null) {
    getData();
    // } else {
    options?.forEach((option) => {
      if (option.id === storeData?.store_type) {
        setSelected(option);
      }
    });
    // }
  }, [getData, storeData?.store_type]);

  const submitHandler = async (data) => {
    let finalData = { ...data, store_type: selected?.id };

    // console.log(finalData)
    try {
      let res = await updatedStoreData(finalData);
      if (res?.status === 200) {
        thankyouModalHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="w-full flex flex-col items-start justify-start"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <label className="w-full text-sm">Store Type</label>
          <TypeCard
            mode={storeData?.store_type}
            selected={selected}
            setSelected={setSelected}
            options={options}
          />
        </div>

        {/* status settings */}
        <div className="w-full">
          <label className="w-full text-base font-semibold">Store Status</label>
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="w-full flex gap-3">
              <CardSwitch
                title={"Website status"}
                desc={
                  "Toggle to enable or disable the store. When off, the store is unavailable to customers."
                }
                register={register}
                registerValue={"is_store_active"}
                storeData={storeData?.is_store_active || true}
              />
              <CardSwitch
                title={"Maintenance Mode"}
                desc={
                  "Toggle to enable or disable maintenance mode. When on, the store is under maintenance."
                }
                register={register}
                registerValue={"is_maintenance_mode"}
                storeData={storeData?.is_maintenance_mode || false}
              />
            </div>

            <div className="w-full grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-sm">Disabled Message</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg text-sm"
                  type="text"
                  rows={4}
                  placeholder="Store Disabled Message..."
                  defaultValue={
                    storeData?.store_inactive_message ||
                    "Store Disabled Message"
                  }
                  {...register("store_inactive_message", {
                    value:
                      storeData?.store_inactive_message ||
                      "Our store is currently unavailable. Please check back soon. Thank you for your patience!",
                  })}
                />
              </div>

              <div className=" flex flex-col gap-1">
                <label className=" text-sm pl-2">Maintenance Message</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg text-sm"
                  type="text"
                  rows={4}
                  placeholder="Under Maintenance message..."
                  defaultValue={
                    storeData?.store_maintenance_message ||
                    "Store Disabled Message"
                  }
                  {...register("store_maintenance_message", {
                    value:
                      storeData?.store_maintenance_message ||
                      "Our store is currently undergoing maintenance. Please check back soon. Thank you for your patience!",
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/*Submit button*/}
        <div className="w-full lg:w-2/3 flex items-end justify-end">
          <button className="submitButton">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default StoreType;
