/* eslint-disable react/prop-types */

const CustomerInfoCard = ({ data }) => {
  
  const name = data?.consumer_name;
  const email = data?.consumer_email;
  const phone = data?.consumer_phone;

  return (
    <div className="w-full flex items-center justify-start gap-2">
      <p className="h-10 w-10 bg-gray-200 p-2 rounded-full uppercase flex items-center justify-center">
        <span className="text-gray-600 text-base">
          {name !== null ? name?.charAt(0) : email?.charAt(0)}
        </span>
      </p>
      <p className="flex flex-col items-start">
        <span className="text-xs 2xl:text-sm">{name}</span>
        <span className="text-xs">{phone}</span>
      </p>
    </div>
  );
};

export default CustomerInfoCard;
