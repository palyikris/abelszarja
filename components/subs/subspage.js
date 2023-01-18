/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { getSubLines } from "./../../lib/subs/GetSubLines";
import styles from "../../styles/subscomponent/style.module.css";
import { useRouter } from "next/router";
import { getUserData } from "../../lib/userData/firebase";
import LoaderPage from "./../../ui/Loader";
import { GetKossuthSubLines } from "./../../lib/subs/GetKossuthSubLines";

export default function SubsPageComponent(props) {
  let { todayPageData, tomorrowPageData, error } = props.props;
  let lines = [];
  let [isTodaySubs, setIsTodaySubs] = useState(true);
  let [userClass, setUserClass] = useState("");
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);
  let [userSchool, setUserSchool] = useState("");

  useEffect(() => {
    getUserData(router.query.userId).then((data) => {
      if (data.userClass && data.userClass != "") {
        setUserClass(data.userClass);
      }
      if (data.school) {
        setUserSchool(data.school);
      }
      setIsLoading(false);
    });
  }, []);

  if (error) {
    return (
      <div className={styles.tableWrapperWrapper}>
        <h2>An error happened</h2>
        <h5>{error}</h5>
      </div>
    );
  } else {
    if (isLoading) {
      return (
        <div className={styles.tableWrapperWrapper}>
          <LoaderPage></LoaderPage>
        </div>
      );
    }
    if (
      userSchool === "" ||
      userSchool === undefined ||
      userSchool === "Karinthy"
    ) {
      if (userClass != "") {
        let userClassNumber = userClass.split(".")[0];
        let userClassLetter = userClass.split(".")[1];
        if (isTodaySubs) {
          lines = getSubLines(todayPageData);
          lines.map((line, i) => {
            if (
              line.class.split(".")[0] != userClassNumber ||
              !line.class
                .trim()
                .toLowerCase()
                .split(".")[1]
                .includes(userClassLetter.trim().toLowerCase()) ||
              (userClassLetter === "B" &&
                line.class.trim().toUpperCase().split(".")[1] === "IB")
            ) {
              delete lines[i];
            }
          });
        } else {
          lines = getSubLines(tomorrowPageData);
          lines.map((line, i) => {
            if (
              line.class.split(".")[0] != userClassNumber ||
              !line.class
                .trim()
                .toLowerCase()
                .split(".")[1]
                .includes(userClassLetter.trim().toLowerCase())
            ) {
              delete lines[i];
            }
          });
        }
      } else {
        if (isTodaySubs) {
          lines = getSubLines(todayPageData);
        } else {
          lines = getSubLines(tomorrowPageData);
        }
      }
    } else {
      lines = [];
      let { kossuthData } = props.props;
      lines = GetKossuthSubLines(kossuthData);
    }
  }
  if (userSchool === "Kossuth") {
    return (
      <div className={styles.container}>
        {/* <div className={styles.controls}>
          <div className={styles.titleWrapper}>
            <h1>Helyettesítések.</h1>
          </div>
          <div className={styles.classWrapper}>
            <label htmlFor="">Osztályok</label>
            <select
              onChange={(e) => {
                setUserClass(e.target.value);
              }}
              defaultValue={userClass.toUpperCase()}
            >
              <option value="">Minden osztály</option>
              <option value="9.AK">9.Akny</option>
              <option value="9.BK">9.Bkny</option>
              <option value="9.CK">9.Ckny</option>
              <option value="9.D">9.D</option>
              <option value="9.EK">9.Ekny</option>
              <option value="9.A">9.A</option>
              <option value="9.B">9.B</option>
              <option value="9.C">9.C</option>
              <option value="10.D">10.D</option>
              <option value="9.E">9.E</option>
              <option value="10.A">10.A</option>
              <option value="10.B">10.B</option>
              <option value="10.C">10.C</option>
              <option value="11.D">11.D</option>
              <option value="10.E">10.E</option>
              <option value="11.A">11.A</option>
              <option value="11.B">11.B</option>
              <option value="11.C">11.C</option>
              <option value="12.D">12.D</option>
              <option value="11.E">11.E</option>
              <option value="11.IB">11.IB</option>
              <option value="12.A">12.A</option>
              <option value="12.B">12.B</option>
              <option value="12.C">12.C</option>
              <option value="12.E">12.E</option>
              <option value="12.IB">12.IB</option>
            </select>
          </div>
          {userSchool === "Kossuth" ? (
            <></>
          ) : (
            <div className={styles.dayChangeButtonWrapper}>
              {isTodaySubs ? (
                <button
                  onClick={() => {
                    setIsTodaySubs(false);
                  }}
                >
                  Holnapi helyettesítések
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsTodaySubs(true);
                  }}
                >
                  Mai helyettesítések
                </button>
              )}
            </div>
          )}
        </div> */}
        {lines.length === 0 ? (
          <>
            <div className={styles.text}>
              <h1>Nincsenek helyettesítéseks</h1>
            </div>
          </>
        ) : (
          <div className={styles.tableWrapperWrapper}>
            <div className={styles.tableWrapper}>
              <div className={styles.table}>
                <div className={styles.thead}>
                  <div className={styles.tr}>
                    <div className={styles.td}>
                      <div>Osztály</div>
                    </div>
                    <div className={styles.td}>
                      <div>Tárgy</div>
                    </div>
                    <div className={styles.td}>
                      <div>Dátum</div>
                    </div>
                    <div className={styles.td}>
                      <div>Nap</div>
                    </div>
                    <div className={styles.td}>
                      <div>Óra</div>
                    </div>
                    <div className={styles.td}>
                      <div>Terem</div>
                    </div>
                    <div className={styles.td}>
                      <div>Aki nincs</div>
                    </div>
                    <div className={styles.td}>
                      <div>Aki lesz</div>
                    </div>
                    <div className={styles.td}>
                      <div>Megjegyzés</div>
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
                            <div> {line.date}</div>
                          </div>
                          <div className={styles.td}>
                            <div> {line.day}</div>
                          </div>
                          <div className={styles.td}>
                            <div> {line.classNumber}</div>
                          </div>
                          <div className={styles.td}>
                            <div> {line.room}</div>
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

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.titleWrapper}>
          <h1>Helyettesítések.</h1>
        </div>
        <div className={styles.classWrapper}>
          <label htmlFor="">Osztályok</label>
          <select
            onChange={(e) => {
              setUserClass(e.target.value);
            }}
            defaultValue={userClass.toUpperCase()}
          >
            <option value="">Minden osztály</option>
            <option value="9.AK">9.Akny</option>
            <option value="9.BK">9.Bkny</option>
            <option value="9.CK">9.Ckny</option>
            <option value="9.D">9.D</option>
            <option value="9.EK">9.Ekny</option>
            <option value="9.A">9.A</option>
            <option value="9.B">9.B</option>
            <option value="9.C">9.C</option>
            <option value="10.D">10.D</option>
            <option value="9.E">9.E</option>
            <option value="10.A">10.A</option>
            <option value="10.B">10.B</option>
            <option value="10.C">10.C</option>
            <option value="11.D">11.D</option>
            <option value="10.E">10.E</option>
            <option value="11.A">11.A</option>
            <option value="11.B">11.B</option>
            <option value="11.C">11.C</option>
            <option value="12.D">12.D</option>
            <option value="11.E">11.E</option>
            <option value="11.IB">11.IB</option>
            <option value="12.A">12.A</option>
            <option value="12.B">12.B</option>
            <option value="12.C">12.C</option>
            <option value="12.E">12.E</option>
            <option value="12.IB">12.IB</option>
          </select>
        </div>
        {userSchool === "Kossuth" ? (
          <></>
        ) : (
          <div className={styles.dayChangeButtonWrapper}>
            {isTodaySubs ? (
              <button
                onClick={() => {
                  setIsTodaySubs(false);
                }}
              >
                Holnapi helyettesítések
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsTodaySubs(true);
                }}
              >
                Mai helyettesítések
              </button>
            )}
          </div>
        )}
      </div>
      {lines.length === 0 ? (
        <>
          <div className={styles.text}>
            <h1>Nincsenek helyettesítéseks</h1>
          </div>
        </>
      ) : (
        <div className={styles.tableWrapperWrapper}>
          <div className={styles.tableWrapper}>
            <div className={styles.table}>
              <div className={styles.thead}>
                <div className={styles.tr}>
                  <div className={styles.td}>
                    <div>Osztály</div>
                  </div>
                  <div className={styles.td}>
                    <div>Tárgy</div>
                  </div>
                  <div className={styles.td}>
                    <div>Óra</div>
                  </div>
                  <div className={styles.td}>
                    <div>Terem</div>
                  </div>
                  <div className={styles.td}>
                    <div>Aki nincs</div>
                  </div>
                  <div className={styles.td}>
                    <div>Aki lesz</div>
                  </div>
                  <div className={styles.td}>
                    <div>Megjegyzés</div>
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
