import Marquee from "react-fast-marquee";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getMarqueeData } from "../../../utils/Marquees";
import { webState } from "../../../data/webStates";
import ReactLazyLoad from "react-lazyload";

const Marquees = () => {
  const [marquee, setMarquee] = useState([]);

  const marqueeData = useCallback(async () => {
    try {
      let res = await getMarqueeData();
      if (res?.status === 200) {
        setMarquee(res?.data?.data);
        webState.marqueeLength = res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    marqueeData();
  }, [marqueeData]);

  const memorizedMarqueeData = useMemo(() => {
    return marquee?.map((img) => (
      <ReactLazyLoad height={100} key={img?.id} offset={100} once>
        <img
          width={"auto"}
          height={"auto"}
          alt="image"
          src={img?.image?.url}
          className="w-[250px] h-[10vh] object-contain lg:rounded-xl flex items-center justify-center"
        />
      </ReactLazyLoad>
    ));
  }, [marquee]);

  return (
    <>
      {marquee?.length > 0 ? (
        <div className="w-full ">
          <Marquee
            speed={100}
            className="w-full flex pb-2 gap-4"
            behavior="alternate"
            pauseOnHover
            autoFill
          >
            <div className="w-full flex items-center gap-20 ml-20">
              {memorizedMarqueeData}
            </div>
          </Marquee>
        </div>
      ) : null}
    </>
  );
};

export default Marquees;
