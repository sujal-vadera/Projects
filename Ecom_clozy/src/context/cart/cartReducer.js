// src/context/cart/cartReducer.js
import addItemToCart from "../Util/addItemToCart";
import removeItemFromCart from "../Util/removeItemFromCart";
import {
  ADD_ITEM,
  ADD_ONE,
  REMOVE_ITEM,
  DELETE_ITEM,
  CLEAR_CART,
  SET_CART,
  UPDATE_QTY, // import new action type
} from "./cart-types";

// ===== Cart Reducer =====
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      // Add new product or increase qty
      return {
        ...state,
        cart: addItemToCart(state.cart, action.payload),
      };

    case ADD_ONE:
      // Increase qty of existing product
      return {
        ...state,
        cart: addItemToCart(state.cart, action.payload, true),
      };

    case REMOVE_ITEM:
      // Decrease qty or remove if qty=1
      return {
        ...state,
        cart: removeItemFromCart(state.cart, action.payload),
      };

    case DELETE_ITEM:
      // Remove product completely
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

    case SET_CART:
      // Set cart (e.g., from localStorage)
      return {
        ...state,
        cart: action.payload,
      };

    case CLEAR_CART:
      // Empty cart
      return {
        ...state,
        cart: [],
      };

    case UPDATE_QTY: // New case to update quantity directly
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
