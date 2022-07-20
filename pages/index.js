import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  // if global state user is not set, navigate to login
  useEffect(() => {
    if (!user.authenticated) {
      router.replace("/login");
    }
  }, [user.authenticated]);
  return (
    <div className="">
      <Head>
        <title>Celetel Assignment</title>
        <meta
          name="description"
          content="this is an assignment for internship application"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="">
        <Dashboard />
      </main>

      <footer className=""></footer>
    </div>
  );
}
