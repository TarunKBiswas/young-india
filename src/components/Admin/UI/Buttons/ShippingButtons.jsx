/* eslint-disable react/prop-types */
export const ManualButton = ({ text, action, style, icon, img }) => {
  return (
    <>
      <button
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-500 ${style}`}
        onClick={action}
      >
        {img ? (
          <img
            src={img}
            className="h-5 "
            width={"auto"}
            height={"auto"}
            alt="image"
          />
        ) : null}
        {icon ? icon : null}
        {text}
      </button>
    </>
  );
};
