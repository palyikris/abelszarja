import Head from "next/head";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import CustomHead from "./../ui/CustomHead";
import { useRouter } from "next/router";

export default function Home() {
  let router = useRouter();

  let { user } = useAuth();
  if (user) {
    router.push(`/user/${user.id}/profile`);
  }

  return (
    <div>
      <CustomHead
        title="Maxt - Best tool to manage school for students!"
        description="Maxt Landing Page."
        keywords="maxt, index, landingpage"
      ></CustomHead>
      <h2>Main page xd</h2>
      <Link href="/login">Login</Link>
    </div>
  );
}
