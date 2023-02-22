import styles from "../../styles/inboxcontent/style.module.css";
import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./../../firebaseConfig";
import { useRouter } from "next/router";
import { getUserData } from "../../lib/userData/firebase";
import LoaderPage from "./../../ui/Loader";

export default function InboxContentPage(props) {
  let [isMailDisplay, setIsMailDisplay] = useState(false);
  let [displayedMail, setDisplayedMail] = useState({});
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(false);
  let [inbox, setInbox] = useState([]);

  async function refreshMails() {
    setIsLoading(true);
    let response = await fetch("/api/user/handleInbox", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: router.query.userId
      })
    });
    response = await response.json();
    setInbox(response.message);
    console.log(inbox);
    setIsLoading(false);
  }

  async function fetchInbox() {
    let response = await fetch("/api/user/handleInbox", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: router.query.userId
      })
    });

    response = await response.json();
    let data = response.message;
    return data;
  }

  console.log("rendered");
  useEffect(() => {
    fetchInbox().then((data) => {
      setInbox(data);
    });
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  if (isMailDisplay) {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className={styles.mails}>
          <div className={styles.data}>
            <label htmlFor="">Küldte</label>
            <input type="text" disabled value={displayedMail.sendername} />
          </div>
          <div className={styles.data}>
            <label htmlFor="">Üzenet</label>
            <textarea
              name=""
              id=""
              cols="50"
              rows="10"
              value={displayedMail.message}
            ></textarea>
          </div>
          <div className={styles.data}>
            <button
              onClick={() => {
                setIsMailDisplay(false);
              }}
            >
              Vissza
            </button>
            <button
              onClick={() => {
                setIsLoading(true);
                let dbInstance = doc(
                  db,
                  `userInbox/${router.query.userId}/inbox/${displayedMail.id}`
                );
                try {
                  deleteDoc(dbInstance).then(() => {
                    router.reload();
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Törlés
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (inbox.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
              clipRule="evenodd"
            />
          </svg>
          <button onClick={refreshMails}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className={styles.mails}>
          <h1>Nincsenek üzeneteid.</h1>
        </div>
        <button onClick={refreshMails}></button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
            clipRule="evenodd"
          />
        </svg>
        <button onClick={refreshMails}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className={styles.mails}>
        {inbox.map((mail, i) => {
          return (
            <button
              className={styles.mail}
              key={i}
              id={mail.id}
              onClick={() => {
                setDisplayedMail(inbox[i]);
                setIsMailDisplay(true);
              }}
            >
              <p>{mail.sendername}</p>
              <p>{mail.date}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
