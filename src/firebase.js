import firebase from 'firebase'
//src="https://www.gstatic.com/firebasejs/5.5.9/firebase.js">
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyB8_coqFgBUv0uJ_leqbEJECYkqT1JiHAI",
authDomain: "codehub-gvsu.firebaseapp.com",
databaseURL: "https://codehub-gvsu.firebaseio.com",
projectId: "codehub-gvsu",
storageBucket: "codehub-gvsu.appspot.com",
messagingSenderId: "662707097710"
};
var database = firebase.initializeApp(config)
export default database