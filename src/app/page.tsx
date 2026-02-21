import IslamophobiaSupport from "@/components/IslamophobiaSupport";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import NewsResources from "@/components/NewsResources";
import AboutICV from "@/components/AboutICV";
import PrayerTimes from "@/components/PrayerTimes";

export default function HomePage() {
  return (
    <>
      <AboutICV />
      <IslamophobiaSupport />
      <ServicesGrid />
      <AboutSection />
      <NewsResources />
      <PrayerTimes />
    </>
  );
}
