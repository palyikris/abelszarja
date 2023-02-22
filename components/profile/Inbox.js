import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoaderPage from "./../../ui/Loader";
import { getUserData } from "../../lib/userData/firebase";
import InboxContentPage from "./InboxContent";
import InboxSenderPage from "./InboxSender";
import styles from "../../styles/inbox/style.module.css";

export default function InboxPage() {
  let router = useRouter();
  let [inbox, setInbox] = useState();
  let [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    try {
      fetchInbox().then((data) => {
        setInbox(data);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <InboxContentPage inbox={inbox}></InboxContentPage>
      <InboxSenderPage></InboxSenderPage>
    </div>
  );
}
