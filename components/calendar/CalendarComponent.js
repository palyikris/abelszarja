import Calendar from "react-calendar";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/calendar/style.module.css";
import DetailComponent from "./Detail";
import CalendarPage from "./Calendar";

export default function CalendarComponent(props) {
  let router = useRouter();
  return (
    <div className={styles.container}>
      <CalendarPage></CalendarPage>
      <DetailComponent></DetailComponent>
    </div>
  );
}
