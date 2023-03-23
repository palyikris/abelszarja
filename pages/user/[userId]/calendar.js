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
  let [subs, setSubs] = useState();
  let { logout, user } = useAuth();
  let router = useRouter();

  async function revalidatePage() {
    let response = await fetch("/api/revalidate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    response = await response.json();
    return response;
  }

  useEffect(() => {
    if (user.id != router.query.userId) {
      logout();
    } else {
      revalidatePage().then(data => {
        setSubs(data);
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading || router.isFallback || subs === undefined) {
    return (
      <>
        <CustomHead
          title="Maxt Naptár"
          description="Maxt Calendar Page."
          keywords="maxt, calendar"
        />
        <Topnav userId={router.query.userId} />
        <LoaderPage />
      </>);
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
        todayPageData={subs.todayPageData}
        tomorrowPageData={subs.tomorrowPageData}
      />
      <AnimatedBackgroundPage />
    </div>
  );
}
