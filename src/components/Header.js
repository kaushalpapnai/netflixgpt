import React, { useEffect } from "react";
import image from "../resources/Netflix_Logo_PMS.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firbase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { toggleGptSearch } from "../slices/gptSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const gptSearch = useSelector((store)=> store.gpt.showGptSearch)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSignout() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  }

 

  // this is the firebase WebApi which is called automatically when user signed in or sined up or signed out
  // so that we dont have to write whole logic by ourselves
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    
    return () => unsubscribe(); // we are returning this to remove the evenlistners to make our app hyginic
  }, []);
  



  function handleGptToggle(){
     dispatch(toggleGptSearch())
  }



  return (
    <div className="absolute px-8 py-2 w-screen z-10 flex justify-between bg-gradient-to-b from-black via-gray-900 to-transparent p-4 top-0 ">
      <img className="w-44" src={image} alt="logo"></img>
      {user && (
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-yellow-500 transition-all shadow-lg"
             onClick={()=>handleGptToggle()}
          >
            {gptSearch?"Movies":"GPT Search"}
          </button>
          {user?.displayName ? (
            <h3 className="text-white text-lg font-semibold">
              {user?.displayName}
            </h3>
          ) : null}
          <button
            className="text-black px-4 py-2 bg-white rounded-lg hover:bg-gray-300 transition-all"
            onClick={() => handleSignout()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
