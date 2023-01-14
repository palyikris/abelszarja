import styles from "../../styles/profilepagecomponent/style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ProfilePageComponent() {
  let [userClass, setUserClass] = useState("");
  let [nickname, setNickname] = useState("");
  let router = useRouter();

  async function handleSubmit() {
    let response = await fetch("/api/user/uploadUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: router.query.userId,
        userClass: userClass,
        nickname: nickname
      })
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <div className={styles.text}>
          <h1>Hello.</h1>
          <h4>
            This is your Maxt profile page. Adjust your settings here to
            maximize your Maxt experience!
          </h4>
        </div>
        <div className={styles.svgWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
            <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
            <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
          </svg>
        </div>
      </div>
      <div className={styles.profileData}>
        <div className={styles.titleWrapper}>
          <h1>Your data.</h1>
          <div className={styles.pic}></div>
        </div>
        <form className={styles.datas} onSubmit={handleSubmit}>
          <div className={styles.data}>
            <label htmlFor="">Class</label>
            <input
              type="text"
              placeholder="Enter your class..."
              value={userClass}
              onChange={(e) => {
                setUserClass(e.target.value);
              }}
            />
          </div>
          <div className={styles.data}>
            <label htmlFor="">Nickname</label>
            <input
              type="text"
              placeholder="Enter your nickname..."
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </div>
          <div className={styles.data}>
            <button>OK</button>
          </div>
        </form>
      </div>
    </div>
  );
}
