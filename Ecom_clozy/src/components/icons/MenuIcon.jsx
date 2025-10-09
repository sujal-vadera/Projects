const MenuIcon = ({ size = "md", extraClass = "" }) => {
  const sizeClass = size === "sm" ? "h-6 w-6" : "h-8 w-8";

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
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  );
};

export default MenuIcon;
