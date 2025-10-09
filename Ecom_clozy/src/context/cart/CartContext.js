import { createContext } from "react";

// Initial cart context value
export const initialContextValues = {
  cart: [],
};

// Create the context
const CartContext = createContext(initialContextValues);

export default CartContext;
