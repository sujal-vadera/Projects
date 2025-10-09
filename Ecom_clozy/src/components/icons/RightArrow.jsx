const RightArrow = ({ size = "md", extraClass = "" }) => {
  const sizeClass = size === "sm" ? "h-5 w-5" : "h-6 w-6";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} ${extraClass}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
};

export default RightArrow;
