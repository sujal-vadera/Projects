import React from "react";

const LeftArrow = ({ size = "md", extraClass = "" }) => {
  // Size mapping to Tailwind classes
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <svg
      className={`${sizeClasses[size] || sizeClasses.md} ${extraClass}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
};

export default LeftArrow;
