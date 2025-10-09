const DownArrow = ({ extraClass = "", size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`mx-1 ${extraClass}`}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default DownArrow;
