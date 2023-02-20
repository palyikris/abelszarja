import { useRouter } from "next/router";
import CalendarPage from "./Calendar";
import styles from "../../styles/calendarpcomponent/style.module.css";
import { getSubs } from "../../lib/calendar/firebase";
import { useEffect, useState } from "react";

export default function CalendarComponent(props) {
  return (
    <div className={styles.container}>
      <CalendarPage
        todayPageData={props.todayPageData}
        tomorrowPageData={props.tomorrowPageData}
      ></CalendarPage>
    </div>
  );
}
