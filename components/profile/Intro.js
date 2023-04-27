import styles from "../../styles/profileIntro/style.module.css";
import UserClasses from './UserClasses';

export default function IntroPage() {
  return (
    <>
      <div className={styles.intro}>
        <div className={styles.text}>
          <h1>Hello.</h1>
          <h4>
            Ez itt a Maxt pofilod oldala. Ha lejjebb görgetsz, beállíthatsz pár
            dolgot, ami segít kimaxolni a Maxt élményt
          </h4>
        </div>
        <UserClasses></UserClasses>
      </div>
    </>
  );
}
