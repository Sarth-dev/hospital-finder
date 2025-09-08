import Image from "next/image";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import HospitalFinder from "./Hospital";

export default function Home() {
  return (
    <>
    <Navbar/>
      <HospitalFinder/>
      <Footer/>
    </>
  );
}
