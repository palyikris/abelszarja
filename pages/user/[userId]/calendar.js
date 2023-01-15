import CustomHead from "./../../../ui/CustomHead";
import Topnav from "./../../../ui/topnav";
import { useRouter } from "next/router";

export default function CalendarPage() {
  let router = useRouter();

  return (
    <div>
      <CustomHead
        title="Maxt Calendar"
        description="Maxt Calendar Page."
        keywords="maxt, calendar"
      ></CustomHead>
      <Topnav userId={router.query.userId}></Topnav>
    </div>
  );
}
