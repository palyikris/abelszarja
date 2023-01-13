/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import cheerio from "cheerio";
import { getSubLines } from "../../../lib/subs/GetSubLines";
import { useState } from "react";
import styles from "../../../styles/subs/style.module.css";
import CustomHead from "./../../../ui/CustomHead";

export default function SubsPage(props) {
  let { todayPageData, tomorrowPageData, error } = props;
  let lines = [];
  let [isTodaySubs, setIsTodaySubs] = useState(true);
  let [userClass, setUserClass] = useState("");

  if (error) {
    return (
      <div className={styles.tableWrapperWrapper}>
        <CustomHead
          title="Maxt Substitutions"
          description="Maxt Substitutions Page for Maxt users."
          keywords="maxt, substitutions"
        ></CustomHead>
        <h2>An error happened</h2>
        <h5>{error}</h5>
      </div>
    );
  } else {
    if (userClass != "") {
      if (isTodaySubs) {
        lines = getSubLines(todayPageData);
        lines = lines.filter((line) =>
          line.class
            .trim()
            .toLowerCase()
            .includes(userClass.trim().toLowerCase())
        );
      } else {
        lines = getSubLines(tomorrowPageData);
        lines = lines.filter((line) =>
          line.class
            .trim()
            .toLowerCase()
            .includes(userClass.trim().toLowerCase())
        );
      }
    } else {
      if (isTodaySubs) {
        lines = getSubLines(todayPageData);
      } else {
        lines = getSubLines(tomorrowPageData);
      }
    }
  }

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Substitutions"
        description="Maxt Substitutions Page for Maxt users."
        keywords="maxt, substitutions"
      ></CustomHead>
      <div className={styles.controls}>
        <div className={styles.titleWrapper}>
          <h1>Substitutions.</h1>
        </div>
        <div className={styles.classWrapper}>
          <label htmlFor="">Your class</label>
          <input
            type="text"
            placeholder="Enter your class"
            onChange={(e) => {
              setUserClass(e.target.value);
            }}
          />
        </div>
        <div className={styles.dayChangeButtonWrapper}>
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
      </div>
      {lines.length === 0 ? (
        <>
          <div className={styles.tableWrapperWrapper}>
            <h1>There are no such substitutions</h1>
          </div>
        </>
      ) : (
        <div className={styles.tableWrapperWrapper}>
          <div className={styles.tableWrapper}>
            <div className={styles.table}>
              <div className={styles.thead}>
                <div className={styles.tr}>
                  <div className={styles.td}>
                    <div>Class</div>
                  </div>
                  <div className={styles.td}>
                    <div>Subject</div>
                  </div>
                  <div className={styles.td}>
                    <div>Class Number</div>
                  </div>
                  <div className={styles.td}>
                    <div>Room Number</div>
                  </div>
                  <div className={styles.td}>
                    <div>Subsituted Teacher</div>
                  </div>
                  <div className={styles.td}>
                    <div>Substitute Teacher</div>
                  </div>
                  <div className={styles.td}>
                    <div>Note</div>
                  </div>
                </div>
              </div>
              <div className={styles.sep}></div>
              <div className={styles.tbody}>
                {lines.map((line, i) => {
                  return (
                    <div key={i}>
                      <div style={styles.tr}>
                        <div className={styles.td}>
                          <div>{line.class}</div>
                        </div>
                        <div className={styles.td}>
                          <div> {line.subject}</div>
                        </div>
                        <div className={styles.td}>
                          <div> {line.classNumber}</div>
                        </div>
                        <div className={styles.td}>
                          <div> {line.roomNumber}</div>
                        </div>
                        <div className={styles.td}>
                          <div> {line.substitutedTeacher}</div>
                        </div>
                        <div className={styles.td}>
                          <div> {line.substituteTeacher}</div>
                        </div>
                        <div className={styles.td}>
                          <div> {line.note}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
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
