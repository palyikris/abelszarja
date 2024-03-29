import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoaderPage from "../../ui/Loader";
import styles from "../../styles/userclasses/style.module.css";
import userClasses from "../../lib/subjects/userclasses";

export default function UserClasses() {
  let [subjects, setSubjects] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let router = useRouter();
  let days = [
    "Vasárnap",
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat"
  ];
  let date = new Date();
  let dayNumber = date.getDay();

  async function getUserSubjects() {
    try {
      let response = await fetch("/api/user/handleUserSubjects", {
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
      data.push([]);
      data.unshift([]);
      return data;
    } catch (error) {
      return error.message;
    }
  }

  useEffect(() => {
    getUserSubjects().then(data => {
      let date = new Date();
      let hour = date.getHours();
      let dayNumber = date.getDay();
      dayNumber = dayNumber;
      let todaySubjects;
      if (data[dayNumber].length === 0) {
        todaySubjects = userClasses(data[dayNumber]);
      } else {
        todaySubjects = userClasses(data[dayNumber]);
        let lastSubjectStart = parseInt(
          todaySubjects[todaySubjects.length - 1].timeStart.split(":")[0]
        );
        if (hour > lastSubjectStart) {
          dayNumber += 1;
          todaySubjects = userClasses(data[dayNumber]);
        }
      }

      setSubjects(todaySubjects);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoaderPage />;
  }

  if (subjects.length === 0) {
    return (
      <div className={styles.noClassContainer}>
        <h3>
          Nap: {days[dayNumber]}
        </h3>
        <h1>Ma nincsenek órák!</h1>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3>
        Nap: {days[dayNumber]}
      </h3>
      <div className={styles.container}>
        {subjects.map((subject, i) => {
          let date = new Date();
          let hour = date.getHours();
          let timeStart = parseInt(subject.timeStart.split()[0]);

          if (hour === timeStart) {
            return (
              <div
                key={i}
                className={`${styles.subject} ${styles.currSubject}`}
              >
                <p>
                  {subject.name}
                </p>
                <p>
                  {subject.room} {subject.teacher}
                </p>
                <p>
                  {subject.timeStart} - {subject.timeEnd}
                </p>
              </div>
            );
          }

          return (
            <div key={i} className={styles.subject}>
              <p>
                {subject.name}
              </p>
              <p>
                {subject.room} {subject.teacher}
              </p>
              <p>
                {subject.timeStart} - {subject.timeEnd}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
