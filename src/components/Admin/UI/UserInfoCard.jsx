/* eslint-disable react/prop-types */

const SubscriberAvatar = (props) => {
  let name = props.user?.name;
  let email = props.user?.email;
  let phone = props.user?.phone;
  return (
    <div className="w-full flex items-center justify-start gap-2">
      <p className="h-10 w-10 bg-gray-200 p-2 rounded-full uppercase flex items-center justify-center">
        <span className="text-black text-lg">{name?.charAt(0)}</span>
      </p>
      <p className="flex flex-col items-start">
        <span className="font-medium">{name}</span>
        <span className="text-xs">{phone}</span>
        <span className="text-xs">{email}</span>
      </p>
    </div>
  );
};

export default SubscriberAvatar;
