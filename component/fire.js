import firebase from 'firebase'
import "@firebase/firestore";

const firebaseConfig ={
    apiKey: "AIzaSyDpghpn6rtCHkYXso1iYXlffe7IJAuoFTU",
    authDomain: "appfinal-23a98.firebaseapp.com",
    databaseURL: "https://appfinal-23a98.firebaseio.com",
    projectId: "appfinal-23a98",
    storageBucket: "appfinal-23a98.appspot.com",
    messagingSenderId: "235000499477",
    appId: "1:235000499477:web:6bbe48130682cf4afe6d1c"
}

class Fire{
    constructor(callback) {
        this.init(callback);
    }
    init (callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
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

    getLists(callback){
        let ref = firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection('lists');

        this.unsubscribe = ref.onSnapshot(snapshot => {
            list = []

            snapshot.forEach(doc=> {
                list.push({id: doc.id, ...doc.data()})
            })

            callback(lists)
        })
    }
    
    get userId(){
        return firebase.auth().currentUser.uid
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