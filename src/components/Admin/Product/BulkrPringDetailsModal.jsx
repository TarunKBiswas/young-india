import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import FormModal from "../Modals/FormModal.jsx";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";

const BulkPringDetailsModal = () => {
  const snap = useSnapshot(state);
  const data = snap.variantDetails;

  const modalHandler = () => {
    state.bulkPricingDetailModal = false;
  };

  return (
    <>
      <FormModal
        closeModalHandler={modalHandler}
        title={"Variant: " + data?.name}
      >
        <div className="relative overflow-x-auto w-full ">
          <XTable className="w-full text-xs text-left text-gray-500 ">
            <THead className="text-xs text-gray-700 capitalize bg-gray-50 ">
              <TR>
                <TH scope="col" className="px-4 py-2">
                  From
                </TH>
                <TH scope="col" className="px-4 py-2">
                  To
                </TH>
                <TH scope="col" className="px-4 py-2">
                  Price
                </TH>
              </TR>
            </THead>
            <TBody>
              {data?.bulk_pricings?.data?.map((bp) => {
                return (
                  <TR className="bg-white border-b w-full " key={bp?.id}>
                    <TD className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {bp?.attributes?.from}
                    </TD>
                    <TD className="px-6 py-4">{bp?.attributes?.to}</TD>
                    <TD className="px-6 py-4">{bp?.attributes?.price}</TD>
                  </TR>
                );
              })}
            </TBody>
          </XTable>
        </div>
      </FormModal>
    </>
  );
};

export default BulkPringDetailsModal;
