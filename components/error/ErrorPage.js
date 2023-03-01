import styles from "../../styles/errorpage/style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import LoaderPage from "./../../ui/Loader";
import { AddZero } from "./../../lib/AddZero";

export default function ErrorPage() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [error, setError] = useState("");
  let [isErrorSent, setIsErrorSent] = useState(false);
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(false);

  async function submitError(e) {
    setIsErrorSent(true);
    setIsLoading(true);
    let date = new Date();
    let dateCreated = `${date.getFullYear()}.${AddZero(
      date.getMonth() + 1
    )}.${AddZero(date.getDate())} ${AddZero(date.getHours())}:${AddZero(
      date.getMinutes()
    )}:${AddZero(date.getSeconds())}`;
    e.preventDefault();
    let response = await fetch("/api/error/errorhandling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        error: error,
        userId: router.query.userId,
        date: dateCreated
      })
    });
    response = await response.json();
    let otherResponse = await fetch("/api/user/handleInbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: router.query.userId,
        date: dateCreated,
        sendername: "Maxt Hibakezelés",
        message:
          "Köszönjük a hiba jelentését, üzenetét fogadtuk, és igyekszünk kijavítani. Amint kész van, értesítjük Önt. Csók, Maxt."
      })
    });
    otherResponse = await otherResponse.json();
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  if (isErrorSent) {
    return (
      <div className={styles.container}>
        <form>
          <h1>Köszönjük szépen!</h1>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitError}>
        <h1>Hibát észleltél?</h1>
        <h4>
          Írd le, hogy mi történt, melyik oldalon, olyan pontosan, ahogy csak
          tudod.
        </h4>
        <div className={styles.data}>
          <label htmlFor="">Név</label>
          <input
            type="text"
            placeholder="A neved..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.data}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Az emailed..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles.dataTextArea}>
          <h2>A Hiba.</h2>
          <textarea
            name=""
            id=""
            cols="100"
            rows="20"
            value={error}
            onChange={(e) => {
              setError(e.target.value);
            }}
            required
          ></textarea>
        </div>
        <div className={styles.dataButton}>
          <button type="submit">OK</button>
        </div>
      </form>
    </div>
  );
}
