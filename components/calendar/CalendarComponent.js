import Calendar from "react-calendar";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import DetailComponent from "./Detail";
import CalendarPage from "./Calendar";
import styles from "../../styles/calendarpcomponent/style.module.css";

export default function CalendarComponent(props) {
  let router = useRouter();
  return (
    <div className={styles.container}>
      <DetailComponent></DetailComponent>
      <CalendarPage></CalendarPage>
    </div>
  );
}
