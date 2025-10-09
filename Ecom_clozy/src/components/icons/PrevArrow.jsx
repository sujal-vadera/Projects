const PrevArrow = ({ size = "md", extraClass = "" }) => {
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
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>
  );
};

export default PrevArrow;
