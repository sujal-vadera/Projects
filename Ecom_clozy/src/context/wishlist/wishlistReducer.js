import {
  addToWishlist,
  deleteWishlistItem,
  setWishlist,
  clearWishlist,
} from "./wishlistTypes";

import addWishlist from "../Util/addWishlist";

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case addToWishlist:
      return {
        ...state,
        wishlist: addWishlist(state.wishlist, action.payload),
      };

    case deleteWishlistItem:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload.id),
      };

    case setWishlist:
      return {
        ...state,
        wishlist: action.payload,
      };

    case clearWishlist:
      return {
        ...state,
        wishlist: [],
      };

    default:
      return state;
  }
};

export default wishlistReducer;
