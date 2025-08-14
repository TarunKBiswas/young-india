import toast from "react-hot-toast";

export const notify = (text) =>
  toast.success(text, {
    duration: 1000,
    position: "top-center",
    icon: "👍",
  });

export const notifyTop = (text) =>
  toast.success(text, {
    duration: 1000,
    position: "top-center",
    icon: "👍",
  });
