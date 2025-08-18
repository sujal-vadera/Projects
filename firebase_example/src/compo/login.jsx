// import React from 'react'
// import { auth, provider, db } from "./Firebase";
// import { signInWithPopup } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { addDoc, collection, getDocs, query , where } from 'firebase/firestore';

// function Login() {
//     const navigate = useNavigate()
//     const handelclick = async () => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             console.log("user info", result.user)
//             alert(`welcome,${result.user.displayName}!`)

//             const userData = {
//                 username: result.user.displayName,
//                 email: result.user.email,
//                 image: result.user.photoURL,
//                 token: result.user.accessToken,
//                 uid: result.user.uid
//             }
//             const q = query(
//                 collection(db, "user"),
//                 where("uid", "==", result.user.uid)
//             );

//             const querySnapShot = await getDocs(q);
//             if (querySnapShot.empty) {
//                 await addDoc(collection(db, "users"), userData);
//                 console.log("user add firestore")
//             } else {
//                 console.log("user alredy exists")
//             }

//             navigate("/Homepage")

//         } catch (error) {
//             console.log("error login")
//         }

//     }
//     return (
//         <div>
//             <h1>hreee</h1>
//             <button onClick={handelclick} >login with gmail</button>
//         </div>
//     )
// }

// export default Login


// src/compo/Login.jsx
import React from "react";
import { auth, provider, db } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();

  const handelclick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("user info", result.user);
      alert(`Welcome, ${result.user.displayName}!`);

      const userData = {
        username: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
        token: result.user.accessToken,
        uid: result.user.uid,
      };

      // Check if user already exists
      const q = query(collection(db, "users"), where("uid", "==", result.user.uid));
      const querySnapShot = await getDocs(q);

      if (querySnapShot.empty) {
        await addDoc(collection(db, "users"), userData);
        console.log("User added to Firestore");
      } else {
        console.log("User already exists");
      }

      navigate("/Homepage");
    } catch (error) {
      console.log("Error login:", error.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handelclick}>Login with Google</button>
    </div>
  );
}

export default Login;
