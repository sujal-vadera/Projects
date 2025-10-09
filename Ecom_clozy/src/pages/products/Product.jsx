// import React, { useEffect, useState } from "react";
// import { Disclosure } from "@headlessui/react";
// import axios from "axios";

// import Heart from "../icons/Heart";
// import DownArrow from "../icons/DownArrow";
// import FacebookLogo from "../icons/FacebookLogo";
// import InstagramLogo from "../icons/InstagramLogo";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import GhostButton from "../../components/Buttons/GhostButton";
// import Button from "../../components/Buttons/Button";
// import Card from "../../components/Card/Card";

// // swiperjs
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Pagination } from "swiper/core";

// // install Swiper modules
// SwiperCore.use([Pagination]);

// const Product = ({ product, products }) => {
//   const img1 = product.img1;
//   const img2 = product.img2;

//   const [size, setSize] = useState("M");
//   const [mainImg, setMainImg] = useState(img1);
//   const [currentQty, setCurrentQty] = useState(1);

//   useEffect(() => {
//     setMainImg(product.img1);
//   }, [product]);

//   const handleSize = (value) => setSize(value);

//   // Placeholder wishlist/cart functions (UI ke liye)
//   const addItem = () => {};
//   const addToWishlist = () => {};
//   const deleteWishlistItem = () => {};
//   const alreadyWishlisted = false;

//   const currentItem = { ...product, qty: currentQty };

//   const handleWishlist = () => {
//     alreadyWishlisted
//       ? deleteWishlistItem(currentItem)
//       : addToWishlist(currentItem);
//   };

//   return (
//     <div>
//       {/* ===== Head Section ===== */}
//       <Header title={`${product.name} - Haru Fashion`} />

//       <main id="main-content">
//         {/* ===== Breadcrumb Section ===== */}
//         <div className="bg-lightgreen h-16 w-full flex items-center border-t-2 border-gray200">
//           <div className="app-x-padding app-max-width w-full">
//             <div className="breadcrumb">
//               <a href="/" className="text-gray400">Home</a> /{" "}
//               <a
//                 href={`/product-category/${product.categoryName}`}
//                 className="text-gray400 capitalize"
//               >
//                 {product.categoryName}
//               </a>{" "}
//               / <span>{product.name}</span>
//             </div>
//           </div>
//         </div>

//         {/* ===== Main Content Section ===== */}
//         <div className="itemSection app-max-width app-x-padding flex flex-col md:flex-row">
//           <div className="imgSection w-full md:w-1/2 h-full flex">
//             <div className="hidden sm:block w-full sm:w-1/4 h-full space-y-4 my-4">
//               <img
//                 className={`cursor-pointer ${mainImg === img1 ? "opacity-100 border border-gray300" : "opacity-50"}`}
//                 onClick={() => setMainImg(img1)}
//                 src={img1}
//                 alt={product.name}
//               />
//               <img
//                 className={`cursor-pointer ${mainImg === img2 ? "opacity-100 border border-gray300" : "opacity-50"}`}
//                 onClick={() => setMainImg(img2)}
//                 src={img2}
//                 alt={product.name}
//               />
//             </div>
//             <div className="w-full sm:w-3/4 h-full m-0 sm:m-4">
//               <Swiper
//                 slidesPerView={1}
//                 spaceBetween={0}
//                 loop={true}
//                 pagination={{ clickable: true }}
//                 className="mySwiper sm:hidden"
//               >
//                 <SwiperSlide><img src={img1} alt={product.name} className="each-slide w-full" /></SwiperSlide>
//                 <SwiperSlide><img src={img2} alt={product.name} className="each-slide w-full" /></SwiperSlide>
//               </Swiper>
//               <div className="hidden sm:block h-full">
//                 <img src={mainImg} alt={product.name} className="w-full" />
//               </div>
//             </div>
//           </div>

