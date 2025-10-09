import React from "react";
import AppHeader from "../components/Header/AppHeader";

const Custom404 = () => {
  return (
    <>
      <AppHeader title="Page Not Found - CLOZY Fashion" />
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-2xl">Page Not Found</h1>
        <img
          src="/bg-img/404.svg"
          alt="404 Page Not Found"
          width={400}
          height={300}
        />
        <span className="text-gray-400">
          Go back to{" "}
          <a href="/" className="underline font-bold hover:text-gray-500">
            home page
          </a>
          ?
        </span>
      </div>
    </>
  );
};

export default Custom404;
