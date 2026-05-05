import { ContactSection } from "@/components/districts/ContactSection";
import { CallToAction } from "@/components/home/CallToAction";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CO2Calculator } from "@/components/home/CO2Calculator";
import { ImportanceOfPlantation } from "@/components/home/ImportanceOfPlantation";
import { getAllDistrictsApi } from "@/services/district.service";
import { getAccessToken } from "@/lib/cookieUtils";

export default async function Home() {
  const initialData = await getAllDistrictsApi(1, 100);
  const token = await getAccessToken();

  return (
    <>
      <Hero initialData={initialData} />
      <ImportanceOfPlantation />
      <HowItWorks />
      <CO2Calculator token={token} />
      <CallToAction />
      <ContactSection />
    </>
  );
}
