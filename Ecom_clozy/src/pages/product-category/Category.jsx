// import React from "react";
// import axios from "axios";
// import { Menu } from "@headlessui/react";

// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import Card from "../../components/Card/Card";
// import Pagination from "../../components/Util/Pagination";
// import DownArrow from "../../public/icons/DownArrow";

// // Props type definition ko hata diya kyunki plain JS me TypeScript nahi chahiye
// // OrderType bhi direct string use karenge

// const ProductCategory = ({ items, page, numberOfProducts, orderby, category }) => {
//   const lastPage = Math.ceil(numberOfProducts / 10);

//   const capitalizedCategory =
//     category.charAt(0).toUpperCase() + category.slice(1);

//   const firstIndex = page === 1 ? page : page * 10 - 9;
//   const lastIndex = page * 10;

//   return (
//     <div>
//       {/* ===== Head Section ===== */}
//       <Header title={`${capitalizedCategory} - Haru Fashion`} />

//       <main id="main-content">
//         {/* ===== Breadcrumb Section ===== */}
//         <div className="bg-lightgreen h-16 w-full flex items-center">
//           <div className="app-x-padding app-max-width w-full">
//             <div className="breadcrumb">
//               <a href="/" className="text-gray400">
//                 Home
//               </a>{" "}
//               / <span className="capitalize">{category}</span>
//             </div>
//           </div>
//         </div>

//         {/* ===== Heading & Filter Section ===== */}
//         <div className="app-x-padding app-max-width w-full mt-8">
//           <h3 className="text-4xl mb-2 capitalize">{category}</h3>
//           <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-0 justify-between mt-4 sm:mt-6">
//             <span>
//               Showing {firstIndex} -{" "}
//               {numberOfProducts < lastIndex ? numberOfProducts : lastIndex} of{" "}
//               {numberOfProducts}
//             </span>
//             {category !== "new-arrivals" && <SortMenu orderby={orderby} category={category} />}
//           </div>
//         </div>

//         {/* ===== Main Content Section ===== */}
//         <div className="app-x-padding app-max-width mt-3 mb-14">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
//             {items.map((item) => (
//               <Card key={item.id} item={item} />
//             ))}
//           </div>
//           {category !== "new-arrivals" && (
//             <Pagination currentPage={page} lastPage={lastPage} orderby={orderby} />
//           )}
//         </div>
//       </main>

//       {/* ===== Footer Section ===== */}
//       <Footer />
//     </div>
//   );
// };

// const SortMenu = ({ orderby, category }) => {
//   let currentOrder;
//   if (orderby === "price") {
//     currentOrder = "sort_by_price";
//   } else if (orderby === "price-desc") {
//     currentOrder = "sort_by_price_desc";
//   } else {
//     currentOrder = "sort_by_latest";
//   }

//   return (
//     <Menu as="div" className="relative">
//       <Menu.Button as="a" href="#" className="flex items-center capitalize">
//         {currentOrder.replaceAll("_", " ")} <DownArrow />
//       </Menu.Button>
//       <Menu.Items className="flex flex-col z-10 items-start text-xs sm:text-sm w-auto sm:right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none">
//         <Menu.Item>
//           {({ active }) => (
//             <button
//               type="button"
//               onClick={() => window.location.href = `/product-category/${category}?orderby=latest`}
//               className={`${
//                 active ? "bg-gray100 text-gray500" : "bg-white"
//               } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
//                 currentOrder === "sort_by_latest" && "bg-gray500 text-gray100"
//               }`}
//             >
//               sort by latest
//             </button>
//           )}
//         </Menu.Item>
//         <Menu.Item>
//           {({ active }) => (
//             <button
//               type="button"
//               onClick={() => window.location.href = `/product-category/${category}?orderby=price`}
//               className={`${
//                 active ? "bg-gray100 text-gray500" : "bg-white"
//               } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
//                 currentOrder === "sort_by_price" && "bg-gray500 text-gray100"
//               }`}
//             >
//               sort by price
//             </button>
//           )}
//         </Menu.Item>
//         <Menu.Item>
//           {({ active }) => (
//             <button
//               type="button"
//               onClick={() => window.location.href = `/product-category/${category}?orderby=price-desc`}
//               className={`${
//                 active ? "bg-gray100 text-gray500" : "bg-white"
//               } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
//                 currentOrder === "sort_by_price_desc" && "bg-gray500 text-gray100"
//               }`}
//             >
//               sort by price desc
//             </button>
//           )}
//         </Menu.Item>
//       </Menu.Items>
//     </Menu>
//   );
// };

// export default ProductCategory;


import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Util/Pagination";
import DownArrow from "../../public/icons/DownArrow";

// ✅ Import static items
import Items from "../../data/Items";

const ProductCategory = ({ category }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [orderby, setOrderby] = useState("latest");
  const itemsPerPage = 10;

  useEffect(() => {
    let products = [...Items];

    if (category && category !== "all") {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (orderby === "price") products.sort((a, b) => a.price - b.price);
    if (orderby === "price-desc") products.sort((a, b) => b.price - a.price);

    setItems(products);
  }, [category, orderby]);

  const numberOfProducts = items.length;
  const lastPage = Math.ceil(numberOfProducts / itemsPerPage);

  return (
    <div>
      <Header title={`${category} - CLOZY Fashion`} />

      <main className="app-x-padding app-max-width">
        {/* Breadcrumb */}
        <div className="bg-lightgreen h-16 flex items-center mb-4">
          <div className="breadcrumb">
            <a href="/" className="text-gray400">Home</a> /{" "}
            <span className="capitalize">{category}</span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex justify-between mb-6">
          <h3 className="text-4xl capitalize">{category}</h3>
          <SortMenu orderby={orderby} setOrderby={setOrderby} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
          {items.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={page} lastPage={lastPage} onPageChange={setPage} />
      </main>

      <Footer />
    </div>
  );
};

const SortMenu = ({ orderby, setOrderby }) => (
  <Menu as="div" className="relative inline-block">
    <Menu.Button className="flex items-center capitalize">
      {orderby} <DownArrow />
    </Menu.Button>
    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray200 flex flex-col p-1 z-10">
      {["latest", "price", "price-desc"].map((order) => (
        <Menu.Item key={order}>
          {({ active }) => (
            <button
              className={`${active ? "bg-gray100" : ""} px-4 py-2 text-left`}
              onClick={() => setOrderby(order)}
            >
              sort by {order}
            </button>
          )}
        </Menu.Item>
      ))}
    </Menu.Items>
  </Menu>
);

export default ProductCategory;

