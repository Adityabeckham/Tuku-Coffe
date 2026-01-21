"use client";

import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import {
  AboutSection,
  BentoSection,
  StatsSection,
  TestimonialSection,
  CTASection,
  Footer
} from "@/components/LandingSections";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      {/* Hero Scrollytelling Section */}
      <SequenceScroll />

      {/* Content Sections - Overlapping the end of the scroll sequence */}
      <div className="-mt-[100vh] relative z-20 bg-[#0a0a0a]">
        <AboutSection />
        <BentoSection />
        <StatsSection />
        <TestimonialSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
