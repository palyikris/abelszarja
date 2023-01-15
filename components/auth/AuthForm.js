import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import styles from "../../styles/authform/style.module.css";
import AnimatedBackgroundPage from "./../../ui/animatedBackground";
import { useEffect } from "react";

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
  });

  async function handleSubmit(e) {
    setIsLoading(true);
    setError("");
    e.preventDefault();
    if (props.isLogin) {
      try {
        await login(email, password);
        router.push(`/user/${user.id}/profile`);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } else {
      try {
        await signup(email, password);
        router.push(`/user/${user.id}/profile`);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {props.isLogin ? <h3>Login</h3> : <h3>Sign up</h3>}
          <p>{error}</p>
          <div className={styles.datas}>
            <div className={styles.data}>
              <label htmlFor="">Username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email..."
              />
            </div>
            <div className={styles.data}>
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password..."
              />
            </div>
          </div>
          <div className={styles.dataButton}>
            {props.isLogin ? (
              <>
                <button type="submit">Login</button>
                <Link href="/signup">Need an account? Sign up!</Link>
              </>
            ) : (
              <>
                <button type="submit">Sign up</button>
                <Link href="/login">Have an account? Log in!</Link>
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
