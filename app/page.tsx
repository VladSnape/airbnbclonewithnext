import Image from "next/image";
import NavBar from "./components/navbar/navbar";
import FilterList from "./components/filterList";

export default function Home() {
  return (
   <main>
   < NavBar/>
   <FilterList/>
   </main>
  );
}
