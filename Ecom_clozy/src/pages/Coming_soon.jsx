import React from "react";
import AppHeader from "../components/Header/AppHeader";

// Agar translations use karna hai, simple object ya context use karo
const messages = {
  coming_soon: "Coming Soon!",
  page_not_created_msg: "This page has not been created yet.",
  go_back_to: "Go back to",
};

const ComingSoon = () => {
  return (
    <>
      <AppHeader title="Coming Soon!" />

      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-3xl tracking-wider leading-10">
          {messages.coming_soon}
        </h1>
        <h2 className="text-2xl text-gray500 mt-2">
          {messages.page_not_created_msg}
        </h2>
        <img
          src="/bg-img/coding.svg"
          alt="Not created yet"
          width={400}
          height={300}
          className="my-4"
        />
        <span className="text-gray400">
          {messages.go_back_to}{" "}
          <a href="/" className="underline font-bold hover:text-gray500">
            home page
          </a>
          ?
        </span>
      </div>
    </>
  );
};

export default ComingSoon;
