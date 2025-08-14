import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import TextTransition, { presets } from "react-text-transition";
import { getPromotionalMessages } from "../../../utils/PromotionalMessages";
import { HeadSkeleton } from "../UI/Cards/Skeletons";

const Head = () => {
  const [messages, setMessages] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [isVisible, setIsVisible] = useState(false);

  const getPromo = useCallback(async () => {
    // setIsLoading(true);
    try {
      const res = await getPromotionalMessages();
      if (res?.status === 200 && Array.isArray(res?.data?.data)) {
        setMessages(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch promotional messages:", error);
    }
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsVisible(true);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  useLayoutEffect(() => {
    // if (messages?.length === 0) {
    // setTimeout(() => {
    getPromo();
    // }, [1000]);
    // }
  }, [messages.length, getPromo]);

  useEffect(() => {
    if (messages.length === 0) return;

    const intervalId = setInterval(() => {
      setLineIndex((prevIndex) => (prevIndex + 1) % messages?.length);
    }, 1700);

    return () => clearInterval(intervalId);
  }, [messages]);

  const allTextContent = useMemo(() => {
    return messages?.map((obj) => obj?.title)?.filter(Boolean);
  }, [messages]);

  if (isLoading) {
    return <HeadSkeleton />;
  }

  if (!allTextContent?.length) {
    return null;
  }

  return (
    <div
      className={`w-full flex items-center justify-center py-2.5 transition-opacity bg-promoBgColor duration-1000 ease-in-out `}
    >
      <span className="capitalize text-promoTextColor">
        <TextTransition
          springConfig={presets.wobbly}
          className="!text-xs flex items-center justify-center font-medium"
        >
          {allTextContent[lineIndex]}
        </TextTransition>
      </span>
    </div>
  );
};

export default Head;
