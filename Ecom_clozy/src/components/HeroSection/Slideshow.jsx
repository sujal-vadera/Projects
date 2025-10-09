import React from "react";
import TextButton from "../Buttons/TextButton";
import styles from "./Hero.module.css";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Slider data
const sliders = [
  {
    id: 1,
    image: "/bg-img/curly_hair_girl-1.jpg",
    imageTablet: "/bg-img/curly_hair_girl-1-tablet.png",
    imageMobile: "/bg-img/curly_hair_girl-1_mobile.jpg",
    subtitle: "50% off",
    titleUp: "New Cocktail",
    titleDown: "Dresses",
    rightText: false,
  },
  {
    id: 2,
    image: "/bg-img/curly_hair_white-1.jpg",
    imageTablet: "/bg-img/curly_hair_white-1-tablet.png",
    imageMobile: "/bg-img/curly_hair_white-1_mobile.jpg",
    subtitle: "30% off",
    titleUp: "Summer",
    titleDown: "Collection",
    rightText: true,
  },
  {
    id: 3,
    image: "/bg-img/monigote.jpg",
    imageTablet: "/bg-img/monigote-tablet.png",
    imageMobile: "/bg-img/monigote_mobile.jpg",
    subtitle: "New Arrival",
    titleUp: "Elegant",
    titleDown: "Accessories",
    rightText: false,
  },
];

const Slideshow = () => (
  <div className="relative -top-20 slide-container w-full z-20">
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView={1}
      loop={sliders.length > 1} // ✅ loop only if more than 1 slide
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={true}
      pagination={{ clickable: true, type: "fraction" }}
      className="mySwiper"
    >
      {sliders.map((slider) => (
        <SwiperSlide key={slider.id}>
          {/* Desktop */}
          <div className="hidden lg:block">
            <img src={slider.image} alt={`slide-${slider.id}`} className="w-full h-auto" />
          </div>

          {/* Tablet */}
          <div className="hidden sm:block lg:hidden">
            <img src={slider.imageTablet} alt={`slide-${slider.id}`} className="w-full h-auto" />
          </div>

          {/* Mobile */}
          <div className="sm:hidden">
            <img src={slider.imageMobile} alt={`slide-${slider.id}`} className="w-full h-auto" />
          </div>

          {/* Text Section */}
          <div
            className={
              slider.rightText
                ? styles.rightTextSection
                : styles.leftTextSection
            }
          >
            <span className={styles.subtitle}>{slider.subtitle}</span>
            <span
              className={`${styles.title} text-center ${
                slider.rightText ? "sm:text-right" : "sm:text-left"
              }`}
            >
              {slider.titleUp} <br />
              {slider.titleDown}
            </span>
            <TextButton value="Shop Now" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Slideshow;
