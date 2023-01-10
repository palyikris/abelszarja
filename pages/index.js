import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Main page xd</h2>
      <Link href="/login">Login</Link>
    </div>
  );
}
