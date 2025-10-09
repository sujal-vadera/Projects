import React from "react";
import { Helmet } from "react-helmet-async";


const title = "CLOZY Fashion";
const desc =
  "CLOZY Fashion e-commerce developed with Next.JS. Coded with 🖤 by Sat Naing (satnaing.dev).";
const keywords = "CLOZY Fashion, Online Shop, E-commerce, Sat Naing";

const Document = () => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#282828" />
        <meta name="msapplication-TileColor" content="#282828" />

        <link
          href="/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/favicons/site.webmanifest" rel="manifest" />

        <meta property="og:url" content="https://CLOZY-fashion.vercel.app" />
        <link rel="canonical" href="https://haru-fashion.vercel.app" />
        <meta property="og:site_name" content="Haru Fashion" />
        <meta property="og:description" content={desc} />
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content="https://haru-fashion.vercel.app/og.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@satnaing.dev" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta
          name="twitter:image"
          content="https://haru-fashion.vercel.app/og.png"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Helmet>
    </>
  );
};

export default Document;
