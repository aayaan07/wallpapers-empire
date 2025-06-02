import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/app/components/Hero";
import Explore from "@/app/components/Explore";
import Curated from "./components/Curated";

export default function Home() {
  return (

    <main>
      <Hero />
      <Curated />
      <Explore />
    </main>

  );
}
