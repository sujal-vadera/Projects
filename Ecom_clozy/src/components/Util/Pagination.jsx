import NextArrow from "../../icons/NextArrow";
import PrevArrow from "../../icons/PrevArrow";

const Pagination = ({ lastPage, currentPage, orderby }) => {
  let pageNumbers = [];

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  let midPageNumbers = false;
  let startPageNumbers = false;
  let endPageNumbers = false;

  if (currentPage <= 2) {
    pageNumbers = [1, 2, 3];
    startPageNumbers = true;
  } else if (currentPage >= lastPage - 1) {
    pageNumbers = [lastPage - 2, lastPage - 1, lastPage];
    endPageNumbers = true;
  } else {
    pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
    midPageNumbers = true;
  }

  if (lastPage === 3) {
    pageNumbers = [1, 2, 3];
    startPageNumbers = false;
    midPageNumbers = false;
    endPageNumbers = false;
  }

  if (lastPage === 1) {
    pageNumbers = [1];
    startPageNumbers = false;
    midPageNumbers = false;
    endPageNumbers = false;
  }

  const handleNavigate = (num) => {
    alert(`Navigate to page ${num} with orderby=${orderby}`);
  };

  return (
    <div className="w-full">
      <ul className="flex justify-center">
        <li>
          <button
            type="button"
            aria-label="Navigate to Previous Page"
            onClick={() => handleNavigate(currentPage - 1)}
            className={`${
              currentPage === 1
                ? "pointer-events-none cursor-not-allowed text-gray400"
                : "cursor-pointer"
            } focus:outline-none flex justify-center items-center h-10 w-16 px-3 border mx-1 hover:bg-gray500 hover:text-gray100`}
          >
            <PrevArrow />
          </button>
        </li>
        {(midPageNumbers || endPageNumbers) && (
          <li>
            <span className="flex items-end text-3xl">...</span>
          </li>
        )}
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              type="button"
              onClick={() => handleNavigate(num)}
              className={`${
                num === currentPage && "bg-gray500 text-gray100"
              } focus:outline-none cursor-pointer flex justify-center items-center w-10 h-10 border mx-1 hover:bg-gray500 hover:text-gray100`}
            >
              {num}
            </button>
          </li>
        ))}
        {(midPageNumbers || startPageNumbers) && (
          <li>
            <span className="flex items-end text-3xl">...</span>
          </li>
        )}
        <li>
          <button
            type="button"
            aria-label="Navigate to Next Page"
            onClick={() => handleNavigate(currentPage + 1)}
            className={`${
              currentPage >= lastPage
                ? "pointer-events-none cursor-not-allowed text-gray400"
                : "cursor-pointer"
            } focus:outline-none flex justify-center items-center h-10 w-16 px-3 border mx-1 hover:bg-gray500 hover:text-gray100`}
          >
            <NextArrow />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
