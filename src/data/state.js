import { proxy } from "valtio";

const state = proxy({
  store_IP: null,
  admin_IP: null,

  liveUsers: 0,

  hideSideBarName: false,

  // global
  storeType: "",

  // UI
  showThankYouModal: false,
  showFailureModal: false,
  showForgetOtpModal: false,

  // fee modals
  paymentAlertModal: false,
  serverFeePaidModal: false,

  // HEADER
  storeStatus: {},
  refreshHeader: false,

  // Loading
  isLoading: false,
  secondaryLoading: false,
  adminInfo: {},
  brandInfo: {},
  globalData: null,

  // DASHBOARD
  statsData: null,

  // PRODUCT STATES
  selectedProdID: null,
  products: [],
  productsPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  searchProductPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  showDeleteProductModal: false,
  showEditProductModal: false,
  refreshProductList: false,
  galleryImageLimit: 10,
  productDetails: {},
  showAddVariantModal: false,
  editVariantModal: false,
  selectedVariantID: null,
  selectedVariantData: null,
  refreshBulkPriceList: false,
  refreshEditProductComponent: false,
  bulkPricingDetailModal: false,
  variantDetails: {},
  createVariantModal: false,
  thumbnailUrl: null,
  searchModal: false,
  searchTerm: false,
  deleteVariantModal: false,
  productStatsInfo: [],
  productStatsTag: "activeProduct",

  // category states
  categories: [],
  categoriesPagnination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  selectedCatID: null,
  selectedSubCatID: null,
  showDeleteCategoryModal: false,
  showDeleteSubCategoryModal: false,
  showAddSubCategoryModal: false,
  refreshCategoryList: false,
  refreshSubCategoryList: false,
  showEditCategoryModal: false,
  singleCatDetails: {},
  showEditCatDetailsModal: false,
  refreshEditCategoryPage: false,
  showCreateCategoryModal: false,

  // User states
  userDetails: [],
  users: null,
  usersPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  selectedUserID: null,
  showAddUserModal: false,
  showAddStaffModal: false,
  showDeleteUserModal: false,
  refreshUsersTable: false,
  userRoleIDs: [],
  showEditUserModal: false,
  editUserDetails: {},

  // Staff
  staffs: [],
  staffsPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  refreshStaffList: false,
  showEditStaffModal: false,

  // collections state
  collections: [],
  collectionsPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  selectedColID: null,
  refreshCollectionTable: false,
  showDeleteCollectionModal: false,
  showEditCollectionModal: false,
  showAddCollectionModal: false,

  // ORDERS STATE
  ordersPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  selectedOrderID: [],
  refreshOrdersList: false,
  showDeleteOrderModal: false,
  refreshOrderStats: false,
  selectedTag: "NEW",
  orderStatsInfo: [],
  acceptOrderModal: false,
  rejectOrderModal: false,
  refreshOrdersDetails: false,
  showShipNowModal: false,
  markAsDeliveredModal: false,
  payoutModal: false,
  orderProductDetails: null,
  showManualShipModal: false,
  showShipRocketModal: false,
  showRtoModal: false,
  acceptReturnReqModal: false,
  rejecteReturnReqModal: false,
  orderSearchTerm: null,

  // BANNERS STATE
  selectedBannerID: null,
  refreshBannersList: false,
  showDeleteBannerModal: false,
  showEditBannerModal: false,
  showAddBannerModal: false,

  // ADDRESS STATE
  selectedAddressID: null,
  refreshAddressList: false,
  showDeleteAddressModal: false,
  showEditAddressModal: false,
  showAddAddressModal: false,

  // TRANSACTIONS STATE
  transactionPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  refreshTrxList: false,

  // PLANS
  addNewPlanModal: false,
  showPlanDetailsModal: false,
  refreshPlanList: false,
  selectedPlanID: null,

  // GROUPS
  refreshGroupList: false,
  createNewGroupModal: false,
  showDeleteGroupModal: false,
  selectedGroupID: null,

  // SUBSCRIPTION
  subscribersPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  refreshSubscriptionList: false,
  showAddSubscriptionModal: false,

  // TUTORIALS
  selectedTutorialID: null,
  refreshTutList: false,
  showDeleteTutModal: false,

  // WALLET
  walletPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  refreshWalletList: false,
  showAddWalletModal: false,

  // STATIC COLLECTION
  selectedStaticCollID: null,
  showEditStaticCollModal: false,
  refreshStaticCollctionList: false,

  // CAMPAIGN
  selectedCampaignID: null,
  refreshCampaignList: false,
  showDeleteCampaignModal: false,
  showCreateCampaignModal: false,

  // LEADS
  leads: [],
  leadsPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  searchLeadsPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  selectedLeadID: null,
  showDeleteLeadModal: false,
  refreshLeadsList: false,
  consumerNote: null,
  showConsumerNoteModal: false,
  leadStatsInfo: [],
  sourceLeadsInfo: [],
  typeLeadsInfo: [],
  refreshLeadStats: false,
  selectedLeadTag: "OPEN",
  showLeadInfoModal: false,

  //Settings
  addPromotionalMessageModal: false,
  refreshPromotionalMsg: false,
  refreshMarqueeList: false,
  createMarqueeModal: false,

  // testimonails
  showDeleteTestimonials: false,
  refreshTestimonialList: false,
  selectedTestimonialID: null,
  showCreateTestimonidalModal: false,

  // reviews
  reviewsPagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  showReviewDetailsModal: false,
  showDeleteReviewModal: false,
  refreshReviewList: false,
  selectedReviewID: null,
  selectedDeleteReviewID: null,
  showCreateReviewModal: false,

  couponsPagination: {
    currentPage: 1,
    dataPerPage: 10,
    totalData: 0,
    totalPage: 0,
  },
  selectedCouponID: null,
  refreshCouponList: false,
  showDeleteCouponModal: false,
  showAddCouponModal: false,

  // story
  refreshStoryList: false,
  showDeleteStoryModal: false,
  showAddStoryModal: false,
  selectedStoryID: null,

  // ***************************************DEMO*****************************************************
  showSelectUserModal: false,
  demoUserData: null,
  addressID: null,
  showDemoAddToCartModal: false,
  demoProductData: null,
  demoCartData: [],

  orderProductsData: [],
});

export { state };
