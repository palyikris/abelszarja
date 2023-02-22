import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Head from "next/head";
import ErrorBoundary from "./errorboundary";
import ExtraProtectedRoute from "../components/auth/ExtraProtectedRoute";

const noAuthRequired = ["/login", "/signup", "/"];
const extraProtectionRequired = ["/errors"];

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
          {extraProtectionRequired ? (
            <ExtraProtectedRoute>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </ExtraProtectedRoute>
          ) : (
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          )}
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
