import React, { useEffect, useState } from "react";
import image from "../resources/Netflix_Logo_PMS.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firbase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { toggleGptSearch } from "../slices/gptSlice";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for hamburger menu

const Header = () => {
  const user = useSelector((store) => store.user.user);
  const gptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSignout() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  function handleGptToggle() {
    dispatch(toggleGptSearch());
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="absolute w-full z-20 bg-gradient-to-b from-black via-gray-900 to-transparent top-0 flex justify-between items-center">
      <img className="w-32 sm:w-44" src={image} alt="logo" />

      {/* Hamburger Menu Button */}
     { user ? <button className="sm:hidden mr-3 text-white" onClick={toggleMenu}>
        <FiMenu size={28} />
      </button>:null}

      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-30`} // Added z-index
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-3/4 bg-gray-900 p-6 flex flex-col space-y-4 transition-transform duration-300 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } sm:static sm:inset-0 sm:bg-transparent sm:flex-row sm:items-center sm:w-auto sm:translate-x-0 z-40`} // Added z-index
      >
        {user && (
          <>
            <button
              className="px-4 mt-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-yellow-500 transition-all shadow-lg"
              onClick={handleGptToggle}
            >
              {gptSearch ? "Movies" : "GPT Search"}
            </button>

            {user?.displayName && (
              <h3 className="text-white mx-4 text-center sm:text-left text-lg font-semibold">
                {user?.displayName}
              </h3>
            )}
            <button
              className="px-4 py-2 text-black bg-white rounded-lg hover:bg-gray-300 transition-all"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </>
        )}

        {/* Close Button */}
        <button
          className="sm:hidden text-white absolute bottom-6 right-6"
          onClick={toggleMenu}
        >
          <FiX size={28} />
        </button>
      </div>
    </div>
  );
};

export default Header;
