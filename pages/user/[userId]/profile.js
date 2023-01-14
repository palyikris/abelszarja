import CustomHead from "./../../../ui/CustomHead";
import Topnav from "./../../../ui/topnav";
import ProfilePageComponent from "./../../../components/profile/Profile";
import AnimatedBackgroundPage from "./../../../ui/animatedBackground";
import styles from "../../../styles/profile/style.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <CustomHead
        title="Maxt Profile"
        description="Maxt Profile Page for Maxt users."
        keywords="maxt, profile"
      ></CustomHead>
      <Topnav></Topnav>
      <ProfilePageComponent></ProfilePageComponent>
      <AnimatedBackgroundPage></AnimatedBackgroundPage>
    </div>
  );
}
