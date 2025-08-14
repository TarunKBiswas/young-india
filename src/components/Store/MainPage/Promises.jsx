import Container from "../UI/Wrappers/Container.Wrapper";
import Promises1 from "../UI/Icon/Promises1";
import Promises2 from "../UI/Icon/Promises2";
import Promises3 from "../UI/Icon/Promises3";
import Promises4 from "../UI/Icon/Promises4";
import { useMemo } from "react";

const Promises = () => {
  const promisesData = useMemo(
    () => [
      {
        img: Promises1,
        title: "Professional Service",
        description: "Efficient customer support from passionate team",
      },
      {
        img: Promises2,
        title: "Secure Payment",
        description: "All types of secure payment methods",
      },
      {
        img: Promises3,
        title: "Fast Delivery",
        description: "Fast and convenient door-to-door delivery",
      },
      {
        img: Promises4,
        title: "Quality & Savings",
        description: "Comprehensive quality control and affordable prices",
      },
    ],
    []
  );

  return (
    <section className="bg-themecolor text-textcolor w-full">
      <Container>
        <div className="py-8 px-3 lg:px-0 w-full flex flex-col gap-10 lg:flex-row">
          {promisesData?.map(({ img: Icon, title, description }, index) => {
            return (
              <div
                className="w-full flex items-center lg:items-start justify-start gap-4"
                key={index}
              >
                <div>
                  <div className="w-14 h-14 flex rounded-full border  items-center justify-center">
                    <Icon
                      className={"w-12 h-12 flex items-center justify-center "}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium">{title}</span>
                  <span className="text-sm font-normal text-start capitalize">
                    {description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Promises;
