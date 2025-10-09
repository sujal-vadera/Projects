import { useContext, useEffect, useReducer, createContext } from "react";
import Cookies from "js-cookie";

// // ✅ Action types
// export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
// export const DELETE_WISHLIST_ITEM = "DELETE_WISHLIST_ITEM";
// export const SET_WISHLIST = "SET_WISHLIST";
// export const CLEAR_WISHLIST = "CLEAR_WISHLIST";
import {
  addToWishlist,
  deleteWishlistItem,
  setWishlist,
  clearWishlist,
} from "./wishlistTypes";


// ✅ Initial state
const initialState = {
  wishlist: [],
};

// ✅ Reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case addToWishlist:
      if (state.wishlist.some((i) => i.id === action.payload.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case deleteWishlistItem:
      return {
        ...state,
        wishlist: state.wishlist.filter((i) => i.id !== action.payload.id),
      };
    case setWishlist:
      return { ...state, wishlist: action.payload };
    case clearWishlist:
      return { ...state, wishlist: [] };
    default:
      return state;
  }
};

// ✅ Context
const WishlistContext = createContext(initialState);

// ✅ Provider
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from cookies
  useEffect(() => {
    const data = Cookies.get("wishlist");
    if (data) {
      dispatch({ type: setWishlist, payload: JSON.parse(data) });
    }
  }, []);

  // Save wishlist to cookies whenever it changes
  useEffect(() => {
    Cookies.set("wishlist", JSON.stringify(state.wishlist), { expires: 7 });
  }, [state.wishlist]);

  // Action functions
  const addItem = (item) => dispatch({ type: addToWishlist, payload: item });
  const removeItem = (item) =>
    dispatch({ type:  deleteWishlistItem, payload: { id: item.id } });

  const clearAll = () => dispatch({ type: clearWishlist });

  return (
    <WishlistContext.Provider
      value={{ wishlist: state.wishlist, addItem, removeItem, clearAll }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom hook
export const useWishlist = () => useContext(WishlistContext);

export default WishlistContext;
