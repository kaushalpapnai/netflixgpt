import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firbase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../slices/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);

const Body = () => {
  const dispatch = useDispatch();

  // this is the firebase WebApi which is called automatically when user signed in or sined up or signed out
  // so that we dont have to write whole logic by ourselves

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
      } else {
        // User is signed out
        dispatch(removeUser())
      }
    });
  }, []);
  return (
    <RouterProvider router={router}>
      <div>
        <Login />
        <Browse />
      </div>
    </RouterProvider>
  );
};

export default Body;
