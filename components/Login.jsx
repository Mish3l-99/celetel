import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useDispatch } from "react-redux";
import { setUser } from "../store/user";

const Login = () => {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const changeForm = (e) => {
    // e.preventDefault();
    setForm((form) => ({ ...form, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    if (form.email === "" || form.password === "") {
      setMessage("Empty Fields!");
    } else {
      // firebase auth
      // createUserWithEmailAndPassword(auth, form.email, form.password)
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          // Signed in,now set the global state
          setMessage("Success!, wait for redirecting...");
          dispatch(
            setUser({
              authenticated: true,
              email: form.email,
              password: form.password,
            })
          );
          router.push("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/user-not-found") {
            createUserWithEmailAndPassword(
              auth,
              form.email,
              form.password
            ).then((userCredential) => {
              // Signed in, now set the global state
              setMessage("Success!, wait for redirecting...");
              dispatch(
                setUser({
                  authenticated: true,
                  email: form.email,
                  password: form.password,
                })
              );
              router.push("/");
            });
          } else {
            setMessage("wrong password");
          }
          // ..
        });
    }
  };
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="box">
        <div className="logo">
          <Image src="/logo.jfif" layout="fill" objectFit="cover" />
        </div>
        <h1 className="text-lg md:text-xl">Get In</h1>
        <form className="flex flex-col w-full space-y-2 mt-12" action="">
          <input
            id="email"
            onChange={(e) => changeForm(e)}
            value={form.email}
            type="email"
            placeholder="Email..."
          />
          <input
            id="password"
            onChange={(e) => changeForm(e)}
            value={form.password}
            type="password"
            placeholder="Password..."
          />
          <hr />
          <button onClick={(e) => handleSubmit(e)} className="btn">
            Continue...
          </button>
          <div>{message}</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
