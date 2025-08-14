/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "../data/state";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Admin/Layouts/Header";
import Loading from "../components/Admin/Modals/Loading";
import Sidebar from "../components/Admin/Layouts/Sidebar";
import RtoModal from "../components/Admin/Orders/RtoModal";
import AddNewPlan from "../components/Admin/Plans/AddNewPlan";
import PlanDetails from "../components/Admin/Plans/PlanDetails";
import PayoutModal from "../components/Admin/Orders/PayoutModal";
import ShipNowModal from "../components/Admin/Orders/ShipNowModal";
import FailureModal from "../components/Admin/Modals/FailureModal";
import ThankyouModal from "../components/Admin/Modals/ThankyouModal";
import ShipRocketModal from "../components/Admin/Orders/ShipRocketModal";
import DeleteLeadsModal from "../components/Admin/Leads/DeleteLeadsModal";
import RejectOrderModal from "../components/Admin/Orders/RejectOrderModal";
import DeleteOrderModal from "../components/Admin/Orders/DeleteOrderModal";
import EditVariantModal from "../components/Admin/Product/EditVariantModal";
import ConsumerNoteModal from "../components/Admin/Leads/ConsumerNoteModal";
import AddAddressModal from "../components/Admin/Addresses/AddAddressModal";
import EditStaffModal from "../components/Admin/Users/Staff/EditStaffModal";
import AcceptOrederModal from "../components/Admin/Orders/AcceptOrederModal";
import EditBannerModal from "../components/Admin/Media/Banner/EditBannerModal";
import DeleteProductModal from "../components/Admin/Product/DeleteProductModal";
import { getGlobadData, getGlobalBrand, getStoreData } from "../utils/settings";
import AddSubscription from "../components/Admin/Subscriptions/AddSubscription";
import CreateVariantModal from "../components/Admin/Product/CreateVariantModal";
import ManualShippingModal from "../components/Admin/Orders/ManualShippingModal";
import EditUserModal from "../components/Admin/Users/Customers/EditCustomerModal";
import SelectUserModal from "../components/Admin/Orders/DemoPage/SelectUserModal";
import CreateGroupModal from "../components/Admin/Social/Groups/CreateGroupModal";
import DeleteGroupModal from "../components/Admin/Social/Groups/DeleteGroupModal";
import DeleteAddressModal from "../components/Admin/Addresses/DeleteAddressModal";
import UpdateAddressModal from "../components/Admin/Addresses/UpdateAddressModal";
import AddSubCategoryModal from "../components/Admin/Category/AddSubCategoryModal";
import DeleteCategoryModal from "../components/Admin/Category/DeleteCategoryModal";
import DeleteBannerModal from "../components/Admin/Media/Banner/DeleteBannerModal";
import CreateBannerModal from "../components/Admin/Media/Banner/CreateBannerModal";
import MarkAsDeliveredModal from "../components/Admin/Orders/MarkAsDeliveredModal";
import DeleteUserModal from "../components/Admin/Users/Customers/DeleteCustomerModal";
import BulkPringDetailsModal from "../components/Admin/Product/BulkrPringDetailsModal";
import DemoAddToCartModal from "../components/Admin/Orders/DemoPage/DemoAddToCartModal";
import DeleteSubCategoryModal from "../components/Admin/Category/DeleteSubCategoryModal";
import CreateCampaignModal from "../components/Admin/Social/Campaign/CreateCampaignModal";
import DeleteTutorialModal from "../components/Admin/Media/Tutorials/DeleteTutorialModal";
import DeleteCampaignModal from "../components/Admin/Social/Campaign/DeleteCampaignModal";
import EditCollectionModal from "../components/Admin/collection/collections/EditCollectionModal";
import DeleteColletionModal from "../components/Admin/collection/collections/DeleteColletionModal";
import EditStaticCollectionModal from "../components/Admin/collection/staticCollection/EditStaticCollectionModal";
import SubscriptionFeeModal from "../components/Admin/Modals/SubscriptionFeeModal";
import ThankuModal from "../components/Admin/Modals/ThankuModal";
import AccepetReturnRequestModal from "../components/Admin/Orders/AccepetReturnRequestModal";
import RejectReturnRequestModal from "../components/Admin/Orders/RejectReturnRequestModal";
import LeadInfoModal from "../components/Admin/Leads/LeadInfoModal";
import DeleteVariantModal from "../components/Admin/Product/DeleteVariantModal";
import CreateMarquee from "../components/Admin/Settings/CreateMarquee";
import AddWalletData from "../components/Admin/Wallet/AddWalletData";
import CreateCategoryModal from "../components/Admin/Category/CreateCategoryModal";
import EditCategoryModal from "../components/Admin/Category/EditCategoryModal";
import CreateCollectionModal from "../components/Admin/collection/collections/CreateCollectionModal";
import CreateUserModal from "../components/Admin/Users/Customers/CreateUserModal";
import AddStaffModal from "../components/Admin/Users/Staff/AddStaffModal";
import DeleteTestimonialModal from "../components/Admin/Settings/store/DeleteTestimonialModal";
import CreateTestimonailModal from "../components/Admin/Settings/store/CreateTestimonailModal";
import DeleteReviewModal from "../components/Admin/Reviews/DeleteReviewModal";
import ReviewDetails from "../components/Admin/Reviews/ReviewDetails";
import DeleteCouponModal from "../components/Admin/Coupons/DeleteCouponModal";
import CreateCouponModal from "../components/Admin/Coupons/CreateCouponModal";
import DeleteStoryModal from "../components/Admin/Settings/store/DeleteStoryModal";
import CreateStoryModal from "../components/Admin/Settings/store/CreateStoryModal";
import CreateReviewModal from "../components/Admin/Reviews/CreateReviewModal";

