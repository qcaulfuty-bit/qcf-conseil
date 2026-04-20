import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Expertise } from "@/components/Expertise";
import { Approach } from "@/components/Approach";
import { Differentiation } from "@/components/Differentiation";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Manifesto />
      <Expertise />
      <Approach />
      <Differentiation />
      <FinalCta />
      <Footer />
    </main>
  );
}
