import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SearchIcon from "../icons/SearchIcon";
import axios from "axios";
import Card from "../Card/Card";
import Loading from "../icons/Loading";
import GhostButton from "../Buttons/GhostButton";
// import SearchForm from "../SearchForm/SearchForm";     // ✅ default import

export default function SearchForm() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [moreThanFour, setMoreThanFour] = useState(false);

  const openModal = () => setOpen(true);

  const closeModal = () => {
    setOpen(false);
    setSearchItems([]);
    setNoResult(false);
    setMoreThanFour(false);
    setSearchValue("");
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setSearchItems([]);
    setNoResult(false);
    setMoreThanFour(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setSearchItems([]);
    setIsFetching(true);
  };

  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_PROD_BACKEND_URL}/api/v1/products/search?q=${searchValue}`
        );
        const fetchedProducts = res.data.data.map((product) => ({
          ...product,
          img1: product.image1,
          img2: product.image2,
        }));

        if (fetchedProducts.length === 0) {
          setNoResult(true);
        }

        const firstFour = fetchedProducts.slice(0, 4);
        setSearchItems(firstFour);
        setMoreThanFour(fetchedProducts.length > 4);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setNoResult(true);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [isFetching, searchValue]);

  return (
    <>
      <button type="button" aria-label="Search" onClick={openModal}>
        <SearchIcon />
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-50"
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-50" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-linear duration-400"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="ease-linear duration-300"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    className="text-2xl focus:outline-none"
                    onClick={closeModal}
                  >
                    &#10005;
                  </button>
                </div>

                <form className="flex items-center mb-4" onSubmit={handleSubmit}>
                  {isFetching ? (
                    <Loading />
                  ) : (
                    <SearchIcon extraClass="text-gray-300 w-8 h-8" />
                  )}
                  <input
                    type="search"
                    placeholder="Search anything..."
                    value={searchValue}
                    onChange={handleChange}
                    className="px-4 py-2 w-full text-2xl focus:outline-none"
                  />
                </form>

                <div className="border-t-2 border-gray-300"></div>

                {noResult ? (
                  <div className="flex justify-center mt-8 text-gray-700">
                    No results found
                  </div>
                ) : (
                  <div className="text-center mt-6">
                    <div
                      className="grid gap-4 justify-center my-8"
                      style={{
                        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 170px))",
                      }}
                    >
                      {searchItems.map((item) => (
                        <Card key={item.id} item={item} />
                      ))}
                    </div>

                    {moreThanFour && (
                      <GhostButton
                        onClick={() =>
                          alert(`Redirect to /search?q=${searchValue}`)
                        }
                      >
                        View All
                      </GhostButton>
                    )}
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
