import AuthForm from "../components/auth/AuthForm";
import CustomHead from "./../ui/CustomHead";

export default function LoginPage() {
  return (
    <div>
      <CustomHead
        title="Maxt Login"
        description="Maxt Login Page for Maxt users."
        keywords="maxt, login"
      ></CustomHead>
      <AuthForm isLogin={true}></AuthForm>
    </div>
  );
}
