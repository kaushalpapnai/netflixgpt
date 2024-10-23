import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "./Validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import {auth} from "../utils/firbase"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser , removeUser} from "../slices/userSlice";

const Login = () => {
  const user = useSelector((store)=>store?.user)
  console.log(user)
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [message, setMessage] = useState(null);
  const [nameFlag,setNameFlag] = useState(true)
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null)
  const dispatch = useDispatch()


  function toggleSignIn() {
    setIsSignInForm(!isSignInForm);
  }

  function handleSignInSignUp() {
    const res = checkValidData(email.current.value, password.current.value);
    setMessage(res);
    if(!name?.current?.value){
      setNameFlag(false)
    }else{
      setNameFlag(true)
    }

    if(res == null && !isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, // photoURL: "https://example.com/jane-q-user/profile.jpg"
          addUser
        }).then(() => {
          // Profile updated!

          const { uid, email, displayName } = auth.currentUser;   // we are taking the updated user from the firebase
          dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        }).catch((error) => {
          // An error occurred
          console.log(error)
        });
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setMessage(errorMessage)
        // ..
      });
    }

    if(isSignInForm){
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        setMessage(errorMessage)
      });
    }
  }

  return (
    <div className="relative min-h-screen bg-black ">
      <Header />
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_medium.jpg"
          alt="background-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-6 sm:p-8 md:p-12 bg-black bg-opacity-80 mx-auto my-12 sm:my-20 md:my-36 right-0 left-0 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12 rounded-lg"
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
            {console.log(nameFlag)}
            <p className="text-red-500">{nameFlag?null:"please enter name"}</p>
          </div>
          
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-4 w-full bg-gray-700 text-white"
        />
        <p className="text-red-500">{message?.email ? message.email : null}</p>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 text-white"
        />
        <p className="text-red-500">
          {message?.password ? message.password : null}
        </p>
        <p className="text-red-500">
          {message?.password || message?.email || nameFlag ? null : message}
        </p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg text-white"
          onClick={() => handleSignInSignUp()}
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
        <p
          className="text-white cursor-pointer text-center"
          onClick={() => toggleSignIn()}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
