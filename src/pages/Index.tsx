import { HeroSlideshow } from "@/components/HeroSlideshow";
import { VideoSection } from "@/components/VideoSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Showcase } from "@/components/Showcase";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero */}
      <HeroSlideshow />
      
      {/* 2. Services */}
      <ScrollReveal>
        <ServicesGrid />
      </ScrollReveal>
      
      {/* 3. About Hristina and Master your face */}
      <ScrollReveal>
        <VideoSection />
      </ScrollReveal>
      
      {/* 4. Showcase */}
      <Showcase />
      
      {/* 5. Feedback - Disabled for now, ready to be enabled when real feedback is available */}
      {/* <ScrollReveal>
        <Testimonials />
      </ScrollReveal> */}
      
      {/* 6. FAQ */}
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>
      
      {/* 7. Footer */}
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
