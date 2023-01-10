import Calendar from "react-calendar";
import { useState, useRef } from "react";
import { AddZero } from "../../lib/addZero";

export default function CalendarComponent(props) {
  let calendarValue = new Date();
  let ref = useRef();

  return (
    <div>
      <Calendar
        onChange={(value) => {
          calendarValue = value;
        }}
        onClickDay={(value) => {
          calendarValue = value;
          console.log(
            `${calendarValue.getFullYear()}/${AddZero(
              calendarValue.getMonth() + 1
            )}/${AddZero(calendarValue.getDate())}`
          );
        }}
        inputRef={ref}
      ></Calendar>
    </div>
  );
}
