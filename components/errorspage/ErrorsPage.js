import { useAuth } from "./../../context/AuthContext";
import { useEffect, useState } from "react";
import LoaderPage from "./../../ui/Loader";
import styles from "../../styles/errorspagecomponent/style.module.css";
import { useRouter } from "next/router";
import { AddZero } from "./../../lib/AddZero";

export default function ErrorsPageComponent() {
  let { user } = useAuth();
  let router = useRouter();
  let [errors, setErrors] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isSolved, setIsSolved] = useState(false);

  async function handleError(isSolved, errorId, userId) {
    try {
      if (isSolved) {
        let response = await fetch("/api/error/errorhandling", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            errorId: errorId
          })
        });

        let date = new Date();
        let dateCreated = `${date.getFullYear()}.${AddZero(
          date.getMonth() + 1
        )}.${AddZero(date.getDate())} ${AddZero(date.getHours())}:${AddZero(
          date.getMinutes()
        )}:${AddZero(date.getSeconds())}`;

        let mailResponse = await fetch("/api/mail/handleMails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message:
              "Kedves Felhasználónk! Beadott hibajelzését sikeresen megoldottuk, köszönjük türelmét. Csók, Maxt.",
            fromId: "Maxt Hibakezelés",
            senderId: userId,
            date: dateCreated,
            sendername: "Maxt Hibakezelés"
          })
        });
      } else {
        let response = await fetch("/api/error/errorhandling", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            errorId: errorId
          })
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchErrorSubmissions() {
    let response = await fetch("/api/error/errorhandling", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    response = await response.json();
    return response.message;
  }

  async function refreshErrors() {
    setIsLoading(true);

    try {
      fetchErrorSubmissions().then((response) => {
        if (!isSolved) {
          response = response.filter((error) => error.status === "pending");
        } else {
          response = response.filter((error) => error.status === "solved");
        }
        setErrors(response);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchErrorSubmissions().then((response) => {
      if (!isSolved) {
        response = response.filter((error) => error.status === "pending");
      } else {
        response = response.filter((error) => error.status === "solved");
      }
      setErrors(response);
      setIsLoading(false);
    });
  }, [isSolved]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.errorsWrapper}>
          <LoaderPage></LoaderPage>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.errorsWrapper}>
        <div className={styles.errorControlPanel}>
          <div>
            <button onClick={refreshErrors}>
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
          {isSolved ? <h1>Megoldott hibák.</h1> : <h1>Bejelentett hibák.</h1>}
          {isSolved ? (
            <>
              <button
                onClick={() => {
                  setIsSolved(false);
                }}
              >
                Megoldandók
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsSolved(true);
                }}
              >
                Megoldottak
              </button>
            </>
          )}
        </div>
        {errors.map((error, i) => {
          console.log(error);
          return (
            <>
              <div key={i} className={styles.error}>
                <div className={styles.data}>
                  <p>{error.name}</p>
                  <p>{error.date}</p>
                </div>
                <div className={styles.errorContent}>
                  <div>{error.error}</div>
                </div>
                <div className={styles.buttonWrapper}>
                  {isSolved ? (
                    <></>
                  ) : (
                    <button
                      onClick={() => {
                        handleError(true, error.id, error.userId);
                        refreshErrors();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleError(false, error.id);

                      refreshErrors();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.sep}></div>
            </>
          );
        })}
      </div>
    </div>
  );
}
