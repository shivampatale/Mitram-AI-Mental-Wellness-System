import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{

          style: {
            background: "#0f172a",
            color: "#ffffff",
            border: "1px solid #1e293b",
            padding: "16px",
            borderRadius: "18px"
          },

          success: {
            iconTheme: {
              primary: "#06b6d4",
              secondary: "#ffffff"
            }
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff"
            }
          }
        }}
      />

      <App />

    </BrowserRouter>

  </React.StrictMode>
);