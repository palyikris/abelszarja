import AuthForm from "../components/auth/AuthForm";
import CustomHead from "./../ui/CustomHead";

export default function LoginPage() {
  return (
    <div>
      <CustomHead
        title="Maxt Signup"
        description="Maxt Signup Page for Maxt users."
        keywords="maxt, signup"
      ></CustomHead>
      <AuthForm isLogin={false}></AuthForm>
    </div>
  );
}