//           <div className="infoSection w-full md:w-1/2 h-auto py-8 sm:pl-4 flex flex-col">
//             <h1 className="text-3xl mb-4">{product.name}</h1>
//             <span className="text-2xl text-gray400 mb-2">$ {product.price}</span>
//             <span className="mb-2 text-justify">{product.description}</span>
//             <span className="mb-2">Availability: In Stock</span>
//             <span className="mb-2">Size: {size}</span>

//             <div className="sizeContainer flex space-x-4 text-sm mb-4">
//               {["S", "M", "L"].map((s) => (
//                 <div
//                   key={s}
//                   onClick={() => handleSize(s)}
//                   className={`w-8 h-8 flex items-center justify-center border ${
//                     size === s ? "border-gray500" : "border-gray300 text-gray400"
//                   } cursor-pointer hover:bg-gray500 hover:text-gray100`}
//                 >
//                   {s}
//                 </div>
//               ))}
//             </div>

//             <div className="addToCart flex flex-col sm:flex-row md:flex-col lg:flex-row space-y-4 sm:space-y-0 mb-4">
//               <div className="plusOrMinus h-12 flex border justify-center border-gray300 divide-x-2 divide-gray300 mb-4 mr-0 sm:mr-4 md:mr-0 lg:mr-4">
//                 <div
//                   onClick={() => setCurrentQty((prev) => prev - 1)}
//                   className={`${currentQty === 1 && "pointer-events-none"} h-full w-full sm:w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100`}
//                 >-</div>
//                 <div className="h-full w-28 sm:w-12 flex justify-center items-center pointer-events-none">{currentQty}</div>
//                 <div
//                   onClick={() => setCurrentQty((prev) => prev + 1)}
//                   className="h-full w-full sm:w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100"
//                 >+</div>
//               </div>

//               <div className="flex h-12 space-x-4 w-full">
//                 <Button value="Add to Cart" size="lg" extraClass="flex-grow text-center whitespace-nowrap" onClick={() => addItem(currentItem)} />
//                 <GhostButton onClick={handleWishlist}>
//                   <Heart />
//                 </GhostButton>
//               </div>
//             </div>

//             <Disclosure>
//               {({ open }) => (
//                 <>
//                   <Disclosure.Button className="py-2 focus:outline-none text-left mb-4 border-b-2 border-gray200 flex items-center justify-between">
//                     <span>Details</span>
//                     <DownArrow extraClass={`${open ? "" : "transform rotate-180"} w-5 h-5 text-purple-500`} />
//                   </Disclosure.Button>
//                   <Disclosure.Panel className="text-gray400 animate__animated animate__bounceIn">
//                     {product.detail}
//                   </Disclosure.Panel>
//                 </>
//               )}
//             </Disclosure>

//             <div className="flex items-center space-x-4 mt-4">
//               <span>Share</span>
//               <FacebookLogo extraClass="h-4 cursor-pointer text-gray400 hover:text-gray500" />
//               <InstagramLogo extraClass="h-4 cursor-pointer text-gray400 hover:text-gray500" />
//             </div>
//           </div>
//         </div>

//         {/* Horizontal Divider */}
//         <div className="border-b-2 border-gray200"></div>

//         {/* You May Also Like Section */}
//         <div className="recSection my-8 app-max-width app-x-padding">
//           <h2 className="text-3xl mb-6">You May Also Like</h2>
//           <Swiper
//             slidesPerView={2}
//             spaceBetween={10}
//             loop={true}
//             grabCursor={true}
//             pagination={{ clickable: true, type: "bullets" }}
//             className="mySwiper card-swiper sm:hidden"
//           >
//             {products.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <div className="mb-6">
//                   <Card key={item.id} item={item} />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
//             {products.map((item) => (
//               <Card key={item.id} item={item} />
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Product;




// import React, { useEffect, useState } from "react";
// import { Disclosure } from "@headlessui/react";
// import axios from "axios";


// import Heart from "../icons/Heart";
// import DownArrow from "../icons/DownArrow";
// import FacebookLogo from "../icons/FacebookLogo";
// import InstagramLogo from "../icons/InstagramLogo";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import GhostButton from "../../components/Buttons/GhostButton";
// import Button from "../../components/Buttons/Button";
// import Card from "../../components/Card/Card";

