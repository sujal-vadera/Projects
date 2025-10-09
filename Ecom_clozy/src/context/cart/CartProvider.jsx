// src/context/cart/CartProvider.jsx
import React, { useContext, useEffect, useReducer } from "react";
import cartReducer from "./cartReducer";
import CartContext from "./CartContext";
import {
  ADD_ITEM,
  ADD_ONE,
  REMOVE_ITEM,
  DELETE_ITEM,
  CLEAR_CART,
  SET_CART,
  UPDATE_QTY,
} from "./cart-types";

//  CartProvider
export const CartProvider = ({ children }) => {
  const value = useProvideCart();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//  Custom hook to use cart
export const useCart = () => useContext(CartContext);

// Hook with cart logic
const useProvideCart = () => {
  const initPersistState = { cart: [] };
  const [state, dispatch] = useReducer(cartReducer, initPersistState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const initialCart = localStorage.getItem("cart");
    if (initialCart) {
      try {
        const cartItems = JSON.parse(initialCart);
        dispatch({ type: SET_CART, payload: cartItems });
      } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Cart actions
  const addItem = (item) => {
    dispatch({ type: ADD_ITEM, payload: item });
  };

  const addOne = (item) => {
    dispatch({ type: ADD_ONE, payload: item });
  };

  const removeItem = (item) => {
    dispatch({ type: REMOVE_ITEM, payload: item });
  };

  const deleteItem = (item) => {
    dispatch({ type: DELETE_ITEM, payload: item });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
    localStorage.removeItem("cart"); // clear storage too
  };

 
  const updateQty = (id, newQty) => {
  if (newQty < 1) return; // prevent negative qty
  dispatch({ type: UPDATE_QTY, payload: { id, qty: newQty } });
};


  return {
    cart: state.cart,
    addItem,
    addOne,
    removeItem,
    deleteItem,
    clearCart,
    updateQty,
  };
};
