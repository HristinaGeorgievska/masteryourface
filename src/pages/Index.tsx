import { HeroSlideshow } from "@/components/HeroSlideshow";
import { VideoSection } from "@/components/VideoSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Showcase } from "@/components/Showcase";

import { FAQ } from "@/components/FAQ"; 
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BackToTop } from "@/components/BackToTop";
import Contact from "@/components/Contact";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Master Your Face | Profesionální make-up kurzy a portrétní fotografie"
        description="Autorský beauty koncept Hristiny Georgievské. Individuální make-up kurzy, firemní beauty workshopy a profesionální portréty. 25+ let zkušeností."
        path="/"
      />
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
      {/* 7. Contact */}
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
      
      {/* 8. Footer */}
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
