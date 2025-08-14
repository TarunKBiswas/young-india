/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { getPolicyData } from "../../../utils/Store/Constant";
import Container from "./Wrappers/Container.Wrapper";

const XPage = ({ title, field }) => {
  const [content, setContent] = useState(null);

  const getData = useCallback(async () => {
    try {
      var result = await getPolicyData(field);
      console.log(result);
      setContent(result?.[field]);
    } catch (error) {
      console.log(error);
    }
  }, [field]);

  useEffect(() => {
    if (content === null) {
      getData();
    }
  }, [content, getData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={"px-2 min-h-[100vh]"}>
      <div className=" mx-auto w-full lg:min-w-[70vw] px-8 lg:px-20 py-8">
        <div className="w-full flex flex-col gap-4 ">
          <h1 className="text-3xl font-bold leading-7 tracking-wider">
            {title}
          </h1>
          <span className="text-lg">
            <span
              dangerouslySetInnerHTML={{ __html: content }}
              className="text-base font-medium tracking-wide"
            />{" "}
          </span>
        </div>
      </div>
    </Container>
  );
};

export default XPage;
