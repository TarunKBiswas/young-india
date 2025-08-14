/* eslint-disable react/prop-types */

const ModalUserInfo = ({ user }) => {
  let userData = user?.user;
  return (
    <div className="w-full flex items-center justify-start gap-2">
      <p className="h-12 w-12 bg-gray-200 p-2 rounded-full uppercase flex items-center justify-center">
        <span className="text-black text-lg">
          {user?.name?.charAt(0) || user?.user?.username?.charAt(0)}
        </span>
      </p>

      <p className="flex flex-col items-start">
        <span className="font-medium">
          {userData?.username || userData?.name || user?.name}
        </span>
        <span className="text-xs cursor-pointer hover:scale-105 transition-all duration-300">
          {userData?.phone || userData?.phone || user?.phone}
        </span>
        <span className="text-xs cursor-pointer hover:scale-105 transition-all duration-300">
          {userData?.email}
        </span>
      </p>
    </div>
  );
};

export default ModalUserInfo;
