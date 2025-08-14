import Container from "./Wrappers/Container.Wrapper";

const XFaq = () => {
  return (
    <Container className={"px-2 min-h-[100vh]"}>
      <div className=" mx-auto w-full lg:min-w-[70vw] px-8 lg:px-20 py-8">
        <div className="w-full flex flex-col gap-4 ">
          <h1 className="text-3xl font-bold leading-7 tracking-wider">
            Frequently Asked Questions
          </h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">General Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">
                  1. What products do you offer?
                </h3>
                <p className="text-gray-600">
                  We offer a wide range of gifts, including personalized items,
                  return gifts, birthday gifts, hampers, home décor, and more.
                  Explore our categories for the perfect gift!
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  2. Do you offer customization or personalization?
                </h3>
                <p className="text-gray-600">
                  Yes, many of our items can be personalized. Look for the
                  Personalize option on the product page to add names, messages,
                  or photos.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  3. How do I place an order?
                </h3>
                <p className="text-gray-600">
                  Simply browse our website, select your desired item, add it to
                  your cart, and proceed to checkout. Follow the steps to
                  complete your order.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  4. Can I schedule a delivery for a specific date?
                </h3>
                <p className="text-gray-600">
                  Absolutely! During checkout, you can choose a preferred
                  delivery date to make your gift extra special.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping & Delivery</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">
                  5. Where do you deliver?
                </h3>
                <p className="text-gray-600">We deliver across INDIA.</p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  6. What are your shipping charges?
                </h3>
                <p className="text-gray-600">
                  Shipping charges vary based on the product and delivery
                  location. Check the exact charges at checkout.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  7. How long does delivery take?
                </h3>
                <p className="text-gray-600">
                  Standard delivery depends upon location. We also offer
                  same-day or express delivery options for select items and
                  locations.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  8. Can I track my order?
                </h3>
                <p className="text-gray-600">
                  Yes, you will receive a tracking link via email/SMS once your
                  order is shipped.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payments & Returns</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">
                  9. What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept credit/debit cards, digital wallets, net banking,
                  and more. Check our payment options at checkout.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  10. Is cash-on-delivery (COD) available?
                </h3>
                <p className="text-gray-600">
                  COD is available for select locations and products. Look for
                  the COD option at checkout.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  11. What is your return/refund policy?
                </h3>
                <p className="text-gray-600">
                  If you received the wrong, damaged, or defective item, we
                  offer easy returns or refunds for eligible products. Visit our
                  Returns Policy page for details.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  12. Can I cancel or modify my order?
                </h3>
                <p className="text-gray-600">
                  Orders can be cancelled or modified if they haven’t been
                  processed. Contact our support team immediately for
                  assistance.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Gift Customization & Packaging
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">
                  13. Do you offer gift wrapping?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide premium gift-wrapping services. Add the option
                  during checkout.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  14. Can I include a personalized message?
                </h3>
                <p className="text-gray-600">
                  Absolutely! You can add a custom message while placing your
                  order, which will be included with your gift.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Customer Support</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">
                  15. How can I contact you?
                </h3>
                <p className="text-gray-600">
                  Reach us at Phone no. 91-7982294997, Email-
                  starblazegifts.com, or through the live chat option on our
                  website.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  16. What should I do if my order arrives damaged?
                </h3>
                <p className="text-gray-600">
                  We’re sorry for the inconvenience. Please contact us within 24
                  hours with photos of the damaged product for a replacement or
                  refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default XFaq;
