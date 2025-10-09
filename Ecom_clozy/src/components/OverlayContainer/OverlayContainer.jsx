import React from "react";
import styles from "./OverlayContainer.module.css";

const OverlayContainer = ({ imgSrc, imgSrc2, imgAlt, children }) => {
  return (
    <div className={styles.imgContainer}>
      {imgSrc2 ? (
        <>
          <div className="hidden sm:block w-full">
            <img
              className={styles.img}
              src={imgSrc}
              alt={imgAlt}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="block sm:hidden w-full">
            <img
              className={styles.img}
              src={imgSrc2}
              alt={imgAlt}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </>
      ) : (
        <img
          className={styles.img}
          src={imgSrc}
          alt={imgAlt}
          style={{ width: "100%", height: "auto" }}
        />
      )}

      {children}

      <div className={styles.imgOverlay}></div>
      <div className={styles.overlayBorder}></div>
      <div className={styles.overlayBorder2}></div>
    </div>
  );
};

export default OverlayContainer;
