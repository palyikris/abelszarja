import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoaderPage from "./../../ui/Loader";
import styles from "../../styles/calendardetail/style.module.css";

export default function DetailComponent(props) {
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);
  let [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    loadUserNickname()
      .then((data) => {
        setUserNickname(data);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  async function loadUserNickname() {
    let response = await fetch("/api/user/handleUserData", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: router.query.userId
      })
    });

    response = await response.json();

    return response.message.nickname;
  }

  if (isLoading) {
    return (
      <>
        <LoaderPage></LoaderPage>
      </>
    );
  }

  return (
    <div className={styles.container}>
      {userNickname === "" || userNickname === undefined ? (
        <>
          <h1>Maxt User</h1>
        </>
      ) : (
        <h1>{userNickname}</h1>
      )}
    </div>
  );
}
