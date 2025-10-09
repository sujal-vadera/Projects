

// src/App.jsx
import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { CartProvider } from "./context/cart/CartProvider";
import { WishlistProvider } from "./context/wishlist/WishlistProvider";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import Wishlist from "./pages/Wishlist";
import Error404 from "./pages/Error404";
import Login from "./components/Auth/Login";
import { useAuth } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomeWrapper />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/redirect" element={<Navigate to="/" replace />} />

            {/* Shop */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Catch-all */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

// ✅ Use a wrapper to get auth inside provider
const HomeWrapper = () => {
  const { user } = useAuth();
  return <Home key={user ? "auth" : "guest"} />;
};

export default App;
