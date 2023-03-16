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
import { getAllUserData, getAllUserId, getUserData } from "../../../lib/userData/firebase";
import { getSubLines } from "./../../../lib/subs/GetSubLines";
import { collection } from "firebase/firestore";
import { db } from "./../../../firebaseConfig";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useSubsContext } from "../../../context/SubsContext";
import {AddZero} from "../../../lib/AddZero"

export default function SubsPage(props) {
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);
  let { logout, user } = useAuth();
  let date = new Date();
  date.getDate() + 1;

  async function handlePageRevalidation(){
    try {
      let userData = await getUserData(router.query.userId);
      let date  = new Date()
        let formattedDate = `${date.getFullYear()}.${AddZero(date.getMonth() + 1)}.${AddZero(date.getDate())}`
      if(userData.subsLastRevalidated){
        if(userData.subsLastRevalidated != formattedDate){
          let response = await fetch("/api/revalidate", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: router.query.userId,
              path: `/user/${router.query.userId}/subs`
            })
          })
        }
      }
      else{
        let response = await fetch("/api/revalidate", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: router.query.userId,
            path: `/user/${router.query.userId}/subs`
          })
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user.id != router.query.userId) {
      logout();
    } else {
      setIsLoading(false);
    }

    handlePageRevalidation()
  }, []);

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Helyettesítés"
        description="Maxt Substitutions Page for Maxt users."
        keywords="maxt, substitutions"
      ></CustomHead>
      <Topnav userId={router.query.userId}></Topnav>
      {isLoading || router.isFallback ? (
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

export async function getStaticPaths() {
  let response = await getAllUserId();
  let paths = response.map((path) => ({
    params: {
      userId: path.id
    }
  }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps() {
  try {
    const { data } = await axios.get("https://apps.karinthy.hu/helyettesites/");
    const $ = cheerio.load(data);

    return {
      props: {
        todayPageData: $(".live.today tbody").text(),
        tomorrowPageData: $(".live.tomorrow tbody").text()
      },
      revalidate: 3
    };
  } catch (error) {
    return {
      props: {
        todayPageData: [],
        tomorrowPageData: [],
        error: error.message
      },
      revalidate: 1
    };
  }
}
