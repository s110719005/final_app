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
        let ref = this.ref.orderBy("id")
//.doc("- [ ] mLGPbthTHgUePbjQBv9loFqq5yn2")
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }
    
    addList(nowid,list){
        let ref = firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists")
        .doc(nowid)
        ;
        //let admin = require(this.userId);
        ref.update({
            todos: firebase.firestore.FieldValue.arrayUnion({
                key:list.key,
                title: list.title,
                day:list.day,
                note:list.note,
                due:list.due,
                safe:list.safe,
                normal:list.normal,
                danger:list.danger
            })
          });

        // ref.update({
        //     todos:[{key:4,
        //     title: list.title,
        //     day:"",
        //     note:"",
        //     due:"",
        //     safe:true,
        //     normal:true,
        //     danger:true}]
        // });
    }

    updateList(list,callback) {
        let ref = firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists");


       
        ref.doc("1").update(lists[0])
        ref.doc("2").update(lists[1])
        ref.doc("3").update(lists[2])
        ref.doc("4").update(lists[3])
    }

    get userId(){
        return firebase.auth().currentUser.uid;
    }
    
    get ref(){
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists");
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