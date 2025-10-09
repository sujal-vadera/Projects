// // src/context/AuthContext.jsx
// import axios from "axios";
// import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // ✅ added GoogleAuthProvider & signInWithPopup
// import Cookies from "js-cookie";
// import React, { useState, useEffect, useContext, createContext } from "react";
// import { auth as firebaseAuth } from "../firebase";

// import { Children, createContext, useContext, useState } from "react";

// const initialAuth = { user: null };
// const AuthContext = createContext(initialAuth);

// export function AuthProvider({ children }) {
//   const auth = useProvideAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => useContext(AuthContext);

// function useProvideAuth() {
//   const [user, setUser] = useState(null);
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const [redirectPath, setRedirectPath] = useState(null);

//   // Load user from cookie
//   useEffect(() => {
//     const initialUser = Cookies.get("user");
//     if (initialUser) {
//       try {
//         setUser(JSON.parse(initialUser));
//       } catch (error) {
//         console.error("Error parsing user cookie:", error);
//       }
//     }
//   }, []);

//   // Save user to cookie
//   useEffect(() => {
//     if (user) {
//       Cookies.set("user", JSON.stringify(user), { expires: 7 });
//     }
//   }, [user]);

//   // --- Register ---
//   const register = async (email, fullname, password, shippingAddress = "", phone = "") => { // ✅ added shippingAddress & phone
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
//         { email, fullname, password, shippingAddress, phone }
//       );
//       const newUser = {
//         id: +res.data.id,
//         email,
//         fullname,
//         shippingAddress,
//         phone,
//         token: res.data.token,
//       };
//       setUser(newUser);
//       return { success: true, message: "register_successful" };
//     } catch (err) {
//       const errResponse = err?.response?.data;
//       return {
//         success: false,
//         message: errResponse?.error?.type || errResponse?.error?.detail?.message,
//       };
//     }
//   };

//   // --- Login ---
//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
//         { email, password }
//       );
//       const data = res.data;
//       const loggedInUser = {
//         id: +data.data.id,
//         email,
//         fullname: data.data.fullname,
//         phone: data.data.phone,
//         shippingAddress: data.data.shippingAddress,
//         token: data.token,
//       };
//       setUser(loggedInUser);
//       return { success: true, message: "login_successful" };
//     } catch {
//       return { success: false, message: "incorrect" };
//     }
//   };

//   // --- Forgot Password ---
//   const forgotPassword = async (email) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/forgot-password`,
//         { email }
//       );
//       return { success: res.data.success, message: "reset_email_sent" };
//     } catch {
//       return { success: false, message: "something_went_wrong" };
//     }
//   };

//   // --- Logout ---
//   const logout = async () => {
//     try {
//       await signOut(firebaseAuth);
//     } catch (err) {
//       console.log("error signing out", err);
//     }
//     setUser(null);
//     Cookies.remove("user");
//   };

//   // --- ✅ Google Login ---
//   const loginWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(firebaseAuth, provider);
//       const firebaseUser = result.user;

