import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "./Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firbase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [message, setMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  function toggleSignIn() {
    setIsSignInForm(!isSignInForm);
  }

  function handleSignInSignUp() {
    // Reset messages
    setMessage(null);
    
    // Check for empty fields and validity
    if (!isSignInForm) {
      if (!name.current.value) {
        setMessage("Please enter your name.");
        return;
      }
    }
    if (!email.current.value) {
      setMessage("Please enter your email.");
      return;
    }
    if (!password.current.value) {
      setMessage("Please enter your password.");
      return;
    }

    // If all checks pass, proceed with Firebase Authentication
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = user;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setMessage(error.message); // Show Firebase error message
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          // Additional logic after sign in, if needed
        })
        .catch((error) => {
          setMessage(error.message); // Show Firebase error message
        });
    }
  }

  return (
    <div className="relative min-h-screen bg-black ">
      <Header />
      <div className=" absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_medium.jpg"
          alt="background-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" mt-28 sm:mt-28 absolute p-6 sm:p-8 md:p-12 bg-black bg-opacity-80 mx-auto my-12 sm:my-20 md:my-36 right-0 left-0 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12 rounded-lg"
      >
        <h1 className="font-bold text-2xl sm:text-3xl py-4 text-white w-full">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <div>
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700 text-white"
            />
          </div>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-4 w-full bg-gray-700 text-white"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 text-white"
        />
        {message && <p className="text-red-500">{message}</p>}
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg text-white"
          onClick={handleSignInSignUp}
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
        <div className="text-white cursor-pointer text-center" onClick={toggleSignIn}>
          {isSignInForm
            ? <div className="flex justify-center"><span className="mr-1">new to Netflix? </span><span className="hover:text-red-500">sign Up now</span></div>
            : <div className="flex justify-center"><span className="mr-1">Already registered?</span><span className="hover:text-red-500">Sign In Now</span></div>}
        </div>
      </form>
    </div>
  );
};

export default Login;
