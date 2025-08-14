import { Days, Delivery, Guarantee, Payment } from "../UI/Icon/FeatureIcons";

// import Delivery from '../../../assets/website/delivery1.png'
// import quality1 from '../../../assets/website/quality1.png'
// import return1 from '../../../assets/website/return1.png'
// import cod1 from '../../../assets/website/cod1.png'

const Guarrenties = () => {
  const data = [
    { img: <Delivery />, title: "Free Shipping " },
    { img: <Guarantee />, title: "Quality Assurance" },
    { img: <Days />, title: "Easy Return" },
    { img: <Payment />, title: "24*7 Support " },
  ];

  return (
    <div className=" grid grid-cols-2 2xl:flex w-full gap-3 lg:gap-0 mt-5 items-center justify-evenly">
      {data?.map((d, i) => {
        return (
          <div key={i} className="flex flex-col gap-2  items-center">
            <span className="h-16 w-auto">{d?.img}</span>
            <div className="flex items-start">
              <span className="text-sm text-black text-center font-medium">
                {d?.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Guarrenties;
