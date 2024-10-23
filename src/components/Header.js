import React, { useState } from 'react'
import image from "../resources/Netflix_Logo_PMS.png"
import { signOut } from "firebase/auth";
import {auth} from "../utils/firbase"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((store)=>store.user)
  const navigate = useNavigate()

  function handleSignout(){
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }
  return (
    <div className='absolute px-8 py-2 w-screen z-10 flex justify-between'>
      <img
        className='w-44'
        src={image}
        alt='logo'
      ></img>
      {user && (
        <div className='flex items-center space-x-4'>
          {user?.displayName ? (
            <h3 className="text-red-700 text-lg font-semibold">{user?.displayName}</h3>
          ) : null}
          <button
            className='text-red-600 px-4 py-2 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all'
            onClick={() => handleSignout()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
