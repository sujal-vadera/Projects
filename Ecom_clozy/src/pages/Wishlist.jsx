import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlist/WishlistProvider";

// Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import GhostButton from "../components/Buttons/GhostButton";
import LeftArrow from "../components/icons/LeftArrow";
import { useCart } from "../context/cart/CartProvider";

const messages = {
  wishlist: "Wishlist",
  continue_shopping: "Continue Shopping",
  product_image: "Image",
  product_name: "Product",
  unit_price: "Price",
  add_to_cart: "Add to Cart",
  remove: "Remove",
  wishlist_is_empty: "Your wishlist is empty",
  clear_wishlist: "Clear Wishlist",
};

const Wishlist = () => {
 const {wishlist , removeItem, clearAll} = useWishlist();
  // const [cart, setCart] = useState([]);
  // ye niche globel state se ham add to cart me product add kar shkte he 
  const {addItem} = useCart()

  const subtotal = wishlist.reduce((acc,item)=> acc + item.price * (item.qty || 1),0)

  return (
    <div>
      <Header title={messages.wishlist} />

      <main id="main-content">
        <div className="container mx-auto px-4 py-8">
          {/* Title + Continue Shopping */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-3xl font-semibold">{messages.wishlist}</h1>
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:underline mt-2 sm:mt-0"
            >
              <LeftArrow className="mr-2" /> {messages.continue_shopping}
            </Link>
          </div>

          {/* Wishlist Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">{messages.product_image}</th>
                  <th className="p-3 text-left">{messages.product_name}</th>
                  <th className="p-3 text-center">{messages.unit_price}</th>
                  <th className="p-3 text-center">{messages.add_to_cart}</th>
                  <th className="p-3 text-center">{messages.remove}</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                      {messages.wishlist_is_empty}
                    </td>
                  </tr>
                ) : (
                  wishlist.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3 text-center">
                        <img
                          src={item.img1}
                          alt={item.name}
                          className="w-20 h-28 object-cover mx-auto"
                        />
                      </td>
                      <td className="p-3 text-left font-medium">
                        {item.name}
                      </td>
                      <td className="p-3 text-center">${item.price}</td>
                      <td className="p-3 text-center">
                        <Button
                          // onClick={() => addToCart(item)}
                          onClick={() => addItem(item)}
                          extraClass="px-4 py-2"
                        >
                          {messages.add_to_cart}
                        </Button>
                      </td>
                      <td className="p-3 text-center">
                        <Button
                          onClick={() => removeItem(item)}
                          extraClass="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
                        >
                          &times;
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Section */}
          {wishlist.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-medium">
                Subtotal:{" "}
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </p>
              <GhostButton onClick={clearAll} extraClass="mt-4 sm:mt-0">
                {messages.clear_wishlist}
              </GhostButton>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
