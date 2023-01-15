import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/profileData/style.module.css";
import ProfilePicPage from "./ProfilePic";
import LoaderPage from "./../../ui/Loader";

export default function ProfileDataPage() {
  let [userClass, setUserClass] = useState("");
  let [nickname, setNickname] = useState("");
  let [school, setSchool] = useState("");
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);
  let [file, setFile] = useState();

  useEffect(() => {
    loadUserData()
      .then((data) => {
        if (data) {
          setUserClass(data.userClass);
          setNickname(data.nickname);
          setSchool(data.school);
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  async function loadUserData() {
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

    return response.message;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await fetch("/api/user/handleUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: router.query.userId,
          userClass: userClass,
          nickname: nickname,
          school: school
        })
      });
      setIsLoading(false);
    } catch (error) {}
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileData}>
        <ProfilePicPage></ProfilePicPage>
        <form className={styles.datas} onSubmit={handleSubmit}>
          {isLoading ? (
            <>
              <LoaderPage></LoaderPage>
            </>
          ) : (
            <div className={styles.dataWrapper}>
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
                <label htmlFor="">School</label>
                <select
                  name=""
                  id=""
                  value={school}
                  onChange={(e) => {
                    setSchool(e.target.value);
                  }}
                >
                  <option value="">Válassz susut!</option>
                  <option value="Karinthy">Karinthy</option>
                  <option value="Kossuth">Kossuth</option>
                </select>
              </div>
            </div>
          )}
          <div className={styles.dataButton}>
            <button type="submit">OK</button>
          </div>
        </form>
      </div>
    </div>
  );
}
