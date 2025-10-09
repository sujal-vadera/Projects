
import React, { useState, useEffect } from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import Slideshow from "../components/HeroSection/Slideshow";
import OverlayContainer from "../components/OverlayContainer/OverlayContainer";
import Card from "../components/Card/Card";
import TestiSlider from "../components/TestiSlider/TestiSlider";
import LinkButton from "../components/Buttons/LinkButton";
import { useAuth } from "../context/AuthContext";

// Import the static items array instead of using API
import Items from "../components/Util/Items.js";
import LoginForm from "../components/Auth/AuthForm.jsx";

// Images
const ourShop = "/bg-img/ourshop.png";

// Messages
const messages = {
  new_arrivals: "New Arrivals",
  women_collection: "Women Collection",
  men_collection: "Men Collection",
  best_selling: "Best Selling",
  best_selling_desc: "Check out our most popular products!",
  testimonial: "Testimonials",
  featured_products: "Featured Products",
  see_more: "See More",
  loading: "Loading...",
  our_shop: "Our Shop",
  our_shop_desc: "Visit our store and experience the best shopping.",
};

const Home = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const { user } = useAuth();

  useEffect(() => {
    console.log("🏠 Home mounted!");
  }, []);

  useEffect(() => {
    if (user) {
      console.log(" Home re-rendered due to login:", user);
    } else {
      console.log(" User logged out or null");
    }
  }, [user]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <>
      <Header />
      <Slideshow />

      <main id="main-content" className="-mt-20">
        {/*  User Info Section */}
        <section className="p-6 text-center">
          {user ? (
            <p className="text-green-600 text-lg font-semibold">
              Logged in as {user.displayName || user.email}
            </p>
          ) : (
            <p className="text-red-500 text-lg font-semibold">Not logged in</p>
          )}
        </section>

        {/* Category Section */}
        <section className="w-full h-auto py-10 border-b-2 border-gray100">
          <div className="app-max-width app-x-padding grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2 lg:col-span-2">
              <OverlayContainer
                imgSrc="/bg-img/banner_minipage1.jpg"
                imgSrc2="/bg-img/banner_minipage1-tablet.jpg"
                imgAlt={messages.new_arrivals}
              >
                <LinkButton
                  href="/product-category/new-arrivals"
                  extraClass="absolute bottom-10-per sm:right-10-per z-20"
                >
                  {messages.new_arrivals}
                </LinkButton>
              </OverlayContainer>
            </div>
            <OverlayContainer imgSrc="/bg-img/banner_minipage2.jpg" imgAlt={messages.women_collection}>
              <LinkButton href="/product-category/women" extraClass="absolute bottom-10-per z-20">
                {messages.women_collection}
              </LinkButton>
            </OverlayContainer>
            <OverlayContainer imgSrc="/bg-img/banner_minipage3.jpg" imgAlt={messages.men_collection}>
              <LinkButton href="/product-category/men" extraClass="absolute bottom-10-per z-20">
                {messages.men_collection}
              </LinkButton>
            </OverlayContainer>
          </div>
        </section>

        {/* Best Selling */}
        <section className="app-max-width mt-16 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-2">{messages.best_selling}</h2>
            <span>{messages.best_selling_desc}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 app-x-padding">
            {Items.slice(0, 4).map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="hidden md:flex flex-col items-center py-16 bg-lightgreen">
          <h2 className="text-3xl">{messages.testimonial}</h2>
          <TestiSlider />
        </section>

        {/* Featured Products */}
        <section className="app-max-width app-x-padding my-16">
          <h2 className="text-3xl text-center mb-6">{messages.featured_products}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
            {Items.slice(0, visibleCount).map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          {visibleCount < Items.length && (
            <div className="flex justify-center">
              <Button value={messages.see_more} onClick={handleSeeMore} />
            </div>
          )}
        </section>

        {/* Our Shop */}
        <section className="app-max-width mt-16 mb-20 flex flex-col items-center text-center">
          <h2 className="text-3xl mb-6">{messages.our_shop}</h2>
          <span>{messages.our_shop_desc}</span>
          <img src={ourShop} alt="Our Shop" className="mt-6" />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;