import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SecretPage from "./pages/EasterEggPage.tsx";

const router = createBrowserRouter([
  {
    // depois melhorar o sistema do router aqui, por enquanto pode deixar deste forma
    path: "/",
    element: <App />,
  },
  {
    path: "/secret",
    element: <SecretPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
