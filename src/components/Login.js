import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "./Validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [messsage,setMessage] = useState(null)
  const email = useRef(null) // we are using useRef method to reference to the email which is typed in input field we can use useState also and pass that in validat.js but useRef is easy
  const password = useRef(null)

  function toggleSignIn() {
    setIsSignInForm(!isSignInForm);
  }

  function handleSignIn(){
      const res =  checkValidData(email.current.value,password.current.value)    // we are passing email.current.value because useRef gives us object so we have to navigate inside it 
      setMessage(res)
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_medium.jpg"
          alt="background-img"
        />
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className="absolute p-12 bg-black mx-auto my-36 right-0 left-0 w-3/12 bg-opacity-80 rounded-lg">
        <h1 className="font-bold text-3xl py-4 text-white w-full">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 text-white"
          />
        )}
        <input
          ref={email} // refference useRef
          type="text"
          placeholder="email address"
          className="p-4 my-4 w-full bg-gray-700 text-white"
        />
        <p className="text-red-500">{messsage?.email?messsage?.email:null}</p>
        <input
          ref={password} // refference useRef
          type="text"
          placeholder="password"
          className="p-4 my-4 w-full bg-gray-700 text-white"
        />
        <p className="text-red-500">{messsage?.password?messsage?.password:null}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg text-white"
           onClick={()=>handleSignIn()}
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
        <p className="text-white cursor-pointer" onClick={() => toggleSignIn()}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
