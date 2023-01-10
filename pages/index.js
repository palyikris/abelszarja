import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  let { logout } = useAuth();
  return <button onClick={logout}>logout</button>;
}
