/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import cheerio from "cheerio";
import styles from "../../../styles/subs/style.module.css";
import CustomHead from "./../../../ui/CustomHead";
import Topnav from "../../../ui/topnav";
import SubsPageComponent from "../../../components/subs/subspage";
import { useRouter } from "next/router";
import AnimatedBackgroundPage from "../../../ui/animatedBackground";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./../../../context/AuthContext";
import LoaderPage from "./../../../ui/Loader";

export default function SubsPage(props) {
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);
  let { logout, user } = useAuth();
  console.log(props.data);

  useEffect(() => {
    if (user.id != router.query.userId) {
      logout();
    } else {
      setIsLoading(false);
    }
  });

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Substitutions"
        description="Maxt Substitutions Page for Maxt users."
        keywords="maxt, substitutions"
      ></CustomHead>
      <Topnav userId={router.query.userId}></Topnav>
      {isLoading ? (
        <>
          <LoaderPage></LoaderPage>
        </>
      ) : (
        <>
          <AnimatedBackgroundPage></AnimatedBackgroundPage>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(
      "https://kisnaplo.karinthy.hu/app/interface.php?view=v_roomplan&day=2023-01-17&week=2023W03&KSNPLSID=q6rah6jta8g82jbocqc71se6el"
    );
    const $ = cheerio.load(data);

    return {
      props: {
        data: $("div:nth-child(1) div").text()
      }
    };
  } catch (error) {
    return {
      props: {
        data: [],
        error: error.message
      }
    };
  }
}
