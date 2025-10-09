// ===== Cart Action Constants =====
//use to reducer this const
export const ADD_ITEM = "ADD_ITEM";
export const ADD_ONE = "ADD_ONE";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const SET_CART = "SET_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_QTY = "UPDATE_QTY";

// ===== Optional: Helper function to create a cart item =====
//this function use to item is add to cart like name id  etc
export const createCartItem = ({
  id,
  name,
  price,
  qty = 1,
  discountPercent,
  description,
  detail,
  categoryId,
  stock,
  createdAt,
  updatedAt,
  category,
  img1,
  img2,
  categoryName,
}) => ({
  id,
  name,
  price,
  qty,
  discountPercent,
  description,
  detail,
  categoryId,
  stock,
  createdAt,
  updatedAt,
  category,
  img1,
  img2,
  categoryName,
});

// ===== Example of a cart structure =====
export const initialCart = {
  cart: [],
  addItem: (item) => {},
  addOne: (item) => {},
  removeItem: (item) => {},
  deleteItem: (item) => {},
  clearCart: () => {},
};
