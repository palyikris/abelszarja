import CustomHead from "./../../../ui/CustomHead";
import Topnav from "./../../../ui/topnav";
import ProfilePageComponent from "./../../../components/profile/Profile";
import AnimatedBackgroundPage from "./../../../ui/animatedBackground";
import styles from "../../../styles/profile/style.module.css";
import { useRouter } from "next/router";

export default function ProfilePage() {
  let router = useRouter();

  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Profile"
        description="Maxt Profile Page for Maxt users."
        keywords="maxt, profile"
      ></CustomHead>
      <Topnav userId={router.query.userId}></Topnav>
      <ProfilePageComponent></ProfilePageComponent>
      <AnimatedBackgroundPage></AnimatedBackgroundPage>
    </div>
  );
}