//       // Optional: Save / update user in backend
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google-login`,
//         {
//           email: firebaseUser.email,
//           fullname: firebaseUser.displayName,
//         }
//       );

//       const loggedInUser = {
//         id: res.data.id,
//         email: firebaseUser.email,
//         fullname: firebaseUser.displayName,
//         phone: res.data.phone || "",
//         shippingAddress: res.data.shippingAddress || "",
//         uid: firebaseUser.uid,
//       };
//       setUser(loggedInUser);
//       return { success: true };
//     } catch (error) {
//       console.error("Google login error:", error);
//       return { success: false };
//     }
//   };

//   return { 
//     user, setUser, register, login, forgotPassword, logout, 
//     redirectPath, setRedirectPath, loginModalOpen, setLoginModalOpen, 
//     loginWithGoogle // ✅ added
//   };
// }

// src/context/AuthContext.jsx

////////////////////////////////////////////////////////////////////////
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
//   updateProfile,
// } from "firebase/auth";
// import { auth, provider } from "../firebase";

// // =============================
// // Context Setup
// // =============================
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// // =============================
// // Provider Component
// // =============================
// export const AuthProvider = ({ children }) => {
//   // -----------------------------
//   // States
//   // -----------------------------
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const [redirectPath, setRedirectPath] = useState(null);

//   // -----------------------------
//   // Register
//   // -----------------------------
//   const register = async (email, password, name) => {
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       const newUser = res.user;

//       // Update profile with name
//       if (name) {
//         await updateProfile(newUser, { displayName: name });
//       }

//       // Force logout after registration
//       await signOut(auth);

//       return {
//         success: true,
//         message: "Registered successfully! Please login now.",
//         user: null,
//       };
//     } catch (err) {
//       console.error("Register error:", err.message);
//       return { success: false, message: err.message };
//     }
//   };

//   // -----------------------------
//   // Login (Email & Password)
//   // -----------------------------
//   const login = async (email, password) => {
//     try {
//       const res = await signInWithEmailAndPassword(auth, email, password);
//       return { success: true, user: res.user };
//     } catch (error) {
//       console.error("Login error:", error.message);
//       return {
//         success: false,
//         code: error.code,
//         message: error.message,
//       };
//     }
//   };

//   // -----------------------------
//   // Login (Google)
//   // -----------------------------
//   const loginWithGoogle = async () => {
//     try {
//       const res = await signInWithPopup(auth, provider);
//       return { success: true, user: res.user };
//     } catch (err) {
//       console.error("Google login error:", err.message);
//       return { success: false, message: err.message };
//     }
//   };

//   // -----------------------------
//   // Logout
//   // -----------------------------
//   const logout = async () => {
//     try {
//       await signOut(auth);
//       return { success: true };
//     } catch (err) {
//       return { success: false, message: err.message };
//     }
//   };

//   // -----------------------------
//   // Track Auth State
//   // -----------------------------
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("🔥 Auth state changed:", currentUser);
//       setUser(currentUser || null);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // -----------------------------
//   // Context Value
//   // -----------------------------
//   const value = {
//     user,
//     register,
//     login,
//     loginWithGoogle,
//     logout,
//     loginModalOpen,
//     setLoginModalOpen,
//     redirectPath,
//     setRedirectPath,
//   };

//   // -----------------------------
//   // Return Provider
//   // -----------------------------
//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth, provider } from "../firebase"


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [redirectPath, setRedirectPath] = useState(null)


  const register = async (email, password, name) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = res.user;

      if (name) {
        await updateProfile(newUser, { displayName: name });

      }
      // signout work is like direct logout to user after register and then manually login 
      await signOut(auth)
      return {
        success: true,
        message: " register successfully ! please login now.",
        user: null,
      };

    } catch (error) {

      console.log("register error:", error.message)
      return { success: false, message: err.message }
    }
  };

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: res.user }

    } catch (error) {
      console.log("login error", error.message)
      return { success: false, code: error.code, message: error.message };
    }
  }

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      return { success: true, user: res.user };

    } catch (error) {
      console.log("google login error:", error.message);
      return { success: false, message: err.message }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true };
    } catch (error) {
      return { success: false, message: err.message }
    }
  }

  // this work is like track user  like any user login ya logout so work useeffect and current user login to show a cyreent user or ya null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state change:", currentUser)
      setUser(currentUser || null)
      setLoading(false)
    })
    return () => unsubscribe();

  }, [])


  //this value will be use a  context thruw any state
  const value = {
    user, register, login, loginWithGoogle, logout,
    loginModalOpen,
    setLoginModalOpen,
    redirectPath,
    setRedirectPath,
  };
  return (
    <AuthContext.Provider value={value} >
      {!loading && children}
    </AuthContext.Provider >
  )
}