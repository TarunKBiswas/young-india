/* eslint-disable react/prop-types */
const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 ${
        status === "EXPIRED" || status === null ? "bg-red-500" : null
      }  ${
        status === "ACTIVE" ? "bg-blue-600 " : null
      } rounded-lg text-xs text-white`}
    >
      {status || "EXPIRED"}
    </span>
  );
};

export default StatusBadge;
