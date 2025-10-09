// import React, { useState } from "react";
// import { auth, provider } from "../../firebase";
// import { signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Login = ({ onRegister, onForgotPassword, setLoginModalOpen }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [name , setName] = useState("")
//   const navigate = useNavigate();

//   const { user, setUser, redirectPath, setRedirectPath } = useAuth();

//   // Email/Password login
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name && email && password) {
//       setUser({ email ,fullname:name});
//       setSuccessMsg("Login successful!");
//       setErrorMsg("");

//       // ✅ Close modal
//       if (setLoginModalOpen) setLoginModalOpen(false);

//       // ✅ Redirect
//       if (redirectPath) {
//         navigate(redirectPath, { replace: true });
//         setRedirectPath(null);
//       } else {
//         navigate("/", { replace: true });
//       }
//     } else {
//       setErrorMsg("Incorrect email or password.");
//       setSuccessMsg("");
//     }
//   };

//   // Google Sign-In
//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const gUser = result.user;

//       setUser({
//         email: gUser.email,
//         fullname: gUser.displayName,
//         photoURL: gUser.photoURL,
//         uid: gUser.uid,
//       });

//       setSuccessMsg(`Welcome ${gUser.displayName}`);
//       setErrorMsg("");

//       // ✅ Close modal
//       if (setLoginModalOpen) setLoginModalOpen(false);

//       // ✅ Redirect
//       if (redirectPath) {
//         navigate(redirectPath, { replace: true });
//         setRedirectPath(null);
//       } else {
//         navigate("/", { replace: true });
//       }
//     } catch (error) {
//       console.error("Google Sign-in Error:", error.message);
//       setErrorMsg(error.message);
//       setSuccessMsg("");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
//       <h3 className="text-3xl text-center mb-6 font-semibold">Login</h3>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email Address"
//           className="w-full p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {errorMsg && <p className="text-red-500">{errorMsg}</p>}
//         {successMsg && <p className="text-green-500">{successMsg}</p>}

//         <button
//           type="submit"
//           className="w-full bg-gray-800 text-black py-2 rounded hover:bg-gray-900"
//         >
//           Login
//         </button>
//       </form>

//       <div className="text-center my-4 text-gray-500">OR</div>

//       <button
//         onClick={handleGoogleSignIn}
//         className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700"
//       >
//         Login with Google
//       </button>

//       <div className="text-center mt-4 text-gray-500">
//         Not a member?{" "}
//         <span
//           onClick={onRegister}
//           className="text-blue-600 cursor-pointer hover:underline"
//         >
//           Register
//         </span>
//       </div>

//       <div className="text-center mt-2 text-gray-500">
//         <span
//           onClick={onForgotPassword}
//           className="cursor-pointer hover:underline"
//         >
//           Forgot Password?
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = ({ onRegister, onForgotPassword, setLoginModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const { login, loginWithGoogle, redirectPath, setRedirectPath } = useAuth();

  //  Email/Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      setSuccessMsg("Login successful!");
      setErrorMsg("");
      if (setLoginModalOpen) setLoginModalOpen(false);
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        setRedirectPath(null);
      } else {
        navigate("/", { replace: true });
      }
    } else {
      const  uiError = getUIshowError(res.code) || "Something went wrong."
      setErrorMsg(uiError)
      // setErrorMsg(res.message || "Incorrect email or password.");
      setSuccessMsg("");
    }
  };

  //  Google Sign-In
  const handleGoogleSignIn = async () => {
    const res = await loginWithGoogle();
    if (res.success) {
      setSuccessMsg("Google login successful!");
      setErrorMsg("");
      if (setLoginModalOpen) setLoginModalOpen(false);
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        setRedirectPath(null);
      } else {
        navigate("/", { replace: true });
      }
    } else {
      
      setErrorMsg(res.message || "Google login failed.");
      setSuccessMsg("");
    }
  };

  const getUIshowError = (code) => {
    switch (code) {
      case "auth/invalid-credential":
    case "auth/user-not-found":
      return " User not found. Please enter correct email & password.";
    case "auth/wrong-password":
      return " Incorrect password. Try again.";
    case "auth/network-request-failed":
      return " No internet connection.";
    default:
      return "Something went wrong. Please try again.";
    }
  }



  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h3 className="text-3xl text-center mb-6 font-semibold">Login</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg && <p className="text-red">{errorMsg}</p>}
        {successMsg && <p className="text-green-500">{successMsg}</p>}

        <button
          type="submit"
          className="w-full bg-gray-800 text-black py-2 rounded hover:bg-gray-900"
        >
          Login
        </button>
      </form>

      <div className="text-center my-4 text-gray-500">OR</div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700"
      >
        Login with Google
      </button>

      <div className="text-center mt-4 text-gray-500">
        Not a member?{" "}
        <span
          onClick={onRegister}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Register
        </span>
      </div>

      <div className="text-center mt-2 text-gray-500">
        <span
          onClick={onForgotPassword}
          className="cursor-pointer hover:underline"
        >
          Forgot Password?
        </span>
      </div>
    </div>
  );
};

export default Login;
