import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createBlog, getSingleBlog, updateBlog } from "../../../utils/blogsNew";

const CreateBlog = () => {
  const { id } = useParams();
  const editorRef = useRef(null);
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState([{ type: "text", value: "" }]);
  const [youtubeEntries, setYoutubeEntries] = useState([
    // { url: "", title: "", description: "", labels: "" },
  ]);
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
          const res = await getSingleBlog(id);
        if (res.status !== 200) throw new Error("Failed to fetch blog data");
        const data = res.data;
        if (!data) setData(null);

        setData(data);
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content || []);
        setYoutubeEntries(
          (data.youtubelink || []).map((entry) => ({
            ...entry,
            labels: entry.labels.join(", "),
          }))
        );
      } catch (err) {
        console.error("Error loading blog:", err);
        // alert("Failed to load blog data.");
      }
    };

    fetchBlogData();
  }, []);

  const navigate = useNavigate();

  const handleContentChange = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };
  const handleFileChange = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };

  const addContentBlock = (type) => {
    setContent([...content, { type, value: "" }]);
  };

  const removeContentBlock = (index) => {
    const updated = [...content];
    updated.splice(index, 1);
    setContent(updated);
  };

  const handleYoutubeChange = (index, field, value) => {
    const updated = [...youtubeEntries];
    updated[index][field] = value;
    setYoutubeEntries(updated);
  };

  const addYoutubeEntry = () => {
    setYoutubeEntries([
      ...youtubeEntries,
      { url: "", title: "", description: "", labels: "" },
    ]);
  };

  const removeYoutubeEntry = (index) => {
    const updated = [...youtubeEntries];
    updated.splice(index, 1);
    setYoutubeEntries(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("author", author);

    const contentCopy = content.map((block, index) => {
      if (block.type === "image" && block.value instanceof File) {
        formData.append(`image_${index}`, block.value);
        return {
          type: "image",
          value: `image_${index}`, // Reference key, resolved on backend
        };
      } else {
        return {
          type: block.type,
          value: block.value,
        };
      }
    });

    formData.append("content", JSON.stringify(contentCopy));

    const formattedYoutube = youtubeEntries.map((entry) => ({
      url: entry.url,
      title: entry.title,
      description: entry.description,
      labels: entry.labels.split(",").map((l) => l.trim()),
    }));

    formData.append("youtubelink", JSON.stringify(formattedYoutube));

    try {
      const isUpdating = Boolean(data);
      const response = isUpdating ? await updateBlog(id, formData) : await createBlog(formData);
      alert("Blog submitted successfully!");
      const result = response.data;
      navigate(`/blogs
        `);
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Error submitting blog.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-20 text-center font-semibold text-3xl">Admin Blog</h1>
      <span className="mt-1 bg-red-600 w-20 h-1 rounded-3xl"></span>

      <div className="mt-10 max-w-4xl mb-4 mx-3 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        {data ? (
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 font-inetr text-center">
            Update Blog Post
          </h2>
        ) : (
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 font-inetr text-center">
            Create Blog Post
          </h2>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Content Blocks
            </h3>
            {content.map((block, i) => (
              <div key={i} className="flex flex-col gap-2 mb-5 pb-5">
                <div className="flex gap-2 items-center">
                  <select
                    value={block.type}
                    onChange={(e) => {
                      const updated = [...content];
                      updated[i].type = e.target.value;
                      updated[i].value = "";
                      setContent(updated);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="subheading">Subheading</option>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removeContentBlock(i)}
                    className="flex gap-2 items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm cursor-pointer"
                  >
                    <MdDelete /> Remove
                  </button>
                </div>

                {block.type === "text" ? (
                  <JoditEditor
                    ref={editorRef}
                    value={block.value}
                    onChange={(newContent) =>
                      handleContentChange(i, "value", newContent)
                    }
                  />
                ) : block.type === "image" ? (
                  <>
                    {block.value && (
                      <img
                        src={
                          typeof block.value === "string"
                            ? block.value
                            : URL.createObjectURL(block.value)
                        }
                        alt="Uploaded"
                        className="w-48 h-auto mb-2 border rounded"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(i, "value", e.target.files[0])
                      }
                      className="w-full border border-green-300 rounded-md p-2 cursor-pointer"
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter subheading"
                    value={block.value}
                    onChange={(e) =>
                      handleContentChange(i, "value", e.target.value)
                    }
                    className="w-full border border-blue-300 rounded-md p-2 "
                  />
                )}
              </div>
            ))}

            <div className="space-x-2 flex justify-center">
              <button
                type="button"
                onClick={() => addContentBlock("subheading")}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                + Add Subheading
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("text")}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                + Add Text
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("image")}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                + Add Image
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              YouTube videos section
            </h3>
            {youtubeEntries.map((entry, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm space-y-3"
              >
                <input
                  placeholder="Title"
                  value={entry.title}
                  onChange={(e) =>
                    handleYoutubeChange(index, "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <input
                  placeholder="YouTube video URL"
                  value={entry.url}
                  onChange={(e) =>
                    handleYoutubeChange(index, "url", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <input
                  placeholder="Description"
                  value={entry.description}
                  onChange={(e) =>
                    handleYoutubeChange(index, "description", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <input
                  placeholder="Labels (comma-separated)"
                  value={entry.labels}
                  onChange={(e) =>
                    handleYoutubeChange(index, "labels", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => removeYoutubeEntry(index)}
                    className="flex gap-2 items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm cursor-pointer"
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addYoutubeEntry}
              className="flex gap-2 items-center text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
            >
              <IoIosAddCircle className="text-xl text-white" /> Add YouTube
              Section
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 text-lg cursor-pointer"
            >
              {data ? "Update Blog" : "Submit Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