const MainContainer = () => {
  const [colors, setColors] = useState("#222222");
  const [brandData, setBrandData] = useState({});
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      sessionStorage.removeItem("token");
    } else {
      fetchInitialData();
    }
  }, []);

  useEffect(() => {
    // console.log(snap.globalData);
    if (snap.globalData?.data?.server_subscription === false) {
      const timer = setTimeout(() => {
        state.paymentAlertModal = true;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.globalData]);

  useEffect(() => {
    if (brandData?.favicon?.url) {
      const link = document.querySelector("link[rel~='icon']");
      if (link) link.href = brandData.favicon.url;
      document.title =
        brandData.name || brandData.tagline || "Socialseller MAX";
    }
  }, [brandData]);

  const fetchInitialData = async () => {
    try {
      const [globalRes, brandRes, storeRes] = await Promise.all([
        getGlobadData(),
        getGlobalBrand(),
        getStoreData(),
      ]);
      if (globalRes?.status === 200) state.globalData = globalRes?.data;
      if (brandRes?.data?.data) {
        state.brandInfo = brandRes?.data?.data;
        setBrandData(brandRes?.data?.data);
      }
      if (storeRes?.data?.data?.bg_color) {
        state.storeType = storeRes?.data?.data;
        setColors(storeRes?.data?.data?.bg_color);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  return (
    <>
      {snap?.paymentAlertModal ? (
        <SubscriptionFeeModal />
      ) : (
        <div
          style={{
            "--primary-color": colors,
          }}
        >
          <Header />
          <div className="min-h-[calc(100vh - 80px)] lg:ml-[225px] ">
            <Sidebar />
            <div>
              {snap?.serverFeePaidModal ? <ThankuModal /> : null}
              {snap.showFailureModal ? <FailureModal /> : null}
              {snap.showThankYouModal ? <ThankyouModal /> : null}
              {snap.showAddSubCategoryModal ? <AddSubCategoryModal /> : null}
              {snap.showCreateCategoryModal ? <CreateCategoryModal /> : null}
              {snap.showEditCategoryModal ? <EditCategoryModal /> : null}
              {snap.showDeleteCategoryModal ? <DeleteCategoryModal /> : null}
              {snap.showDeleteSubCategoryModal ? (
                <DeleteSubCategoryModal />
              ) : null}
              {snap.showAddUserModal ? <CreateUserModal /> : null}
              {snap.showDeleteUserModal ? <DeleteUserModal /> : null}
              {snap.showDeleteCollectionModal ? <DeleteColletionModal /> : null}
              {snap.showEditUserModal ? <EditUserModal /> : null}
              {snap.showAddStaffModal ? <AddStaffModal /> : null}
              {snap.showDeleteProductModal ? <DeleteProductModal /> : null}
              {snap.createVariantModal ? <CreateVariantModal /> : null}
              {snap.showAddCollectionModal ? <CreateCollectionModal /> : null}
              {snap.showEditCollectionModal ? <EditCollectionModal /> : null}
              {snap.showDeleteOrderModal ? <DeleteOrderModal /> : null}
              {snap.showAddBannerModal ? <CreateBannerModal /> : null}
              {snap.showDeleteBannerModal ? <DeleteBannerModal /> : null}
              {snap.showEditBannerModal ? <EditBannerModal /> : null}
              {snap.showDeleteAddressModal ? <DeleteAddressModal /> : null}
              {snap.showAddAddressModal ? <AddAddressModal /> : null}
              {snap.showEditAddressModal ? <UpdateAddressModal /> : null}

              {snap.acceptOrderModal ? <AcceptOrederModal /> : null}
              {snap.rejectOrderModal ? <RejectOrderModal /> : null}
              {snap.showManualShipModal ? <ManualShippingModal /> : null}
              {snap.showShipRocketModal ? <ShipRocketModal /> : null}
              {snap.addNewPlanModal ? <AddNewPlan /> : null}
              {snap.showPlanDetailsModal ? <PlanDetails /> : null}
              {snap.createNewGroupModal ? <CreateGroupModal /> : null}
              {snap.showDeleteGroupModal ? <DeleteGroupModal /> : null}
              {snap.showAddSubscriptionModal ? <AddSubscription /> : null}

              {snap.showDeleteTutModal ? <DeleteTutorialModal /> : null}
              {snap.showShipNowModal ? <ShipNowModal /> : null}
              {snap.markAsDeliveredModal ? <MarkAsDeliveredModal /> : null}
              {snap.payoutModal ? <PayoutModal /> : null}
              {snap.showEditStaticCollModal ? (
                <EditStaticCollectionModal />
              ) : null}
              {snap.showDeleteCampaignModal ? <DeleteCampaignModal /> : null}
              {snap.editVariantModal ? <EditVariantModal /> : null}
              {snap.showDeleteLeadModal ? <DeleteLeadsModal /> : null}
              {snap.showCreateCampaignModal ? <CreateCampaignModal /> : null}
              {snap.bulkPricingDetailModal ? <BulkPringDetailsModal /> : null}
              {snap.showEditStaffModal ? <EditStaffModal /> : null}
              {snap.showConsumerNoteModal ? <ConsumerNoteModal /> : null}
              {snap.showRtoModal ? <RtoModal /> : null}
              {snap.acceptReturnReqModal ? <AccepetReturnRequestModal /> : null}
              {snap.rejecteReturnReqModal ? <RejectReturnRequestModal /> : null}
              {snap.showLeadInfoModal ? <LeadInfoModal /> : null}
              {snap.deleteVariantModal ? <DeleteVariantModal /> : null}
              {snap.createMarqueeModal ? <CreateMarquee /> : null}
              {snap.showAddWalletModal ? <AddWalletData /> : null}
              {snap.showDeleteTestimonials ? <DeleteTestimonialModal /> : null}
              {snap.showCreateTestimonidalModal ? (
                <CreateTestimonailModal />
              ) : null}
              {snap.showDeleteReviewModal ? <DeleteReviewModal /> : null}
              {snap.showReviewDetailsModal ? <ReviewDetails /> : null}
              {snap.showDeleteCouponModal ? <DeleteCouponModal /> : null}
              {snap.showAddCouponModal ? <CreateCouponModal /> : null}
              {snap.showDeleteStoryModal ? <DeleteStoryModal /> : null}
              {snap.showAddStoryModal ? <CreateStoryModal /> : null}
              {snap.showCreateReviewModal ? <CreateReviewModal /> : null}

              {/* ******************DEMO START******************** */}
              {snap.showSelectUserModal ? <SelectUserModal /> : null}
              {snap.showDemoAddToCartModal ? <DemoAddToCartModal /> : null}
              {/* ******************DEMO END******************** */}

              <div className=" h-full">
                {snap.isLoading ? <Loading /> : null}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainContainer;
