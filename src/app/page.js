
import Banner from "@/components/shared/Banner";
import Features from "@/components/shared/Features";
import Gallery from "@/components/shared/Gallery";
import Newsletter from "@/components/shared/Newsletter";
import RecentEvents from "@/components/shared/RecentEvents";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />

      <RecentEvents />

      <Gallery />
      <Newsletter />
    </>
  );
}
