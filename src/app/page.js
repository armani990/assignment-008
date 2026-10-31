import Banner from "@/components/shared/Banner";
import Features from "@/components/shared/Features";
import Image from "next/image";
import Gallery from "@/components/shared/Gallery";
import Newsletter from "@/components/shared/Newsletter";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <Features></Features>
      
      <Gallery />
      <Newsletter />
    </>
  );
}
