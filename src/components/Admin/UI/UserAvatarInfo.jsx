/* eslint-disable react/prop-types */

const UserAvatarInfo = (props) => {
  const redirectToWhatsApp = (number) => {
    window.open(`https://api.whatsapp.com/send?phone=${number}`, "_blank");
  };

  const redirectToEmail = (id) => {
    window.open(`mailto:${id}`, "_blank");
  };

  return (
    <div className="w-full flex items-center justify-start gap-2">
      <p className="h-12 w-12 bg-gray-200 p-2 rounded-full uppercase flex items-center justify-center">
        <span className="text-black text-lg">
          {(props?.user?.name || props?.user?.username)?.charAt(0)}
        </span>
      </p>

      <p className="flex flex-col items-start">
        <span className="font-medium">
          {props?.user?.name || props?.user?.username}
        </span>
        <span
          className="text-xs cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => redirectToWhatsApp(props?.user?.phone)}
        >
          {props?.user?.phone}
        </span>
        <span
          className="text-xs cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => redirectToEmail(props?.user?.email)}
        >
          {props?.user?.email}
        </span>
      </p>
    </div>
  );
};

export default UserAvatarInfo;
