// src/router.jsx

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import VideoDetails from "./pages/VideoDetails"; // to be created
import Login from "./pages/Login"; // to be created
import Signup from "./pages/Singup";
import CreateChannel from "./pages/CreateChannel";
import Channel from "./pages/Channel";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/video/:id", element: <VideoDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { path: "/create-channel", element: <CreateChannel /> },
      { path: "/channel/:id", element: <Channel /> }
    ],
  },
]);

export default router;
