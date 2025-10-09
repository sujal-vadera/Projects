import FacebookLogo from "../icons/FacebookLogo";
import InstagramLogo from "../icons/InstagramLogo";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={`app-max-width app-x-padding ${styles.footerContents}`}>
          <div>
            <h3 className={styles.footerHead}>Company</h3>
            <div className={styles.column}>
              <a href="example">About Us</a>
              <a href="example">Contact Us</a>
              <a href="example">Store Location</a>
              <a href="example">Careers</a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Help</h3>
            <div className={styles.column}>
              <a href="example">Order Tracking</a>
              <a href="example">FAQs</a>
              <a href="example">Privacy Policy</a>
              <a href="example">Terms & Conditions</a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Store</h3>
            <div className={styles.column}>
              <a href="/product-category/women">Women</a>
              <a href="/product-category/men">Men</a>
              <a href="/product-category/bags">Bags</a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Keep in Touch</h3>
            <div className={styles.column}>
              <span>
                123 Main Street <br />
                Road No. 45 <br />
                New York City
              </span>
              <span>+1 234 567 890</span>
              <span>
                Open All Days <br />- 10:00 AM - 10:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-16">
        <h4 className="text-3xl mb-4">Newsletter</h4>
        <span className="px-6 text-center">
          Subscribe to our newsletter to get the latest updates.
        </span>
        <div className="mt-5 px-6 flex w-full sm:w-auto flex-col sm:flex-row">
          <Input
            label="Newsletter Input Box"
            name="email"
            type="email"
            extraClass=" w-full sm:w-auto"
          />
          <Button
            size="lg"
            value="Send"
            extraClass="ml-0 mt-4 sm:mt-0 tracking-widest sm:tracking-normal sm:mt-0 sm:ml-4 w-auto w-full sm:w-auto"
          />
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className="app-max-width app-x-padding w-full flex justify-between">
          <span className="">@2022 CLOZY. All rights reserved.</span>
          <span className="flex items-center">
            <span className="hidden sm:block">
              Follow us on social media:
            </span>{" "}
            <a href="https://www.facebook.com" aria-label="Facebook Page">
              <FacebookLogo />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram Account">
              <InstagramLogo />
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
