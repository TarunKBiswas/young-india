
import { FaGoogleScholar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SummaryCard = ({ summary }) => {
  const navigate = useNavigate();

  const data = [
    { title: "Video", time: summary?.lessonData?.length },
    { title: "Duration", time: "3h 54m" },
    { title: "difficulty", time: "Easy" },
  ];

  return (
    <div className="bg-white border rounded-xl shadow-md p-6 w-72 h-max">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      {data?.map((d, i) => {
        return (
          <>
            <div
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3"
              key={i}
            >
              <div className="flex items-center">
                <span className="text-gray-700 font-medium">{d?.title}</span>
              </div>
              <span className="text-gray-900 font-semibold">{d?.time}</span>
            </div>
          </>
        );
      })}

      <button
        onClick={() => navigate(`/academy/${summary?.id}`)}
        className="w-full bg-[#0d66ff] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-3"
      >
        <FaGoogleScholar /> Start the course
      </button>
    </div>
  );
};

export default SummaryCard;
