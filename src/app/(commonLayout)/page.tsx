import { ContactSection } from "@/components/districts/ContactSection";
import { CallToAction } from "@/components/home/CallToAction";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ImportanceOfPlantation } from "@/components/home/ImportanceOfPlantation";
import { getAllDistrictsApi } from "@/services/district.service";

export default async function Home() {
  const initialData = await getAllDistrictsApi(1, 100);

  return (
    <>
      <Hero initialData={initialData} />
      <ImportanceOfPlantation />
      <HowItWorks />
      <CallToAction />
      <ContactSection />
    </>
  );
}
