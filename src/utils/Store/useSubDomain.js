export default function useSubdomain() {
  return window.location.host.split(".")[0];
}
