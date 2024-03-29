import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import InputGroup from "../components/InputGroup";
import { useAuthState } from "../context/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!agreement) {
      setErrors({ ...errors, agreement: "You must agree to T&Cs" });
      return;
    }

    try {
      await Axios.post("/auth/register", {
        email,
        username,
        password,
      });
      router.push("/login");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
      </Head>
      <div
        className="h-screen bg-center bg-cover w-80"
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/tile.jpg')`,
        }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-3xl font-medium ">Sing Up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={submitForm}>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff on ReadHub
              </label>
              <small className="block font-medium text-red-800 ">
                {errors.agreement}
              </small>
            </div>
            <InputGroup
              className="mb-2"
              type="email"
              value={email}
              placeholder="EMAIL"
              error={errors.email}
              setValue={setEmail}
            />
            <InputGroup
              className="mb-2"
              type="username"
              value={username}
              placeholder="USERNAME"
              error={errors.username}
              setValue={setUsername}
            />
            <InputGroup
              className="mb-2"
              type="password"
              value={password}
              placeholder="PASSWORD"
              error={errors.password}
              setValue={setPassword}
            />
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-green-600 border border-black rounded">
              Sing Up
            </button>
          </form>
          <small>
            Already a customer?
            <Link href="/login">
              <a className="ml-1 text-red-500 uppercase">Log-In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