// // swiperjs
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Pagination } from "swiper/core";
// SwiperCore.use([Pagination]);

// const Product = ({ productId }) => {
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [size, setSize] = useState("M");
//   const [mainImg, setMainImg] = useState("");
//   const [currentQty, setCurrentQty] = useState(1);

//   // Fetch single product
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
//         setProduct(res.data);
//         setMainImg(res.data.image);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   // Fetch other products for "You May Also Like"
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("https://fakestoreapi.com/products");
//         setRelatedProducts(res.data.filter(p => p.id !== productId).slice(0, 10));
//       } catch (error) {
//         console.error("Error fetching related products:", error);
//       }
//     };
//     fetchProducts();
//   }, [productId]);

//   if (!product) return <div>Loading...</div>;

//   const handleSize = (value) => setSize(value);
//   const addItem = () => {};
//   const addToWishlist = () => {};
//   const deleteWishlistItem = () => {};
//   const alreadyWishlisted = false;
//   const currentItem = { ...product, qty: currentQty };
//   const handleWishlist = () => {
//     alreadyWishlisted
//       ? deleteWishlistItem(currentItem)
//       : addToWishlist(currentItem);
//   };

//   return (
//     <div>
//       <Header title={`${product.title} - Haru Fashion`} />

//       <main id="main-content">
//         {/* Breadcrumb */}
//         <div className="bg-lightgreen h-16 w-full flex items-center border-t-2 border-gray200">
//           <div className="app-x-padding app-max-width w-full">
//             <div className="breadcrumb">
//               <a href="/" className="text-gray400">Home</a> /{" "}
//               <a href={`/product-category/all`} className="text-gray400 capitalize">All Products</a> /{" "}
//               <span>{product.title}</span>
//             </div>
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="itemSection app-max-width app-x-padding flex flex-col md:flex-row">
//           <div className="imgSection w-full md:w-1/2 h-full flex">
//             <div className="w-full h-full">
//               <img src={mainImg} alt={product.title} className="w-full" />
//             </div>
//           </div>

//           <div className="infoSection w-full md:w-1/2 h-auto py-8 sm:pl-4 flex flex-col">
//             <h1 className="text-3xl mb-4">{product.title}</h1>
//             <span className="text-2xl text-gray400 mb-2">$ {product.price}</span>
//             <span className="mb-2 text-justify">{product.description}</span>
//             <span className="mb-2">Availability: In Stock</span>
//             <span className="mb-2">Size: {size}</span>

//             <div className="sizeContainer flex space-x-4 text-sm mb-4">
//               {["S", "M", "L"].map((s) => (
//                 <div
//                   key={s}
//                   onClick={() => handleSize(s)}
//                   className={`w-8 h-8 flex items-center justify-center border ${
//                     size === s ? "border-gray500" : "border-gray300 text-gray400"
//                   } cursor-pointer hover:bg-gray500 hover:text-gray100`}
//                 >
//                   {s}
//                 </div>
//               ))}
//             </div>

//             <div className="addToCart flex flex-col sm:flex-row md:flex-col lg:flex-row space-y-4 sm:space-y-0 mb-4">
//               <div className="plusOrMinus h-12 flex border justify-center border-gray300 divide-x-2 divide-gray300 mb-4 mr-0 sm:mr-4 md:mr-0 lg:mr-4">
//                 <div onClick={() => setCurrentQty(prev => Math.max(prev - 1, 1))} className="h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100">-</div>
//                 <div className="h-full w-12 flex justify-center items-center pointer-events-none">{currentQty}</div>
//                 <div onClick={() => setCurrentQty(prev => prev + 1)} className="h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100">+</div>
//               </div>

//               <div className="flex h-12 space-x-4 w-full">
//                 <Button value="Add to Cart" size="lg" extraClass="flex-grow text-center whitespace-nowrap" onClick={() => addItem(currentItem)} />
//                 <GhostButton onClick={handleWishlist}><Heart /></GhostButton>
//               </div>
//             </div>

