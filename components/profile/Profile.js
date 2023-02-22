import styles from "../../styles/profilepagecomponent/style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import IntroPage from "./Intro";
import ProfileDataPage from "./ProfileData";
import InboxPage from "./Inbox";

export default function ProfilePageComponent() {
  return (
    <div className={styles.container}>
      <IntroPage></IntroPage>
      <ProfileDataPage></ProfileDataPage>
      <InboxPage></InboxPage>
    </div>
  );
}
