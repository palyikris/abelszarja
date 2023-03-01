import { getAllUserData, getUserData } from "../../lib/userData/firebase";
import styles from "../../styles/inboxsender/style.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoaderPage from "./../../ui/Loader";
import { AddZero } from "./../../lib/AddZero";

export default function InboxSenderPage() {
  let router = useRouter();
  let [classMates, setClassMates] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [search, setSearch] = useState("");
  let [searchedUser, setSearchedUser] = useState();
  let [showId, setShowId] = useState(false);
  let [isSender, setIsSender] = useState(false);
  let [senderId, setSenderId] = useState("");
  let [message, setMessage] = useState("");

  async function getClassMates() {
    let users = await getAllUserData();
    let userClass = await getUserClass();
    let classMates = users.filter(
      (user) => user.userClass === userClass && user.id != router.query.userId
    );
    return classMates;
  }
  async function getUserClass() {
    let user = await getUserData(router.query.userId);
    let userClass = user.userClass;
    return userClass;
  }
  async function getUserName() {
    let user = await getUserData(router.query.userId);
    let username = user.nickname;
    return username;
  }

  async function sendMail(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let date = new Date();
      let dateCreated = `${date.getFullYear()}.${AddZero(
        date.getMonth() + 1
      )}.${AddZero(date.getDate())} ${AddZero(date.getHours())}:${AddZero(
        date.getMinutes()
      )}:${AddZero(date.getSeconds())}`;
      let sendername = await getUserName();
      let response = await fetch("/api/mail/handleMails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: senderId,
          message: message,
          fromId: router.query.userId,
          date: dateCreated,
          sendername: sendername
        })
      });
      setIsLoading(false);
      setIsSender(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsSender(false);
    }
  }

  useEffect(() => {
    try {
      getClassMates().then((data) => {
        setClassMates(data);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  async function searchForUser(userId) {
    let user = await getUserData(userId);
    setSearchedUser(user);
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  if (isSender) {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </div>
        <form onSubmit={sendMail}>
          <div>
            <label htmlFor="">Üzenet</label>
            <textarea
              name=""
              id=""
              cols="50"
              rows="10"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <button type="submit">OK</button>
            <button
              onClick={() => {
                setIsSender(false);
              }}
            >
              Vissza
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (classMates.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </div>
        <div className={styles.searchWrapper}>
          <h3>Keresés felhasználói ID szerint</h3>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              onClick={() => {
                searchForUser(search);
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
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.idWrapper}>
          {showId ? (
            <>
              <p>{router.query.userId}</p>
              <button
                onClick={() => {
                  setShowId((prev) => !prev);
                }}
              >
                Rejtsd el az ID-m
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowId((prev) => !prev);
              }}
            >
              Mutasd az ID-m
            </button>
          )}
        </div>
        <div className={styles.contacts}>
          {searchedUser != undefined &&
          searchedUser != "" &&
          typeof searchedUser === "object" &&
          searchedUser !== null ? (
            <>
              <div className={styles.searchedUser}>
                {searchedUser.nickname ? (
                  <p>{searchedUser.nickname}</p>
                ) : (
                  <p>Maxt felhasználó</p>
                )}
                <button
                  id={searchedUser.id}
                  onClick={(e) => {
                    setIsSender(true);
                    setSenderId(searchedUser.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              {" "}
              <h1>Nem találtunk senkit.</h1>
            </>
          )}
        </div>
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
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </div>
      <div className={styles.searchWrapper}>
        <h3>Keresés felhasználói ID szerint</h3>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={() => {
              searchForUser(search);
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
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.idWrapper}>
        {showId ? (
          <>
            <p>{router.query.userId}</p>
            <button
              onClick={() => {
                setShowId((prev) => !prev);
              }}
            >
              Rejtsd el az ID-m
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setShowId((prev) => !prev);
            }}
          >
            Mutasd az ID-m
          </button>
        )}
      </div>
      <div className={styles.contacts}>
        {searchedUser != undefined &&
        searchedUser != "" &&
        typeof searchedUser === "object" &&
        searchedUser !== null ? (
          <>
            <div className={styles.searchedUser}>
              {searchedUser.nickname ? (
                <p>{searchedUser.nickname}</p>
              ) : (
                <p>Maxt felhasználó</p>
              )}
              <button
                id={searchedUser.id}
                onClick={(e) => {
                  setIsSender(true);
                  setSenderId(searchedUser.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Osztálytársak</h1>
            {classMates.map((classMate, i) => {
              return (
                <div className={styles.classmate} key={i}>
                  {classMate.nickname ? (
                    <p>{classMate.nickname}</p>
                  ) : (
                    <p>Maxt felhasználó</p>
                  )}
                  <button
                    id={classMate.id}
                    onClick={(e) => {
                      setIsSender(true);
                      setSenderId(e.target.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
