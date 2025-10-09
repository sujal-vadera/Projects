
// import { Fragment } from "react";
// import React, { useState, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import Button from "../Buttons/Button";
// import Login from "./Login";
// import Register from "./Register";
// import ForgotPassword from "./ForgotPassword";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const LoginForm = ({ extraClass, children }) => {
//   const [currentPage, setCurrentPage] = useState("login");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const auth = useAuth();
//   const navigate = useNavigate();

//   let modalBox;
//   if (currentPage === "login") {
//     modalBox = (
//       <>
//         <Login
//           onRegister={() => setCurrentPage("register")}
//           onForgotPassword={() => setCurrentPage("forgot-password")}
//           errorMsg={errorMsg}
//           setErrorMsg={setErrorMsg}
//           setSuccessMsg={setSuccessMsg}
//         />
//         {/* ✅ Google Login Button */}
//         <button
//           onClick={async () => {
//             const res = await auth.loginWithGoogle();
//             if (!res.success) setErrorMsg("Google login failed.");
//           }}
//           className="w-full mt-4 py-2 bg-red-500 text-white rounded"
//         >
//           Login with Google
//         </button>
//       </>
//     );
//   } else if (currentPage === "register") {
//     modalBox = (
//       <Register
//         onLogin={() => setCurrentPage("login")}
//         errorMsg={errorMsg}
//         setErrorMsg={setErrorMsg}
//         setSuccessMsg={setSuccessMsg}
//       />
//     );
//   } else {
//     modalBox = (
//       <ForgotPassword
//         onLogin={() => setCurrentPage("login")}
//         errorMsg={errorMsg}
//         setErrorMsg={setErrorMsg}
//         setSuccessMsg={setSuccessMsg}
//       />
//     );
//   }

//   function closeModal() {
//     setErrorMsg("");
//     setSuccessMsg("");
//     auth.setLoginModalOpen(false);
//   }

//   // ✅ Redirect after login
//   useEffect(() => {
//     if (auth.user && auth.redirectPath) {
//       navigate(auth.redirectPath, { replace: true });
//       auth.setRedirectPath(null);
//     }
//   }, [auth.user, auth.redirectPath, navigate]);

//   return (
//     <>
//       <div className={`${extraClass}`}>
//         <button
//           type="button"
//           onClick={() => auth.setLoginModalOpen(true)}
//           aria-label="Account"
//           className={`${extraClass}`}
//         >
//           {children}
//         </button>
//       </div>

//       <Transition show={auth.loginModalOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-10 overflow-y-auto"
//           style={{ zIndex: 99999 }}
//           static
//           open={auth.loginModalOpen}
//           onClose={closeModal}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-gray500 opacity-50" />
//             </Transition.Child>

//             <span className="inline-block h-screen align-middle" aria-hidden="true">
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
//                 <button
//                   type="button"
//                   className="absolute right-5 top-2 outline-none focus:outline-none text-2xl"
//                   onClick={closeModal}
//                 >
//                   &#10005;
//                 </button>
//                 {modalBox}
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default LoginForm;


// authform to work current page state maintain like login register 
import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ extraClass, children }) => {
  const [currentPage, setCurrentPage] = useState("login");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  let modalBox;
  if (currentPage === "login") {
    modalBox = (
      <Login
        onRegister={() => setCurrentPage("register")}
        onForgotPassword={() => setCurrentPage("forgot-password")}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
        setLoginModalOpen={auth.setLoginModalOpen}
      />
    );
  } else if (currentPage === "register") {
    modalBox = (
      <Register
        onLogin={() => setCurrentPage("login")}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
    );
  } else {
    modalBox = (
      <ForgotPassword
        onLogin={() => setCurrentPage("login")}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
    );
  }

  function closeModal() {
    setErrorMsg("");
    setSuccessMsg("");
    auth.setLoginModalOpen(false);
  }

  //  Redirect after login
  useEffect(() => {
    if (auth.user && auth.redirectPath) {
      navigate(auth.redirectPath, { replace: true });
      auth.setRedirectPath(null);
    }
  }, [auth.user, auth.redirectPath, navigate]);

  return (
    <>
      <div className={`${extraClass}`}>
        <button
          type="button"
          onClick={() => auth.setLoginModalOpen(true)}
          aria-label="Account"
          className={`${extraClass}`}
        >
          {children}
        </button>
      </div>

      <Transition show={auth.loginModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          style={{ zIndex: 99999 }}
          static
          open={auth.loginModalOpen}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray500 opacity-50" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <button
                  type="button"
                  className="absolute right-5 top-2 outline-none focus:outline-none text-2xl"
                  onClick={closeModal}
                >
                  &#10005;
                </button>
                {modalBox}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginForm;