//             <Disclosure>
//               {({ open }) => (
//                 <>
//                   <Disclosure.Button className="py-2 focus:outline-none text-left mb-4 border-b-2 border-gray200 flex items-center justify-between">
//                     <span>Details</span>
//                     <DownArrow extraClass={`${open ? "" : "transform rotate-180"} w-5 h-5 text-purple-500`} />
//                   </Disclosure.Button>
//                   <Disclosure.Panel className="text-gray400 animate__animated animate__bounceIn">
//                     {product.description}
//                   </Disclosure.Panel>
//                 </>
//               )}
//             </Disclosure>

//             <div className="flex items-center space-x-4 mt-4">
//               <span>Share</span>
//               <FacebookLogo extraClass="h-4 cursor-pointer text-gray400 hover:text-gray500" />
//               <InstagramLogo extraClass="h-4 cursor-pointer text-gray400 hover:text-gray500" />
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-b-2 border-gray200 my-8"></div>

//         {/* You May Also Like */}
//         <div className="recSection my-8 app-max-width app-x-padding">
//           <h2 className="text-3xl mb-6">You May Also Like</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//             {relatedProducts.map(item => (
//               <Card key={item.id} item={item} />
//             ))}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Product;

import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";

import Heart from "../icons/Heart";
import DownArrow from "../icons/DownArrow";
import FacebookLogo from "../icons/FacebookLogo";
import InstagramLogo from "../icons/InstagramLogo";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GhostButton from "../../components/Buttons/GhostButton";
import Button from "../../components/Buttons/Button";
import Card from "../../components/Card/Card";

import { useCart } from "../../context/cart/CartProvider";
import Items from "../../data/Items";

const Product = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [size, setSize] = useState("M");
  const [currentQty, setCurrentQty] = useState(1);

  const { addItem } = useCart();

  useEffect(() => {
    const item = Items.find((i) => i.id === Number(productId));
    setProduct(item);
    setRelatedProducts(Items.filter((i) => i.id !== Number(productId)).slice(0, 10));
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  const currentItem = { ...product, qty: currentQty, size };

  return (
    <div>
      <Header title={`${product.name} - CLOZY Fashion`} />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="bg-lightgreen h-16 flex items-center border-t-2 border-gray200">
          <div className="app-x-padding app-max-width">
            <a href="/" className="text-gray400">Home</a> /{" "}
            <a href={`/product-category/all`} className="text-gray400 capitalize">Products</a> /{" "}
            <span>{product.name}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="app-max-width app-x-padding flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img src={product.img1} alt={product.name} className="w-full" />
          </div>

          <div className="w-full md:w-1/2 py-8 sm:pl-4 flex flex-col">
            <h1 className="text-3xl mb-4">{product.name}</h1>
            <span className="text-2xl text-gray400 mb-2">$ {product.price}</span>
            <span className="mb-2">Availability: In Stock</span>
            <span className="mb-2">Size: {size}</span>

            <div className="flex space-x-4 mb-4">
              {["S", "M", "L"].map((s) => (
                <div
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-8 h-8 flex items-center justify-center border ${
                    size === s ? "border-gray500" : "border-gray300 text-gray400"
                  } cursor-pointer`}
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="flex border">
                <div onClick={() => setCurrentQty((q) => Math.max(q - 1, 1))} className="px-4">-</div>
                <div className="px-4">{currentQty}</div>
                <div onClick={() => setCurrentQty((q) => q + 1)} className="px-4">+</div>
              </div>
              <Button value="Add to Cart" onClick={() => addItem(currentItem)} />
              <GhostButton><Heart /></GhostButton>
            </div>

            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="border-b-2">
                    <span>Details</span>
                    <DownArrow />
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray400">
                    No extra details available.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <div className="flex items-center space-x-4 mt-4">
              <span>Share</span>
              <FacebookLogo />
              <InstagramLogo />
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="app-max-width app-x-padding mt-8">
          <h2 className="text-3xl mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {relatedProducts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;