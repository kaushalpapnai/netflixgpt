import React, { useEffect } from 'react'
import image from "../resources/Netflix_Logo_PMS.png"
import { signOut } from "firebase/auth";
import {auth} from "../utils/firbase"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser , removeUser} from "../slices/userSlice";
import { onAuthStateChanged} from "firebase/auth";

const Header = () => {
  const user = useSelector((store)=>store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // this is the firebase WebApi which is called automatically when user signed in or sined up or signed out
  // so that we dont have to write whole logic by ourselves
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      }
    });
  }, []);

  function handleSignout(){
    signOut(auth).then(() => {
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
