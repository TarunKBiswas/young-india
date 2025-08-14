const fbqReady = (callback) => {
  if (typeof window.fbq === "function") {
    callback();
  } else {
    document.addEventListener("fbqReady", callback);
  }
};

export const landingPageEvent = () => {
  fbqReady(() => {
    window.fbq("track", "PageView");
  });
};

export const trackPurchase = () => {
  fbqReady(() => {
    window.fbq("track", "Purchase");
  });
};

export const addToCartEvent = () => {
  fbqReady(() => {
    window.fbq("track", "AddToCart");
  });
};

export const initiateCheckoutEvent = () => {
  fbqReady(() => {
    window.fbq("track", "InitiateCheckout");
  });
};
