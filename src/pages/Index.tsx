import { HeroSlideshow } from "@/components/HeroSlideshow";
import { VideoSection } from "@/components/VideoSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSlideshow />
      <ScrollReveal>
        <VideoSection />
      </ScrollReveal>
      <ScrollReveal>
        <ServicesGrid />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>
      <ScrollReveal>
        <BookingCTA />
      </ScrollReveal>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
