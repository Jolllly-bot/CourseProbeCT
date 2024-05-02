import Link from "next/link";
import {GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
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

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ borderBottom: "1px solid lightgrey" }}
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">QUESTIONIFY</a>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start"></div>
      </div>
      <div className="navbar-end">
        <Link href="/app/home">
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
          <a className="navbar-item">User Home</a>
        </Link>
        <div className="navbar-item">
          <div className="buttons">
            {/* CS5356 TODO 1b. Authentication

              Finish configuring NextAuth by editing pages/api/auth/[...nextAuth].js.
              Then get the user's session and check if they are signed in.
              https://next-auth.js.org/getting-started/client#usesession

              Display a button here to "Sign In" in if the user is not currently signed in,
              i.e they don't have an active session. It should send the user to /api/auth/signin
              https://next-auth.js.org/getting-started/client#signin

              If the user is signed in and they have an active session, the button 
              should display "Sign out", and it should direct the user to the /api/auth/signout page
              https://next-auth.js.org/getting-started/client#signout
             */}
            {auth.currentUser ? (
              <div>
                <p className="navbar-item">Signed in as: {auth.currentUser.displayName}</p>
              </div>
            ) : (
              <div>
                <button className="button is-primary" onClick={() => signOutGoogle()}>
                  Sign Out
                </button>
              <button className="button is-primary" onClick={() => signInWithGoogle()}>
                Sign In
              </button>
              </div>
            )}
            {/* <button
              className="button is-primary"
              onClick={() => signInWithPopup()}
             >
              Sign In
             </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
