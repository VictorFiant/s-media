import Logo from "../image/logo.svg";
import Link from "next/link";
import Axios from "axios";
import { useAuthState, useAuthDispatch } from "../context/auth";
import { Fragment } from "react";

const Navbar: React.FC = () => {
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    Axios.get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
      {/** Logo  */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <Logo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="font-semibold text-2x1 ">
          <Link href="/">R€@Di7</Link>
        </span>
      </div>
      {/** Search Input */}
      <div className="flex items-center mx-auto bg-gray-100 border rounded">
        <i className="pl-3 pr-3 text-gray-600 fas fa-search"></i>
        <input
          type="text"
          className="py-1 pr-3 bg-transparent rounded focus:outline-none w-160"
          placeholder="Search"
        />
      </div>
      {/** Auth Button */}
      <div className="flex">
        {!loading &&
          (authenticated ? (
            <button
              className="w-32 py-1 mr-4 leading-6 hollow green button"
              onClick={logout}
            >
              LogOut
            </button>
          ) : (
            <Fragment>
              <Link href="/login">
                <a className="w-32 py-1 mr-4 leading-6 hollow green button">
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="w-32 py-1 leading-6 green button">Sign-Up</a>
              </Link>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
