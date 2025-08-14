/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import { getSingleBlog } from "../../../../utils/Store/Blog";
import moment from "moment";
import Container from "../../UI/Wrappers/Container.Wrapper";
import SimpleModal from "../../../Admin/Modals/SimpleModal";

const Blog = () => {
  const [blogData, setBlogData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBiggesImage, setShowBiggerImage] = useState(false);

  const navigate = useNavigate();
  const param = useParams();
  const snap = useSnapshot(webState);
  const blogs = snap.blogPosts;

  const id = param.id;

  const getData = useCallback(async () => {
    try {
      let res = await getSingleBlog(id);
      if (res?.status === 200) {
        setBlogData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [id]);

  const clickHandler = useCallback(
    (id) => {
      navigate(`/blog/${id}`);
    },
    [navigate]
  );

  const closeBiggerImageHandler = () => {
    setShowBiggerImage(false);
    setSelectedImage(null);
  };

  const blogList = useMemo(() => {
    return blogs?.map((blog) => (
      <div key={blog?.id}>
        <li
          className="flex items-center gap-2 cursor-pointer "
          onClick={() => clickHandler(blog?.id)}
        >
          <img
            className="w-20 rounded object-cover"
            src={blog?.thumbnail?.url}
            alt={blog?.title}
          />
          <div>
            <h3 className="font-semibold">{blog?.title?.slice(0, 35)}</h3>
            <p className="text-xs text-gray-600">
              Posted On: {moment(blog?.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        </li>
        <hr className="text-black w-full" />
      </div>
    ));
  }, [blogs, clickHandler]);

  const renderedBlogContent = useMemo(() => {
    const paragraphs = blogData?.content
      ?.split("</p>")
      ?.filter((paragraph) => paragraph?.trim() !== "");

    return (
      <>
        <h1 className="text-3xl font-bold mb-2">{blogData?.title}</h1>
        <p className="text-gray-600 mb-4">
          Posted by : Admin / On:{" "}
          {moment(blogData?.createdAt).format("DD/MM/YYYY")}
        </p>
        <div className="mb-4 flex items-center justify-start text-gray-500 lg:h-[400px]">
          <img
            src={blogData?.thumbnail?.url}
            alt={blogData?.title}
            className="object-contain object-top h-full w-full"
          />
        </div>
        <div className="blog-content text-neutral-800 text-opacity-70 text-sm lg:text-base font-normal leading-tight">
          {paragraphs?.map((paragraph, index) => (
            <div key={index}>
              <span dangerouslySetInnerHTML={{ __html: `${paragraph}` }} />
            </div>
          ))}
        </div>
      </>
    );
  }, [blogData]);

  return (
    <Container className={"px-2 min-h-[70vh]"}>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 gap-4 lg:gap-8 mt-10 mb-16">
        <h2 className="text-xl font-bold lg:mb-4 block lg:hidden ">
          RECENT POSTS
        </h2>
        <aside
          className={`w-full md:w-1/4 max-h-[40vh] lg:max-h-[70vh] overflow-y-scroll ${
            blogs?.length < 8 && "scrollbar-hide"
          }`}
        >
          <div className="mb-8">
            <h2 className="text-xl font-bold lg:mb-4 hidden lg:block ">
              RECENT POSTS
            </h2>
            <div className="space-y-4 ">{blogList}</div>
          </div>
        </aside>

        <div className="w-full flex flex-col ">
          <main className="w-full md:max-w-3/4">{renderedBlogContent}</main>
        </div>
      </div>

      {showBiggesImage && (
        <SimpleModal
          closeModalHandler={closeBiggerImageHandler}
          modalSize={"max-w-xl"}
        >
          <div className="w-full p-2">
            <img
              className="w-full h-full max-h-screen  object-cover object-top"
              src={selectedImage}
            />
          </div>
        </SimpleModal>
      )}
    </Container>
  );
};

export default Blog;
