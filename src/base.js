import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBF5lDFqoazajj7h77AVo8qx1VQ4PJSXVY",
  authDomain: "casa-dev-ac7f2.firebaseapp.com",
  databaseURL: "https://casa-dev-ac7f2.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;
