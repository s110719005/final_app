import firebase from 'firebase'
import "@firebase/firestore";

import { StoreContext, StoreProvider } from "../src/stores";

const firebaseConfig ={
    apiKey: "AIzaSyDpghpn6rtCHkYXso1iYXlffe7IJAuoFTU",
    authDomain: "appfinal-23a98.firebaseapp.com",
    databaseURL: "https://appfinal-23a98.firebaseio.com",
    projectId: "appfinal-23a98",
    storageBucket: "appfinal-23a98.appspot.com",
    messagingSenderId: "235000499477",
    appId: "1:235000499477:web:6bbe48130682cf4afe6d1c"
}

// const { isLoginState } = useContext(StoreContext);
//   const [isLogin, setIsLogin] = isLoginState;
  
  

class Fire{

    if(isLoginState){

    }
    constructor(callback) {
        this.init(callback);
    }
    init (callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null,user);
            }
            else{
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        })
    }

    // addList(list){
    //     let ref = this.ref

    //     ref.doc(list.id).add(list)
    // }

    // updateList(list) {
    //     let ref = this.ref

    //     ref.doc(list.id).update(list)
    // }

    getLists(callback){
        let ref = firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        //.doc("- [ ] mLGPbthTHgUePbjQBv9loFqq5yn2")
        .collection("lists");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }
    
    

    get userId(){
        return firebase.auth().currentUser.uid;
    }
    

    detach(){
        this.unsubscribe();
    }
}

export default Fire;


    

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyDpghpn6rtCHkYXso1iYXlffe7IJAuoFTU",
//     authDomain: "appfinal-23a98.firebaseapp.com",
//     databaseURL: "https://appfinal-23a98.firebaseio.com",
//     projectId: "appfinal-23a98",
//     storageBucket: "appfinal-23a98.appspot.com",
//     messagingSenderId: "235000499477",
//     appId: "1:235000499477:web:6bbe48130682cf4afe6d1c"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>