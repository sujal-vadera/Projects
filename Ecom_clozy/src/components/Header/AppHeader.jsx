import React from "react";
import { Helmet } from "react-helmet-async";

const defaultDesc =
  "CLOZY Fashion e-commerce developed with React. Coded with 🖤 by Sat Naing (satnaing.dev).";
const defaultKeywords =
  "CLOZY Fashion, Online Shop, E-commerce, Sat Naing, ReactJS";

const AppHeader = ({
  title = "Clozy Fashion",
  desc = defaultDesc,
  keywords = defaultKeywords,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta content={desc} name="description" />
      <meta content={keywords} name="keywords" />
      <meta property="og:description" content={desc} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
};

export default AppHeader;
