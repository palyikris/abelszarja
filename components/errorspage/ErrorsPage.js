import { useAuth } from "./../../context/AuthContext";
import { useEffect, useState } from "react";
import LoaderPage from "./../../ui/Loader";
import styles from "../../styles/errorspagecomponent/style.module.css";

export default function ErrorsPageComponent() {
  let { user } = useAuth();
  let [errors, setErrors] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchErrorSubmissions().then((response) => {
      setErrors(response);
      setIsLoading(false);
    });
  });

  if (isLoading) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.errorsWrapper}>
        <h1>Bejelentett hibák.</h1>
        {errors.map((error, i) => {
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
                  <button>
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
                  <button>
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
