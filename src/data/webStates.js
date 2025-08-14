import { proxy } from "valtio";

const webState = proxy({
  //Auth
  resellerToken: null,
  brandInfo: {},
  resellerInfo: {},
  showLoginModal: false,
  showFlipModal: false,
  showVerifyOtpModal: false,
  showRegisterModal: false,
  showBrandInfoModal: false,
  showDeleteModal: false,
  showLogotModal: false,
  userPhoneNumber: null,
  fireBaseKeys: null,
  storeInfo: {},

  // categories
  showAllCategories: false,
  categoriesData: [],
  productsData: [],

  // collectiondata
  collectionsData: null,

  // Product
  productPagination: null,

  // tranding products
  trendingProducts: [],

  // community data
  whatsappCommunityData: [],

  // Cart
  cartProducts: [],
  cartItems: [],
  cartData: [],
  totalCartPrice: 0,
  refreshCartItems: false,
  buyNowProduct: null,
  purhcaseType: null,
  wishListProducts: [],
  selectCartProduct: null,
  productInfo: null,
  singleProductInfo: null,
  singleProductId: null,
  searchProducts: null,
  selectAddressID: null,
  selectPayment: null,
  orderDetails: null,
  searchTerms: null,
  checkoutFeaturedProducts: null,
  skeletonLoading: false,

  // MODALS
  isLoading: false,
  joinCommunityModal: false,
  showEditCartProduct: false,
  showEnquireNowModal: false,
  showEditAddressModal: false,
  showDeleteAddressModal: false,
  cartInfoModal: false,
  premiumPlans: false,
  returnRequestModal: false,
  itemRemove: false,
  fullScreenSearch: false,
  mobileSideBar: false,
  stories: false,
  singleOrderInfo: false,
  testimonialVideo: false,

  // user
  userData: null,

  // ID
  selectedID: null,
  selectedTag: null,

  // review
  showAddReviewModal: false,

  // navigate
  previousRoute: null,

  // order:
  singleOrderData: null,

  // Prmotional messages
  promoMessages: [],

  // search pagination
  searchPagination: null,
  searchModelData: null,

  // premium plans
  premiumPlansData: null,

  // Global Data
  globalData: null,

  // server payment modal
  serverFeeModal: false,

  // Social media links
  socialMediaLinks: null,

  // theme color
  themecolor: null,

  // payment
  setActiveCardSet: null,
  name: null,
  phone: null,

  // show otp modal
  showOTPModal: false,
  proceedCheck: null,
  storeType: null,

  // price
  totalPrice: null,
  codAdvancePrice: null,

  // return request
  returnRequestData: null,
  refreshOrderList: null,

  // userdetails
  loggedinUserData: null,

  // stories
  storiesDataID: null,

  //footer ui changes
  isFooterIntersecting: false,
  videoUrl: null,
  isVideo: false,

  // checkhout modal
  showCheckoutModal: false,
  checkOutStatus: "number",
  checkoutStage: "2%",
  checkoutOTP: null,
  checkoutUserMobile: "",
  checkoutAddressId: "",
  showApplyCouponsModal: false,
  selectProductCoupon: {},

  // coupon modal
  showCouponModal: false,

  // refreshreviews
  refreshReviewsList: false,
});

export { webState };
