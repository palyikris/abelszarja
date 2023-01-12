import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function AuthForm(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let router = useRouter();

  let { user, login, signup } = useAuth();
  if (user) {
    router.push(`/user/${user.id}/profile`);
  }

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();
    if (props.isLogin) {
      try {
        await login(email, password);
        router.push(`/user/${user.id}/profile`);
      } catch (error) {}
    } else {
      try {
        await signup(email, password);
        router.push(`/user/${user.id}/profile`);
      } catch (error) {}
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {props.isLogin ? <h3>Login</h3> : <h3>Sign up</h3>}
      <p>{error}</p>
      <div>
        <div>
          <label htmlFor="">Username</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
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
  );
}
