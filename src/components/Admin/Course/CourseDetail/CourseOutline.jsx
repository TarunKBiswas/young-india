
import { useNavigate } from "react-router-dom";

const CourseOutline = ({ outline }) => {
  const navigate = useNavigate();
  const outlineData = [
    {
      section: "Pillars & Mindset",
      items: [
        {
          title: "To watch before you start",
          duration: "11m 40s",
          thumbnail: "📹",
        },
        {
          title: "Everything you need to know about foreign markets in 2024",
          duration: "19m 13s",
          thumbnail: "📊",
        },
        {
          title: "What they'll never tell you before you start",
          duration: "17m 34s",
          thumbnail: "🧩",
        },
        {
          title: "The Minea method to boost your results",
          duration: "16m 15s",
          thumbnail: "🚀",
        },
        {
          title: "Understanding dropshipping technical terms",
          duration: "8m 32s",
          thumbnail: "📖",
        },
      ],
    },
    {
      section: "Search Winning Products",
      items: [
        {
          title: "Essential criteria for a winning product",
          duration: "9m 36s",
          thumbnail: "🏆",
        },
        {
          title: "Critical Mistakes to Avoid",
          duration: "10m 4s",
          thumbnail: "⚠️",
        },
      ],
    },
  ];
  console.log(outline);

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-start justify-start w-full">
      <h1 className="text-3xl font-bold mb-6">Outline</h1>
      {/* {outlineData.map((section, idx) => (
        <div key={idx} className="mb-8 w-full ">
          <h2 className="text-lg font-semibold mb-4 text-start">{`${idx + 1}. ${
            section.section
          }`}</h2>
          <div> */}
      {outline?.lessonData?.map((item, itemIdx) => 
      (
        <div
          key={itemIdx}
          onClick={() => navigate(`/academy/${item?.courseId}`)}
          className="flex items-center w-full  justify-between bg-white rounded-lg shadow p-4 mb-3 cursor-pointer hover:bg-gray-100"
        >
          <div className="flex items-center">
            {/* <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-md mr-4 text-2xl">
                    {item.thumbnail}
                  </div> */}
            <div className="bg-gray-200 rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8L6 5.5v5L10.5 8z" />
                <path d="M0 4a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H4a4 4 0 01-4-4V4zm1 0v8a3 3 0 003 3h8a3 3 0 003-3V4a3 3 0 00-3-3H4a3 3 0 00-3 3z" />
              </svg>
            </div>
            <p className="text-gray-800">{item.title}</p>
          </div>
          <p className="text-gray-500 text-sm">{item?.details?.duration}</p>
        </div>
      ))}
      {/* </div> */}
      {/* //   </div> */}
      {/* // ))} */}
    </div>
  );
};

export default CourseOutline;
