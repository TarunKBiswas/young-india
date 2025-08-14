/* eslint-disable react/prop-types */

const RoleBadge = ({ role }) => {
  return (
    <span
      className={`px-2 py-1 ${role === "Admin" ? "bg-red-500" : null} ${
        role === "Consumer" ? "bg-[#222222] " : null
      } ${
        role === "Staff" ? "bg-blue-600 " : null
      } rounded-lg text-xs text-white`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;
