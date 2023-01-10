import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const noAuthRequired = ["/login", "/signup", "/"];

function MyApp({ Component, pageProps }) {
  let router = useRouter();

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
