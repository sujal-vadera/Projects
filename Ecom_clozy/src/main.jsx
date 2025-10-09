


import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import "./styles/globals.css";
import "animate.css";
import "nprogress/nprogress.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <HelmetProvider> 
{/* helmetprovider ka use jab hame title ya kuch uper tab changes kar ne liye or 
 me static element change kar ne ke liye use hota he  */}
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
