/* eslint-disable react/no-unescaped-entities */
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
  let [subs, setSubs] = useState();
  let date = new Date();
  date.getDate() + 1;

  async function revalidatePage(){
    let response = await fetch("/api/revalidate", {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      }
    })

    response = await response.json()
    return response
  }

  useEffect(() => {
    if (user.id != router.query.userId) {
      logout();
    } else {
      revalidatePage().then((data) => {
        setSubs(data)
        setIsLoading(false);
      })
    }
  }, []);

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Helyettesítés"
        description="Maxt Substitutions Page for Maxt users."
        keywords="maxt, substitutions"
      ></CustomHead>
      <Topnav userId={router.query.userId}></Topnav>
      {isLoading || router.isFallback || subs === undefined ? (
        <>
          <LoaderPage></LoaderPage>
        </>
      ) : (
        <>
          <SubsPageComponent props={subs}></SubsPageComponent>
          <AnimatedBackgroundPage></AnimatedBackgroundPage>
        </>
      )}
    </div>
  );
}


