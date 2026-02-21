import IslamophobiaSupport from "@/components/IslamophobiaSupport";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import NewsResources from "@/components/NewsResources";
import AboutICV from "@/components/AboutICV";
import PrayerTimes from "@/components/PrayerTimes";
import Ramadan2026 from "@/components/Ramadan2026";

export default function HomePage() {
  return (
    <>
      <AboutICV />
      <Ramadan2026 />
      <AboutSection />
      <IslamophobiaSupport />
      <ServicesGrid />
      <NewsResources />
      <PrayerTimes />
    </>
  );
}
