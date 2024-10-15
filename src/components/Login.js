import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
   const [isSignInForm,setIsSignInForm] = useState(true)
   function handleSignIn(){
    setIsSignInForm(!isSignInForm)
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
      <form className="absolute p-12 bg-black mx-auto my-36 right-0 left-0 w-3/12 bg-opacity-80 rounded-lg">
        <h1 className="font-bold text-3xl py-4 text-white w-full">{isSignInForm?"Sign in":"Sign up"}</h1>
        {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700" />}
        <input type="text" placeholder="email address" className="p-4 my-4 w-full bg-gray-700" />
        <input type="text" placeholder="password" className="p-4 my-4 w-full bg-gray-700" />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg text-white">{isSignInForm?"Sign in":"Sign up"}</button>
         <p className="text-white cursor-pointer" onClick={()=> handleSignIn()}>
         {isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In Now"}
         </p>
      </form>
    </div>
  );
};

export default Login;
