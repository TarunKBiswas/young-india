const ServerPaymentModal = () => {
  return (
    <div className="bg-black/95 fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center">
      <div className="relative w-full max-w-2xl  bg-white rounded">
        <div className="relative rounded-lg w-full h-full flex flex-col items-center justify-between">
          <div className="w-full flex flex-col items-center justify-center py-4 gap-3">
            <span className="capitalize font-medium text-gray-900 text-base px-3 font-sans">
              Dear Visitors, <br />
              We regret to inform you that due to unforeseen circumstances, our
              website is currently experiencing a temporary interruption in
              service. This interruption is a result of a delay in the payment
              of server fees by seller.
              <br />
              <span className="text-xs text-red-700">
                *(If You are admin please go to admin panel and pay the server
                fees)
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerPaymentModal;
