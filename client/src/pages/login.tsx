import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "../context/auth";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import InputGroup from "../components/InputGroup";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post("/auth/login", {
        username,
        password,
      });

      dispatch("LOGIN", res.data);

      router.back();
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>\
      </Head>
      <div
        className="h-screen bg-center bg-cover w-80"
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/tile2.jpg')`,
        }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-3xl font-medium ">Login</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              type="username"
              value={username}
              placeholder="USERNAME"
              error={username}
              setValue={setUsername}
            />
            <InputGroup
              className="mb-2"
              type="password"
              value={password}
              placeholder="PASSWORD"
              error={password}
              setValue={setPassword}
            />
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-green-600 border border-black rounded">
              Login
            </button>
          </form>
          <small>
            New to Reading?
            <Link href="/register">
              <a className="ml-1 text-red-500 uppercase">Sing Up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
