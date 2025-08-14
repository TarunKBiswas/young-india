import toast from "react-hot-toast";

export const PromiseToast = (api, msg, successMsg, failMsg) => {
  toast.promise(api, {
    loading: msg || "Saving...",
    success: <b>{successMsg || "Settings saved!"}</b>,
    error: <b>{failMsg || "Could not save."}</b>,
  });
};
