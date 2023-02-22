import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Head from "next/head";
import ErrorBoundary from "./errorboundary";

const noAuthRequired = ["/login", "/signup", "/"];

function MyApp({ Component, pageProps }) {
  let router = useRouter();

  return (
    <AuthContextProvider>
      <Head></Head>
      {noAuthRequired.includes(router.pathname) ? (
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      ) : (
        <ProtectedRoute>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
