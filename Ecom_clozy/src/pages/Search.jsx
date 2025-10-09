// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
// import Card from "../components/Card/Card";

// // Simple translations object for React
// const messages = {
//   home: "Home",
//   search_results: "Search Results",
//   showing_results: (products) => `Showing ${products} results`,
//   no_result: "No results found",
// };

// const Search = () => {
//   const [searchWord, setSearchWord] = useState(initialSearchWord);
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch products based on search query
//   useEffect(() => {
//     if (!searchWord) return;

//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `/api/v1/products/search?q=${searchWord}`
//         );
//         const fetchedProducts = res.data.data.map((product) => ({
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           img1: product.image1,
//           img2: product.image2,
//         }));
//         setItems(fetchedProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [searchWord]);

//   return (
//     <div>
//       <Header title="CLOZY Fashion" />

//       <main id="main-content">
//         {/* Breadcrumb */}
//         <div className="bg-lightgreen h-16 w-full flex items-center">
//           <div className="app-x-padding app-max-width w-full">
//             <div className="breadcrumb">
//               <a href="/" className="text-gray400">{messages.home}</a> /{" "}
//               <span>{messages.search_results}</span>
//             </div>
//           </div>
//         </div>

//         {/* Heading */}
//         <div className="app-x-padding app-max-width w-full mt-8">
//           <h1 className="text-3xl mb-2">
//             {messages.search_results}: &quot;{searchWord}&quot;
//           </h1>
//           {items.length > 0 && (
//             <div className="flex justify-between mt-6">
//               <span>{messages.showing_results(items.length)}</span>
//             </div>
//           )}
//         </div>

//         {/* Products */}
//         <div className="app-x-padding app-max-width mt-3 mb-14">
//           {loading ? (
//             <div className="flex justify-center items-center h-72">
//               Loading...
//             </div>
//           ) : items.length < 1 ? (
//             <div className="flex justify-center items-center h-72">
//               {messages.no_result}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
//               {items.map((item) => (
//                 <Card key={item.id} item={item} />
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Search;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Card from "../components/Card/Card";

const messages = {
  home: "Home",
  search_results: "Search Results",
  showing_results: (products) => `Showing ${products} results`,
  no_result: "No results found",
};

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchWord = params.get("q") || "";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchWord) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_PROD_BACKEND_URL}/api/v1/products/search?q=${searchWord}`
        );
        const fetchedProducts = res.data.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          img1: product.image1,
          img2: product.image2,
        }));
        setItems(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchWord]);

  return (
    <div>
      <Header title="CLOZY Fashion" />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="bg-lightgreen h-16 w-full flex items-center">
          <div className="app-x-padding app-max-width w-full">
            <div className="breadcrumb">
              <a href="/" className="text-gray400">{messages.home}</a> /{" "}
              <span>{messages.search_results}</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="app-x-padding app-max-width w-full mt-8">
          <h1 className="text-3xl mb-2">
            {messages.search_results}: &quot;{searchWord}&quot;
          </h1>
          {items.length > 0 && (
            <div className="flex justify-between mt-6">
              <span>{messages.showing_results(items.length)}</span>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="app-x-padding app-max-width mt-3 mb-14">
          {loading ? (
            <div className="flex justify-center items-center h-72">
              Loading...
            </div>
          ) : items.length < 1 ? (
            <div className="flex justify-center items-center h-72">
              {messages.no_result}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
              {items.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

