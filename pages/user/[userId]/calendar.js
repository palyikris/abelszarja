import CustomHead from "./../../../ui/CustomHead";
import Topnav from "./../../../ui/topnav";
import { useRouter } from "next/router";
import CalendarComponent from "../../../components/calendar/CalendarComponent";
import styles from "../../../styles/calendar/style.module.css";
import AnimatedBackgroundPage from "./../../../ui/animatedBackground";
import { getAllUserId, getUserData } from "../../../lib/userData/firebase";
import axios from "axios";
import cheerio from "cheerio";
import LoaderPage from "./../../../ui/Loader";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { AddZero } from "../../../lib/AddZero";

export default function CalendarPage(props) {
  let [isLoading, setIsLoading] = useState(true);
  let { logout, user } = useAuth();
  let router = useRouter();

  async function handlePageRevalidation() {
    try {
      let userData = await getUserData(router.query.userId);
      let date = new Date();
      let formattedDate = `${date.getFullYear()}.${AddZero(
        date.getMonth() + 1
      )}.${AddZero(date.getDate())}`;
      if (userData.calendarLastRevalidated) {
        if (userData.calendarLastRevalidated != formattedDate) {
          let response = await fetch("/api/revalidate", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: router.query.userId,
              path: `/user/${router.query.userId}/calendar`
            })
          });
        }
      } else {
        let response = await fetch("/api/revalidate", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: router.query.userId,
            path: `/user/${router.query.userId}/calendar`
          })
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user.id != router.query.userId) {
      logout();
    } else {
      setIsLoading(false);
    }
    handlePageRevalidation();
  }, []);

  if (isLoading || router.isFallback) {
    return <LoaderPage />;
  }

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Naptár"
        description="Maxt Calendar Page."
        keywords="maxt, calendar"
      />
      <Topnav userId={router.query.userId} />
      <div className={styles.noPhone}>
        <h1>Sajnáljuk, de a naptár funckió telefonnal nem használható.</h1>
      </div>
      <CalendarComponent
        todayPageData={props.todayPageData}
        tomorrowPageData={props.tomorrowPageData}
      />
      <AnimatedBackgroundPage />
    </div>
  );
}

export async function getStaticPaths() {
  let response = await getAllUserId();
  let paths = response.map(path => ({
    params: {
      userId: path.id
    }
  }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps() {
  try {
    const { data } = await axios.get("https://apps.karinthy.hu/helyettesites/");
    const $ = cheerio.load(data);

    return {
      props: {
        todayPageData: $(".live.today tbody").text(),
        tomorrowPageData: $(".live.tomorrow tbody").text()
      },
      revalidate: 1
    };
  } catch (error) {
    return {
      props: {
        todayPageData: [],
        tomorrowPageData: [],
        error: error.message
      },
      revalidate: 3
    };
  }
}
