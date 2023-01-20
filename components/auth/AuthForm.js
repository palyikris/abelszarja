import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import styles from "../../styles/authform/style.module.css";
import AnimatedBackgroundPage from "./../../ui/animatedBackground";
import { useEffect } from "react";
import LoaderPage from "./../../ui/Loader";

export default function AuthForm(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);

  let { user, login, signup } = useAuth();

  useEffect(() => {
    if (user) {
      router.push(`/user/${user.id}/profile`);
    } else {
      setIsLoading(false);
    }
  }, []);

  async function handleSubmit(e) {
    setIsLoading(true);
    setError("");
    e.preventDefault();
    if (props.isLogin) {
      try {
        await login(email, password);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } else {
      try {
        await signup(email, password);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  }
  if (user != undefined && error === "") {
    if (!props.isLogin) {
      fetch("/api/user/userSetup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: user.id
        })
      }).then(() => {
        router.push(`/user/${user.id}/profile`);
      });
    } else {
      router.push(`/user/${user.id}/profile`);
    }
  } else {
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {props.isLogin ? <h3>Login</h3> : <h3>Új fiók</h3>}
          <p>{error}</p>
          <div className={styles.datas}>
            <div className={styles.data}>
              <label htmlFor="">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Írd be az emailod..."
              />
            </div>
            <div className={styles.data}>
              <label htmlFor="">Jelszó</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Írd be a jelszavad..."
              />
            </div>
          </div>
          <div className={styles.dataButton}>
            {props.isLogin ? (
              <>
                <button type="submit">Login</button>
                <Link href="/signup">Kéne egy fiók? Regisztrálj!!</Link>
              </>
            ) : (
              <>
                <button type="submit">Regisztráció</button>
                <Link href="/login">Van fiókod? Jelentkezz be!</Link>
              </>
            )}
          </div>
        </form>
        <div className={styles.img}></div>
      </div>
      <AnimatedBackgroundPage></AnimatedBackgroundPage>
    </>
  );
}
