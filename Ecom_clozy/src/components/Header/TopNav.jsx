import { Menu } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

import InstagramLogo from "../icons/InstagramLogo";
import FacebookLogo from "../icons/FacebookLogo";
import DownArrow from "../icons/DownArrow";
import styles from "./Header.module.css";

const MyLink = ({ href, children, active, ...rest }) => {
  return (
    <Link
      to={href}
      className={`py-2 px-4 text-center ${
        active ? "bg-gray200 text-gray500" : "bg-white text-gray500"
      }`}
      {...rest}
    >
      {children}
    </Link>
  );
};

const TopNav = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="bg-gray500 text-gray100 hidden lg:block">
      <div className="flex justify-between app-max-width">
        {/* Left Menu */}
        <ul className={`flex ${styles.topLeftMenu}`}>
          <li>
            <a href="#" aria-label="CLOZY Fashion Facebook Page">
              <FacebookLogo />
            </a>
          </li>
          <li>
            <a href="#" aria-label="CLOZY Fashion Instagram Account">
              <InstagramLogo />
            </a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Our Policy</a>
          </li>
        </ul>

        {/* Right Menu */}
        <ul className={`flex ${styles.topRightMenu}`}>
          {/* Language Switch */}
          <li>
            <Menu as="div" className="relative">
              <Menu.Button as="a" href="#" className="flex">
                English <DownArrow />
              </Menu.Button>
              <Menu.Items
                className="flex flex-col w-20 right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none"
                style={{ zIndex: 9999 }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <MyLink active={active} href={pathname}>
                      English
                    </MyLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <MyLink active={active} href={pathname}>
                      Myanmar
                    </MyLink>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </li>

          {/* Currency Switch */}
          <li>
            <Menu as="div" className="relative">
              <Menu.Button as="a" href="#" className="flex">
                USD <DownArrow />
              </Menu.Button>
              <Menu.Items
                className="flex flex-col w-20 right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none"
                style={{ zIndex: 9999 }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active
                          ? "bg-gray100 text-gray500"
                          : "bg-white text-gray500"
                      } py-2 px-4 text-center focus:outline-none`}
                    >
                      USD
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active
                          ? "bg-gray100 text-gray500"
                          : "bg-white text-gray500"
                      } py-2 px-4 text-center focus:outline-none`}
                    >
                      MMK
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;
