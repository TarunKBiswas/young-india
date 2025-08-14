/* eslint-disable react/prop-types */

const ActionPanelButton = (props) => {
  return (
    <button
      className={`px-2 py-1.5 bg-[#222222] hover:bg-[#222222]/90 text-white text-xs capitalize rounded transition duration-150`}
      // className={`px-2 py-1.5 ${
      //   props.status === "DECLINED"
      //     ? "bg-red-400"
      //     : "bg-[#222222] hover:bg-[#222222]/90"
      // }  text-white text-xs capitalize rounded transition duration-150`}
      onClick={props?.action}
    >
      {props?.name}
    </button>
  );
};

export default ActionPanelButton;
