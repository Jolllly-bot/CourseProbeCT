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
          <a className="navbar-item"><strong>CourseProbe</strong></a>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start"></div>
      </div>
      <div className="navbar-end">
          {/* CS5356 TODO 1a. Navigation

Create a new page at /app/home to be the Instructor Home Page.
This page should only be visible by signed in users.
If a signed-out user tries to access the page, they should
be redirected to the login page to complete signing in.

The Instructor Home Page should have 2 parts, similar to your 
wireframe.
1. The page should contain one section to display a short form
allowing them to create a class code by making a 
POST /api/class-codes (Completed in step 3a). When a class code has been created, this 
page should re-fetch the user's class codes.

2. The page should contain another section to display a list or
table of the user's class codes. When the page loads for the first
time, make a GET /api/class-codes (Completed in step 3a) to fetch the list of class codes.
*/}
        
        <div className="navbar-item">
          <div className="buttons">
            {currentUser ? (
              <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* <p className="navbar-item">{currentUser.displayName}</p> */}
                <Link href="/app/home">
                  <a className="navbar-item">My contributions</a>
                </Link>
                <button className="button is-primary" onClick={() => signOutGoogle()}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div>
                <button className="button is-primary" onClick={() => signInWithGoogle()}>
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
