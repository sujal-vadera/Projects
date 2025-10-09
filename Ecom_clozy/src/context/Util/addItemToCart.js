// const addItemToCart = (cartItems, item, add_one = false) => {
//   const duplicate = cartItems.some((cartItem) => cartItem.id === item.id);

//   if (duplicate) {
//     return cartItems.map((cartItem) => {
//       let itemQty = 0;
//       !item.qty || add_one
//         ? (itemQty = cartItem.qty + 1)
//         : (itemQty = item.qty);

//       console.log(itemQty);
//       return cartItem.id === item.id ? { ...cartItem, qty: itemQty } : cartItem;
//     });
//   }

//   let itemQty = 0;
//   !item.qty ? itemQty++ : (itemQty = item.qty);
//   return [
//     ...cartItems,
//     {
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       img1: item.img1,
//       img2: item.img2,
//       qty: itemQty,
//     },
//   ];
// };

// export default addItemToCart;


  // Check if item already exists in cart 
const addItemToCart = (cartItems, item, add_one = false) => {
  const duplicate = cartItems.some((cartItem) => cartItem.id === item.id);

  if (duplicate) {
    return cartItems.map((cartItem) => {
      let itemQty = cartItem.qty;

      if (!item.qty || add_one) {
        itemQty += 1; // Add one if add_one or qty not provided
      } else {
        itemQty = item.qty; // Use provided qty
      }

      console.log(`Updated qty for ${cartItem.name}: ${itemQty}`);

      return cartItem.id === item.id ? { ...cartItem, qty: itemQty } : cartItem;
    });
  }

  // New item
  const itemQty = item.qty ? item.qty : 1;
  console.log(`Adding new item ${item.name} with qty: ${itemQty}`);

  return [
    ...cartItems,
    {
      id: item.id,
      name: item.name,
      price: item.price,
      img1: item.img1,
      img2: item.img2,
      qty: itemQty,
    },
  ];
};

export default addItemToCart;

