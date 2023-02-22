import { useAuth } from "./../context/AuthContext";
import AnimatedBackgroundPage from "./../ui/animatedBackground";
import Topnav from "./../ui/topnav";
import ErrorsPageComponent from "./../components/errorspage/ErrorsPage";
import CustomHead from "./../ui/CustomHead";

export default function ErrorsPage() {
  let { user } = useAuth();
  console.log(user);
  return (
    <>
      <CustomHead
        title="Hibakezelő"
        description="Handling page for error submissions"
        keywords="error, handling"
      ></CustomHead>
      <Topnav userId={user.id}></Topnav>
      <ErrorsPageComponent></ErrorsPageComponent>
      <AnimatedBackgroundPage></AnimatedBackgroundPage>
    </>
  );
}
