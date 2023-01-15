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
          <SubsPageComponent props={props}></SubsPageComponent>
          <AnimatedBackgroundPage></AnimatedBackgroundPage>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get("https://apps.karinthy.hu/helyettesites/");
    const $ = cheerio.load(data);

    const kossuthData = await (
      await axios.get("http://fenyujsag.klgbp.hu")
    ).data;
    const kossuth = cheerio.load(kossuthData);
    return {
      props: {
        todayPageData: $(".live.today tbody").text(),
        tomorrowPageData: $(".live.tomorrow tbody").text(),
        kossuthData: kossuth(".tartalom:nth-child(2)").text()
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
