// import React, { useState } from "react";
// import { Dialog } from "@headlessui/react";
// import Button from "../Buttons/Button";
// import Input from "../Input/Input";

// const Register = ({ onLogin, errorMsg, setErrorMsg, setSuccessMsg }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [address, setAddress] = useState("");
//   // const [phone, setPhone] = useState("");

//   const handleSubmit = (e) => {
//     console/log("click")
//     e.preventDefault();
//     if (name && email && password) {
//       setSuccessMsg("Register successful!");
//     } else {
//       setErrorMsg("Error occurred while registering.");
//     }
//   };

//   return (
//     <>
//       <Dialog.Title
//         as="h3"
//         className="text-4xl text-center my-8 font-medium leading-6 text-gray-900"
//       >
//         Register
//       </Dialog.Title>
//       <form onSubmit={handleSubmit} className="mt-2">
//         <Input
//           type="text"
//           placeholder="Name *"
//           name="name"
//           required
//           extraClass="w-full focus:border-gray500"
//           border="border-2 border-gray300 mb-4"
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//         />
//         <Input
//           type="email"
//           placeholder="Email Address *"
//           name="email"
//           required
//           extraClass="w-full focus:border-gray500"
//           border="border-2 border-gray300 mb-4"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//         />
//         <Input
//           type="password"
//           placeholder="Password *"
//           name="password"
//           required
//           extraClass="w-full focus:border-gray500 mb-4"
//           border="border-2 border-gray300"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//         />
//         {/* <Input
//           type="text"
//           placeholder="Shipping Address"
//           name="shipping_address"
//           extraClass="w-full focus:border-gray500"
//           border="border-2 border-gray300 mb-4"
//           onChange={(e) => setAddress(e.target.value)}
//           value={address}
//         />
//         <Input
//           type="text"
//           placeholder="Phone"
//           name="phone"
//           extraClass="w-full focus:border-gray500"
//           border="border-2 border-gray300 mb-4"
//           onChange={(e) => setPhone(e.target.value)}
//           value={phone}
//         /> */}
//         {errorMsg !== "" && (
//           <div className="text-red text-sm mb-2 whitespace-nowrap">
//             {errorMsg}
//           </div>
//         )}
//         <div className="flex justify-between mb-4">
//           <p className="text-gray400 text-xs">
//             Please fill in the details to register your account.
//           </p>
//         </div>
//         <Button
//           type="submit"
//           value="Register"
//           extraClass="w-full text-center text-xl mb-4"
//           size="lg"
//         />
//         <div className="text-center text-gray400">
//           Already a member?{" "}
//           <span
//             onClick={onLogin}
//             className="text-gray500 focus:outline-none focus:underline cursor-pointer"
//           >
//             Login
//           </span>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import { useAuth } from "../../context/AuthContext";

const Register = ({ onLogin, errorMsg, setErrorMsg, setSuccessMsg }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await register(email, password, name); // ✅ order fixed
    if (res.success) {
      setSuccessMsg(res.message);
      setErrorMsg("");
      // setName("");
      // setEmail("");
      // setPassword("");

      if (onLogin) onLogin();
    } else {
      setErrorMsg(res.message || "Error occurred while registering.");
      setSuccessMsg("");
    }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-4xl text-center my-8 font-medium leading-6 text-gray-900"
      >
        Register
      </Dialog.Title>

      <form onSubmit={handleSubmit} className="mt-2">
        <Input
          type="text"
          placeholder="Name *"
          name="name"
          required
          extraClass="w-full focus:border-gray500"
          border="border-2 border-gray300 mb-4"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <Input
          type="email"
          placeholder="Email Address *"
          name="email"
          required
          extraClass="w-full focus:border-gray500"
          border="border-2 border-gray300 mb-4"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Input
          type="password"
          placeholder="Password *"
          name="password"
          required
          extraClass="w-full focus:border-gray500 mb-4"
          border="border-2 border-gray300"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {errorMsg && (
          <div className="text-red text-sm mb-2 whitespace-nowrap">
            {/* {errorMsg} */}
            {"No Internet Connection"}
          </div>
        )}

        <Button
          type="submit"
          value="Register"
          extraClass="w-full text-center text-xl mb-4"
          size="lg"
        />

        <div className="text-center text-gray400">
          Already a member?{" "}
          <span
            onClick={onLogin}
            className="text-gray500 focus:outline-none focus:underline cursor-pointer"
          >
            Login
          </span>
        </div>
      </form>
    </>
  );
};

export default Register;
