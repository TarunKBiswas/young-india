export const ProductStats = (data) => {
  return [
    {
      statsTitle: "All Product ",
      statsValue: data?.allProducts || 0,
      id: "all",
    },
    {
      statsTitle: "Active Product",
      statsValue: data?.activeProduct || 0,
      id: "true",
    },
    {
      statsTitle: "In-Active Product",
      statsValue: data?.inActiveProducts || 0,
      id: "false",
    },
    {
      statsTitle: "Out Of Stock",
      statsValue: data?.outOfStock || 0,
      id: "out-of-stock",
    },
  ];
};
