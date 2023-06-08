import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button id="profile-icon" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user && (
          <div className="user-menu-content">
            <span style={{ color: "whitesmoke" }}>{user.username}</span>
            <span style={{ color: "whitesmoke" }}>{user.email}</span>
            <span onClick={() => history.push(`/users/${user.id}`)} style={{ color: 'whitesmoke' }}>My Profile</span>
            <button className="logout-button" style={{ color: "whitesmoke" }} onClick={handleLogout}>Log Out</button>

          </div>
          // ) : (
          //   <>
          //     <OpenModalButton
          //       buttonText="Log In"
          //       onItemClick={closeMenu}
          //       modalComponent={<LoginFormModal />}
          //     />

          //     <OpenModalButton
          //       buttonText="Sign Up"
          //       onItemClick={closeMenu}
          //       modalComponent={<SignupFormModal />}
          //     />
          //   </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
