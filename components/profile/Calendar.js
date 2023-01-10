import Calendar from "react-calendar";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CalendarComponent(props) {
  let calendarValue = new Date();
  let ref = useRef();
  let router = useRouter();

  function AddZero(num) {
    num = parseInt(num);
    console.log(num);
    if (num < 10) {
      num = "0" + num.toString();
      return num;
    } else {
      return num;
    }
  }

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
      <Link href="/subs">Subs</Link>
    </div>
  );
}
