import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../Buttons/Button";
import Input from "../Input/Input";

const ForgotPassword = ({ onLogin, errorMsg, setErrorMsg, setSuccessMsg }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSuccessMsg("Password reset link sent!");
    } else {
      setErrorMsg("Please enter a valid email.");
    }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-3xl text-center my-8 font-medium leading-10 text-gray-900"
      >
        Forgot Password
      </Dialog.Title>
      <form onSubmit={handleSubmit} className="mt-2">
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
        {errorMsg !== "" && (
          <div className="text-red text-sm mb-4 whitespace-nowrap">
            {errorMsg}
          </div>
        )}
        <Button
          type="submit"
          value="Submit"
          extraClass="w-full text-center text-xl mb-4"
          size="lg"
        />
        <div className="text-center text-gray400">
          Go back to{" "}
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

export default ForgotPassword;
