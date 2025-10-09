import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SearchIcon from "../icons/SearchIcon";
import axios from "axios";
import Card from "../Card/Card";
import Loading from "../icons/Loading";
import GhostButton from "../Buttons/GhostButton";

export default function SearchForm() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [moreThanFour, setMoreThanFour] = useState(false);

  function closeModal() {
    setOpen(false);
    setSearchItems([]);
    setNoResult(false);
    setMoreThanFour(false);
  }

  function openModal() {
    setOpen(true);
  }

  useEffect(() => {
    if (!isFetching) return;
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_PROD_BACKEND_URL}/api/v1/products/search?q=${searchValue}`
      );
      const fetchedProducts = res.data.data.map((product) => ({
        ...product,
        img1: product.image1,
        img2: product.image2,
      }));
      if (fetchedProducts.length < 1) setNoResult(true);
      fetchedProducts.forEach((product, index) => {
        if (index < 4) {
          setSearchItems((prev) => [...prev, product]);
        } else {
          setMoreThanFour(true);
        }
      });
      setIsFetching(false);
    };
    fetchData();
  }, [isFetching, searchValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchItems([]);
    setIsFetching(true);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setSearchItems([]);
    setNoResult(false);
    setMoreThanFour(false);
  };

  return (
    <>
      <div>
        <button type="button" aria-label="Search" onClick={openModal}>
          <SearchIcon />
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          style={{ zIndex: 99999 }}
          static
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
              <Dialog.Overlay className="fixed inset-0 bg-gray500 opacity-50" />
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
              <div className="relative translate-y inline-block w-full pt-6 pb-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <div className="app-max-width app-x-padding">
                  <div className="w-3/5 m-auto">
                    <div className="flex justify-end mb-8">
                      <button
                        type="button"
                        className="outline-none focus:outline-none text-2xl"
                        onClick={closeModal}
                      >
                        &#10005;
                      </button>
                    </div>
                    <form className="mt-2 flex items-center" onSubmit={handleSubmit}>
                      {isFetching ? (
                        <Loading />
                      ) : (
                        <SearchIcon extraClass="text-gray300 w-8 h-8" />
                      )}
                      <input
                        type="search"
                        placeholder="Search anything..."
                        className="px-4 py-2 w-full focus:outline-none text-2xl"
                        onChange={handleChange}
                      />
                    </form>
                    <div className="border-t-2 border-gray300"></div>
                  </div>
                  {noResult ? (
                    <div className="flex justify-center mt-8">
                      <span>No results found</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div
                        className="grid gap-x-4 justify-center my-8"
                        style={{
                          gridTemplateColumns:
                            "repeat( auto-fit, minmax(120px, 170px) )",
                        }}
                      >
                        {searchItems.map((item) => (
                          <Card key={item.id} item={item} />
                        ))}
                      </div>
                      {moreThanFour && (
                        // <GhostButton
                        //   onClick={() =>
                        //     alert(`Redirect to /search?q=${searchValue}`)
                        //   }
                        // >
                        //   View All
                        // </GhostButton>
                        <GhostButton
                          onClick={() => {
                            closeModal();
                            navigate(`/search?q=${searchValue}`);
                          }}
                        >
                          View All
                        </GhostButton>

                      )}
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
