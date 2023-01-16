import CustomHead from "./../../../ui/CustomHead";
import Topnav from "./../../../ui/topnav";
import { useRouter } from "next/router";
import CalendarComponent from "../../../components/calendar/CalendarComponent";
import styles from "../../../styles/calendar/style.module.css";

export default function CalendarPage() {
  let router = useRouter();

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Calendar"
        description="Maxt Calendar Page."
        keywords="maxt, calendar"
      ></CustomHead>
      <Topnav userId={router.query.userId}></Topnav>
      <CalendarComponent></CalendarComponent>
      <div className={styles.background}></div>
    </div>
  );
}
