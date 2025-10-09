import React, { useState } from "react";
import Heart from "../icons/Heart";
import HeartSolid from "../icons/HeartSolid";
import styles from "./Card.module.css";
import { useWishlist } from "../../context/wishlist/WishlistProvider";

// 🔥 Import Cart Context
import { useCart } from "../../context/cart/CartProvider";

const Card = ({ item }) => {
  const { id, name, price, img1, img2 } = item;

  const [isHovered, setIsHovered] = useState(false);
  const [isWLHovered, setIsWLHovered] = useState(false);

  // ✅ Global Cart Context
  const { addItem } = useCart();

  const itemLink = `/products/${encodeURIComponent(id)}`;
  const { wishlist, addItem: addWishlist, removeItem } = useWishlist();
const isInWishlist = wishlist.some((wItem) => wItem.id === id);
 

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <a
          href={itemLink}
          tabIndex={-1}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered && <img src={img1} alt={name} width={230} height={300} />}
          {isHovered && (
            <img
              className="transition-transform transform hover:scale-110 duration-1000"
              src={img2}
              alt={name}
              width={230}
              height={300}
            />
          )}
        </a>

        {/* ❤️ Wishlist button */}
        <button
          type="button"
          className="absolute top-2 right-2 p-1 rounded-full"
          aria-label="Wishlist"
          onClick={() => (isInWishlist ? removeItem(item) : addWishlist(item))}
          onMouseOver={() => setIsWLHovered(true)}
          onMouseLeave={() => setIsWLHovered(false)}
        >
          {isWLHovered || isInWishlist ? <HeartSolid /> : <Heart />}
        </button>

        {/* 🛒 Add to Cart button */}
        <button
          type="button"
          onClick={() => addItem(item)} // ✅ use global addItem
          className={styles.addBtn}
        >
          Add to Cart
        </button>
      </div>

      <div className="content">
        <a href={itemLink} className={styles.itemName}>
          {name}
        </a>
        <div className="text-gray400">$ {price}</div>

        {/* Mobile view button */}
        <button
          type="button"
          onClick={() => addItem(item)} // ✅ same here
          className="uppercase font-bold text-sm sm:hidden"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
