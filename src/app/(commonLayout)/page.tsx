import { ContactSection } from "@/components/districts/ContactSection";
import { Hero } from "@/components/home/Hero";
import { getAllDistrictsApi } from "@/services/district.service";

export default async function Home() {
  const initialData = await getAllDistrictsApi();

  return (
    <>
      <Hero initialData={initialData} />
      <ContactSection />
    </>
  );
}
