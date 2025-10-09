import React from "react";

const LinkButton = ({
  href,
  extraClass,
  size = "normal",
  aria_label,
  children,
  noBorder = true,
  inverted = true,
}) => {
  let btnSize = "";
  if (size === "sm") {
    btnSize = "py-2 sm:py-1 px-5";
  } else if (size === "xl") {
    btnSize = "py-4 sm:py-3 px-7 text-xl";
  } else {
    btnSize = "py-3 sm:py-2 px-6";
  }

  return (
    <a
      href={href}
      role="button"
      aria-label={aria_label}
      className={`bg-white group text-center inline-block cursor-pointer ${
        inverted
          ? "hover:bg-gray500 hover:text-gray100"
          : "hover:text-gray400"
      } ${!noBorder && "border border-gray500"} ${btnSize} ${extraClass}`}
    >
      {children}
    </a>
  );
};

export default LinkButton;
