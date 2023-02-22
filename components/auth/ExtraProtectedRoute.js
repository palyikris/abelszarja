import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ExtraProtectedRoute({ children }) {
  let router = useRouter();
  let { user } = useAuth();

  useEffect(() => {
    if (user === undefined || user.id != "BJMJld2NV0dfmA7O0deOHiPodyC3") {
      router.push("/login");
    }
  }, [router.push, user]);

  return <>{user ? children : null}</>;
}
