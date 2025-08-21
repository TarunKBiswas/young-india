import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { htmlToText } from "html-to-text";
import { getBlogs } from "../../../utils/blogsNew";

const BlogsListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const subdomain = window?.location?.hostname?.split(".")[1];
  const isBlogSubdomain = subdomain === "dashboard";
  const navigate = useNavigate();

 useEffect(() => {
  const fetchBlogData = async () => {
    try {
      const res = await getBlogs();
      if (res.status !== 200) throw new Error("Failed to fetch blog data");
      setData(res.data);
    } catch (err) {
      console.error("Error loading blog:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchBlogData();
}, []);

  const handleClick = (title, id) => {
    const sanitizedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "");

    navigate(`/blog/${sanitizedTitle}/${id}`);
  };

  const handleNewBlog = () => {
    // Placeholder for new blog logic
  };

  return (
     <div className="h-auto flex flex-col items-center pb-10">
      <h1 className="mt-20 text-3xl text-[#314453] font-semibold font-barlow">
        {!isBlogSubdomain ? "BLOGS" : "Admin Blogs"}
      </h1>
      <span className="mt-1 bg-red-600 w-20 h-1 rounded-3xl"></span>

      {isBlogSubdomain && (
        <button
          className="mt-4 bg-green-500 hover:bg-green-600 hover:transform hover:scale-105 text-white font-semibold py-1 px-4 rounded cursor-pointer"
          onClick={handleNewBlog}
        >
          <Link to={`/create`}>Create New Blogs</Link>
        </button>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-full py-6">
          <div className="w-12 h-12 rounded-full border-4 border-t-4 border-red-600 border-t-white animate-spin"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-full py-10">
          <p className="text-gray-500 text-lg font-medium">No blogs found.</p>
        </div>
      ) : (
        <>
          {/* Featured Blog */}
          <div className="bg-[#F4F0F8] mt-6 w-full flex justify-center">
            <div className="w-full max-w-7xl px-2">
              {data.slice(0, 1).map((item, index) => (
                <div
                  key={index}
                  className="w-full my-10 flex items-center md:gap-20 gap-5 cursor-pointer md:flex-row-reverse flex-col"
                  onClick={() => handleClick(item.title, item.id)}
                >
                  <div className="flex-shrink-0">
                    {item.content && (
                      <img
                        src={item.content.find((c) => c.type === "image")?.value}
                        alt="Blog Thumbnail"
                        className="w-full h-60 object-cover mt-2"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-3xl flex items-center font-trebuchet">
                      "{item.title}" &nbsp; <GoArrowUpRight />
                    </h2>
                    {(() => {
                      const block = item.content?.find((c) => c.type === "text");
                      if (block?.value) {
                        const plainText = htmlToText(block.value, {
                          wordwrap: false,
                        });
                        const slicedText = plainText.slice(0, 220) + "...";
                        return (
                          <div className="text-gray-600 font-inter">
                            {slicedText}
                          </div>
                        );
                      }
                      return null;
                    })()}
                    <p className="text-gray-600">by: {item.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Blogs */}
          <div className="w-full max-w-7xl px-2">
            <div className="w-full">
              {data.length > 1 &&
                data.slice(1).map((item, index) => (
                  <div
                    key={index}
                    className={`w-full mt-20 flex items-center md:gap-20 gap-5 cursor-pointer ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } flex-col`}
                    onClick={() => handleClick(item.title, item.id)}
                  >
                    <div className="flex-shrink-0">
                      {item.content && (
                        <img
                          src={item.content.find((c) => c.type === "image")?.value}
                          alt="Blog Thumbnail"
                          className="w-full h-60 object-cover mt-2"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="font-semibold md:text-3xl text-2xl flex items-center font-trebuchet">
                        "{item.title}" &nbsp; <GoArrowUpRight />
                      </h2>
                      {(() => {
                        const block = item.content?.find((c) => c.type === "text");
                        if (block?.value) {
                          const slicedValue =
                            htmlToText(block.value, {
                              wordwrap: false,
                            }).slice(0, 220) + "...";
                          return (
                            <div className="text-gray-600 font-inter">
                              {slicedValue}
                            </div>
                          );
                        }
                        return null;
                      })()}
                      <p className="text-gray-600">by: {item.author}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsListing;
