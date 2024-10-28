import Link from "next/link";
import {GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from "../firebase";
import { useState, useEffect } from "react";

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    if (user.email && user.email.endsWith('@cornell.edu')) {
      console.log('Authenticated successfully', user);
    } else {
      await signOut(auth);
      throw new Error('Please use a Cornell University email to sign in.');
    }

  } catch (error) {
    console.error('Login failed:', error.message);
    alert(error.message);
  }
};

const signOutGoogle = async () => {
  try{
    await signOut(auth);
    console.log("Signed Out");
  } catch (error) {
    console.log(error);
  }
};


const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  auth.onAuthStateChanged(user => {
    setCurrentUser(user); // Update user state whenever the auth state changes
  });

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ borderBottom: "1px solid lightgrey" }}
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item"><strong>CourseProbeCT</strong></a>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start"></div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {currentUser ? (
              <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* <p className="navbar-item">{currentUser.displayName}</p> */}
                <Link href="/app/myContributions">
                  <a className="navbar-item">My contributions</a>
                </Link>
                <button className="button is-danger is-outlined" onClick={() => signOutGoogle()}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div>
                <button className="button is-danger is-outlined" onClick={() => signInWithGoogle()}>
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
