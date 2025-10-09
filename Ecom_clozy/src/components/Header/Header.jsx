import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import TopNav from "./TopNav";
import WhistlistIcon from "../icons/WhistlistIcon";
import UserIcon from "../icons/UserIcon";
import AuthForm from "../Auth/AuthForm";
import SearchForm from "../SearchForm/SearchForm";
import CartItem from "../CartItem/CartItem";
import Menu from "../Menu/Menu";
import AppHeader from "./AppHeader";
import { useWishlist } from "../../context/wishlist/WishlistProvider";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import styles from "./Header.module.css";

const Header = ({ title }) => {
  const { wishlist } = useWishlist();
  const [animate, setAnimate] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const { user, logout } = useAuth();

  let noOfWishlist = wishlist.length;

  const handleAnimate = useCallback(() => {
    if (noOfWishlist === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [noOfWishlist]);

  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    setDidMount(true);
    window.addEventListener("scroll", handleScroll);
    return () => setDidMount(false);
  }, [handleScroll]);

  if (!didMount) return null;

  return (
    <>
      <AppHeader title={title} />

      <a
        href="#main-content"
        className="whitespace-nowrap absolute z-50 left-4 opacity-90 rounded-md bg-white px-4 py-3 transform -translate-y-40 focus:translate-y-0 transition-all duration-300"
      >
        Skip to main content
      </a>

      <TopNav />

      <nav
        className={`${scrolled ? "bg-white sticky top-0 shadow-md z-50" : "bg-transparent"
          } w-full z-50 h-20 relative`}
      >
        <div className="app-max-width w-full">
          {/* Container with relative so logo stays absolute center */}
          <div className={`relative flex items-center justify-between app-x-padding ${styles.mainMenu}`}>

            {/* Left Menu */}
            <ul className={`flex-0 lg:flex-1 flex ${styles.leftMenu}`}>
              <li><Link to="/product-category/men">Men</Link></li>
              <li><Link to="/product-category/women">Women</Link></li>
              <li><Link to="/product-category/bags">Bags</Link></li>
              <li><Link to="/coming-soon">Blogs</Link></li>
            </ul>

            {/* Logo - Always center */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/">
                <img
                  src="/logo.svg"
                  alt="CLOZY Fashion Logo"
                  className="h-13 w-40"
                />
              </Link>
            </div>

            {/* Right Menu */}
            <ul className={`flex-1 flex justify-end ${styles.rightMenu}`}>
              <li><SearchForm /></li>

              {user ? (
                <>
                  <li className="flex items-center px-2">
                    <span className="text-sm font-medium whitespace-nowrap">
                      Hi, {user.displayName || user.email}
                    </span>
                  </li>
                  <li
                    className="flex items-center cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="w-5 h-7 text-gray-600 hover:text-red-500" />
                  </li>
                </>
              ) : (
                <li>
                  <AuthForm>
                    <UserIcon />
                  </AuthForm>
                </li>
              )}

              <li>
                <Link to="/wishlist">
                  <button type="button" className="relative" aria-label="Wishlist">
                    <WhistlistIcon />
                    {noOfWishlist > 0 && (
                      <span
                        className={`${animate} absolute text-xs -top-3 -right-3 bg-gray500 text-gray100 py-1 px-2 rounded-full`}
                      >
                        {noOfWishlist}
                      </span>
                    )}
                  </button>
                </Link>
              </li>

              <li>
                <CartItem />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
