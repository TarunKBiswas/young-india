import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Await, Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getSingleBlog } from "../../../utils/blogsNew";

const BlogPage = () => {
  const { id } = useParams();
  
  const [blog, setBlog] = useState(null);
  const subdomain = window?.location?.hostname?.split(".")[1];
  const isBlogSubdomain = subdomain === "dashboard";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getSingleBlog(id);
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);
  function getYouTubeId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const navigate = useNavigate();
  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    const res = await deleteBlog(id);
    if (res.status !== 200) throw new Error("Failed to fetch blog data");
    navigate("/blogs");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

    if (!blog) return (<div className="flex items-center justify-center h-full py-6">
            <div className="w-12 h-12 rounded-full border-4 border-t-4 border-red-600 border-t-white animate-spin"></div>
          </div>);
  return (
    <div className="max-w-4xl mx-auto mt-24  px-2 ">
      {isBlogSubdomain && (
        <div className="flex justify-end gap-4 mb-4">
          <button className="  bg-blue-500 hover:bg-blue-600  text-white font-semibold py-1 px-4 rounded cursor-pointer">
            <Link to={`/blog/${id}/edit`} className="flex items-center gap-2">
              Update <FaRegEdit />
            </Link>
          </button>
          <button
            onClick={handleDeleteClick}
            className=" flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded cursor-pointer"
          >
            Delete <MdDeleteForever />
          </button>
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this blog?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-2 mt-4 font-trebuchet">
        {blog.title}
      </h1>
      <p className="text-gray-500 text-center mb-10 font-inter">
        By {blog.author}
      </p>

      {blog.content?.map((block, index) => {
        if (block.type === "subheading") {
          return (
            <h2
              key={index}
              className="text-2xl font-semibold mt-8 mb-2 text-red-600 font-trebuchet"
            >
              {block.value}
            </h2>
          );
        }
        if (block.type === "text") {
          return (
            <div
              key={index}
              className=" text-gray-600 font-inter"
              dangerouslySetInnerHTML={{ __html: block.value }}
            />
          );
        }
        if (block.type === "image") {
          return (
            <img
              key={index}
              src={block.value}
              alt={`content-img-${index}`}
              className="my-4 rounded-md shadow"
            />
          );
        }
        return null;
      })}

      {/* YouTube-style entries */}
      <div className="mt-10">
        {blog.youtubelink &&
          blog.youtubelink?.map((entry, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm"
            >
              {entry.url && (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(
                    entry.url
                  )}`}
                  title={`youtube-video-${index}`}
                  className="w-full h-60 md:h-80 rounded-md"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <h4 className="text-xl font-semibold mt-3 mb-1 font-poppins">
                {entry.title}
              </h4>
              <p className="text-gray-700 mb-1 font-inter">
                {entry.description}
              </p>
              {entry.labels?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {entry.labels.map((label, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-inter"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogPage;
