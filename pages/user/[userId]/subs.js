/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import cheerio from "cheerio";
import { getSubLines } from "../../../lib/subs/GetSubLines";
import { useState } from "react";

export default function SubsPage(props) {
  let { todayPageData, tomorrowPageData, error } = props;
  let lines = [];
  let [isTodaySubs, setIsTodaySubs] = useState(true);
  let [userClass, setUserClass] = useState("");

  if (error) {
    return (
      <>
        <h2>An error happened</h2>
        <h5>{error}</h5>
      </>
    );
  } else {
    if (isTodaySubs) {
      lines = getSubLines(todayPageData);
    } else {
      lines = getSubLines(tomorrowPageData);
    }
    if (userClass != "") {
      lines = lines.filter((line) =>
        line.class.trim().toLowerCase().includes(userClass.trim().toLowerCase())
      );
    }
  }
  if (lines.length === 0) {
    return (
      <div>
        <div>
          <label htmlFor="">Your class</label>
          <input
            type="text"
            placeholder="Enter your class"
            onChange={(e) => {
              setUserClass(e.target.value);
            }}
          />
        </div>
        <div>
          {isTodaySubs ? (
            <button
              onClick={() => {
                setIsTodaySubs(false);
              }}
            >
              See tomorrow's substitutes
            </button>
          ) : (
            <button
              onClick={() => {
                setIsTodaySubs(true);
              }}
            >
              See today's substitutes
            </button>
          )}
        </div>
        <h2>There are no substitutions this day.</h2>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div>
          <label htmlFor="">Your class</label>
          <input
            type="text"
            placeholder="Enter your class"
            onChange={(e) => {
              setUserClass(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        {isTodaySubs ? (
          <button
            onClick={() => {
              setIsTodaySubs(false);
            }}
          >
            See tomorrow's substitutes
          </button>
        ) : (
          <button
            onClick={() => {
              setIsTodaySubs(true);
            }}
          >
            See today's substitutes
          </button>
        )}
      </div>
      {lines.map((line, i) => {
        return (
          <div key={i}>
            <h4>{line.subject}</h4>
            <p>{`${line.classNumber}, ${line.roomNumber}, ${line.class}, ${line.substituteTeacher}, ${line.substitutedTeacher}`}</p>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get("https://apps.karinthy.hu/helyettesites/");
    const $ = cheerio.load(data);
    return {
      props: {
        todayPageData: $(".live.today tbody").text(),
        tomorrowPageData: $(".live.tomorrow tbody").text()
      }
    };
  } catch (error) {
    return {
      props: {
        todayPageData: [],
        tomorrowPageData: [],
        error: error.message
      }
    };
  }
}
