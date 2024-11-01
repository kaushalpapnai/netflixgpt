import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Player from "./Player";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path:"/player",
    element:<Player/>
  }
]);

const Body = () => {


  return (
    <RouterProvider router={router}>
      <div>
        <Login />
        <Browse />
        <Player/>
      </div>
    </RouterProvider>
  );
};

export default Body;
