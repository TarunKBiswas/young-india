/* eslint-disable react/prop-types */
import moment from "moment";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div
      className="rounded overflow-hidden shadow-lg cursor-pointer"
      onClick={() => clickHandler(blog?.id)}
    >
      <div className="relative">
        <img
          className="w-full"
          src={blog?.thumbnail?.url}
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-500 text-sm">
          {moment(blog?.createdAt)?.format("DD-MM-YYYY hh:mm")} || Admin
        </p>
        <p className="font-semibold capitalize text-lg inline-block transition duration-500 ease-in-out">
          {blog?.title}
        </p>
      </div>
      <div className="px-6 py-4 flex items-center gap-2">
        <span className="text-blue-400 hover:text-blue-600 transition-all duration-300 ">
          Read More
        </span>
        <IoMdArrowDroprightCircle className="h-4 w-4" />
      </div>
    </div>
  );
};

export default BlogCard;
