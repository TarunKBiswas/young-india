import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyAhQuwx_MmuikjEKUEyEipj69zdkj4ujUU",
  // authDomain: "reseller-demo.firebaseapp.com",
  // projectId: "reseller-demo",
  // storageBucket: "reseller-demo.appspot.com",
  // messagingSenderId: "864441176375",
  // appId: "1:864441176375:web:4de3757b8d53a04ec88ab2",
  // measurementId: "G-KJJJPRCVBP",

  appId: "1:1045177606737:web:620a408733202f4c834e70",
  apiKey: "AIzaSyBNBxg68ok0Zzy4gDelu4v05Ex7TEgLk7E",
  projectId: "resell-it-ssa",
  authDomain: "resell-it-ssa.firebaseapp.com",
  measurementId: "G-DT3NFHKEH1",
  storageBucket: "resell-it-ssa.appspot.com",
  messagingSenderId: "1045177606737",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
