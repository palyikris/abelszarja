import DetailComponent from "../../../components/profile/Detail";
import CalendarComponent from "../../../components/profile/Calendar";
import CustomHead from "./../../../ui/CustomHead";

export default function CalendarPage() {
  return (
    <div>
      <CustomHead
        title="Maxt Calendar"
        description="Maxt Calendar Page."
        keywords="maxt, calendar"
      ></CustomHead>
      <DetailComponent></DetailComponent>
      <CalendarComponent></CalendarComponent>
    </div>
  );
}
