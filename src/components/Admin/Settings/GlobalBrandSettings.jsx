import { useEffect, useState } from "react";
import { getGlobalBrand, updateGlobalBrand } from "../../../utils/settings.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  phoneRegExp,
  thankyouModalHandler,
  uploadImage,
} from "../../../utils/const_API.js";
import InputComp2 from "../UI/Inputs/InputComp2.jsx";
import BrandLogoMediaInput from "../UI/Inputs/BrandLogoMediaInput.jsx";

const schema = yup.object({
  name: yup.string(),
  address: yup.string(),
  email: yup.string(),
  tagline: yup.string(),
  whatsapp_number: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
  calling_number: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
  facebook: yup.string(),
  instagram: yup.string(),
  youtube: yup.string(),
});

const GlobalBrandSettings = () => {
  const [brandData, setBrandData] = useState(null);
  const [darkLogo, setDarkLogo] = useState(null);
  const [lightLogo, setLightLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => await getData(),
  });

  const getData = async () => {
    try {
      const res = await getGlobalBrand();

      if (res?.status === 200) {
        setBrandData(res?.data?.data);
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (brandData === null) {
      getData();
    }
  }, [brandData]);

  const submitHandler = async (data) => {
    try {
      delete data.about_us;
      delete data.logo_dark;
      delete data.logo_light;
      delete data.favicon;
      delete data.id;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.youtube;

      if (darkLogo || lightLogo || favicon !== null) {
        if (darkLogo !== null) {
          const formdata = new FormData();
          formdata.append("file", darkLogo);
          const res = await uploadImage(formdata);
          if (res?.status === 200) {
            Object.assign(data, { LogoIdDark: res?.data[0]?.id });
          }
        } else {
          Object.assign(data, {
            LogoIdDark: brandData?.logo_dark?.id,
          });
        }
        if (lightLogo !== null) {
          let formdata = new FormData();
          formdata.append("file", lightLogo);
          let res = await uploadImage(formdata);
          if (res?.status === 200) {
            Object.assign(data, { LogoIdLight: res?.data[0]?.id });
          }
        } else {
          Object.assign(data, {
            LogoIdLight: brandData?.logo_light?.id,
          });
        }
        if (favicon !== null) {
          let formdata = new FormData();
          formdata.append("file", favicon);
          let res = await uploadImage(formdata);
          if (res?.status === 200) {
            Object.assign(data, { FavIconId: res?.data[0]?.id });
          }
        } else {
          Object.assign(data, {
            FavIconId: brandData?.favicon?.id,
          });
        }

        let updateData = await updateGlobalBrand(data);
        if (updateData?.status === 200) {
          thankyouModalHandler();
        }
      } else {
        let finalData = {
          ...data,
          LogoIdDark: brandData?.logo_dark?.id,
          LogoIdLight: brandData?.logo_light?.id,
          FavIconId: brandData?.favicon?.id,
        };
        delete finalData.favicon;
        delete finalData.logo_dark;
        delete finalData.logo_light;
        delete finalData.id;
        delete finalData.createdAt;
        delete finalData.updatedAt;
        delete data.youtube;
        delete data.about_us;

        let updateData = await updateGlobalBrand(finalData);
        if (updateData?.status === 200) {
          thankyouModalHandler();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full flex flex-col max-w-5xl"
    >
      <div className="w-full flex items-center gap-20">
        <BrandLogoMediaInput
          label={"Brand Logo (Navbar)"}
          img={darkLogo}
          setImage={setDarkLogo}
          logo={brandData?.logo_dark?.url}
        />

        <BrandLogoMediaInput
          label={"Brand Logo (Footer)"}
          img={lightLogo}
          setImage={setLightLogo}
          logo={brandData?.logo_light?.url}
        />

        <BrandLogoMediaInput
          label={"Favicon"}
          img={favicon}
          setImage={setFavicon}
          logo={brandData?.favicon?.url}
        />
      </div>

      <div className="my-4 w-full flex items-center gap-4 ">
        <InputComp2
          label={"Brand Name"}
          value={brandData?.name}
          register={register}
          registerValue={"name"}
          errors={errors.name?.message}
          size={"w-full flex flex-col text-sm gap-1 text-sm"}
        />
        <InputComp2
          label={"Tag Line"}
          value={brandData?.tagline}
          register={register}
          registerValue={"tagline"}
          errors={errors.tagline?.message}
          size={"w-full flex flex-col text-sm gap-1"}
        />
        <InputComp2
          label={"Brand-Address"}
          value={brandData?.brand_address}
          register={register}
          registerValue={"address"}
          errors={errors.address?.message}
          size={"w-full flex flex-col text-sm gap-1"}
        />
      </div>

      <div className="my-4 w-full flex items-center gap-4 max-w-5xl ">
        <div className="w-full flex flex-col text-sm gap-1">
          <label>Whatsapp Number</label>
          <input
            className="w-full outline-none border-gray-200 rounded ring-0 focus:ring-0"
            type="text"
            placeholder="Whatsapp..."
            {...register("whatsapp_number", {
              valueAsNumber: true,
              validate: (value) => value > 0,
              max: 10,
              value: brandData?.whatsapp_number,
            })}
          />
          <p className="text-red-600 text-sm ">
            {errors.whatsapp_number?.message}
          </p>
        </div>

        <InputComp2
          label={"Calling Number"}
          value={brandData?.calling_number}
          register={register}
          registerValue={"calling_number"}
          errors={errors.calling_number?.message}
          size={"w-full flex flex-col text-sm gap-1"}
        />

        <InputComp2
          label={"Email"}
          value={brandData?.email}
          register={register}
          registerValue={"email"}
          errors={errors.email?.message}
          size={"w-full flex flex-col text-sm gap-1"}
          type={"email"}
        />
      </div>

      <div className="my-4 w-full flex items-center gap-4 max-w-5xl">
        <InputComp2
          label={"Facebook"}
          value={brandData?.facebook}
          register={register}
          registerValue={"facebook"}
          size={"w-full flex flex-col text-sm gap-1"}
        />

        <InputComp2
          label={"Instagram"}
          value={brandData?.instagram}
          register={register}
          registerValue={"instagram"}
          size={"w-full flex flex-col text-sm gap-1"}
        />

        <InputComp2
          type={"url"}
          label={"Youtube"}
          value={brandData?.telegram}
          register={register}
          registerValue={"youtube"}
          size={"w-full flex flex-col text-sm gap-1"}
        />
      </div>

      <div className="w-full flex items-center justify-end max-w-5xl">
        <button className="submitButton">Submit</button>
      </div>
    </form>
  );
};

export default GlobalBrandSettings;
