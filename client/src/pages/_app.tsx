import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/auth";
import Axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/styles.css";
import "../styles/icons.css";
import { SWRConfig } from "swr";


Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await Axios.get(url)
    return res.data  
  } catch (err) {
    throw err.response.data
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
      }}
    >
      <AuthProvider>
        {!authRoute && <Navbar />}
        <div className={authRoute ? "" : "pt-12"}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  );
}
export default MyApp;
