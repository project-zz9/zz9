import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;

export { firestore, timestamp };

type DocumentData = firebase.firestore.DocumentData;
type CollectionReference = firebase.firestore.CollectionReference;
type WhereFilterOp = firebase.firestore.WhereFilterOp;
export type { DocumentData, CollectionReference, WhereFilterOp };

export const VISITOR_COLLECTION = "visitor";
export const GUESTBOOK_COLLECTION = "guestbook";
export const SCHEDULE_COLLECTION = "schedule";
export const AUTH_COLLECTION = "authorization";
