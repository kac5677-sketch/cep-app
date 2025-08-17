import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";   // ✅ 여기에 추가!

const root = createRoot(document.getElementById("root"));
root.render(<App />);
