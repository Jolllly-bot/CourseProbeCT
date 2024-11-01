import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// Add other Firebase modules you need

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
      <SessionProvider session={session}>
        <Head>
          <title>CourseProbe Home</title>
          <meta name="description" content="CourseProbe homepage" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
          ></link>
        </Head>
        <NavBar />
        <div className="pt-12">
          <Component {...pageProps} />
        </div>
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
