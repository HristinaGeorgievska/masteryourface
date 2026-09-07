import { HeroSlideshow } from "@/components/HeroSlideshow";
import { VideoSection } from "@/components/VideoSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Testimonials } from "@/components/Testimonials";
import { Showcase } from "@/components/Showcase";
import { CourseGallery } from "@/components/CourseGallery";
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

      {/* 2. O Hristině */}
      <ScrollReveal>
        <VideoSection className="bg-background-secondary" />
      </ScrollReveal>

      {/* 3. Nabídka služeb */}
      <ScrollReveal>
        <ServicesGrid className="bg-background" />
      </ScrollReveal>

      {/* 4. Recenze */}
      <ScrollReveal>
        <Testimonials className="bg-background-secondary" />
      </ScrollReveal>

      {/* 5. Portfolio */}
      <Showcase className="bg-background" />

      {/* 6. Atmosféra kurzů */}
      <CourseGallery title="Atmosféra kurzů" className="bg-background-secondary" />

      {/* 7. FAQ */}
      <ScrollReveal>
        <FAQ className="bg-background" />
      </ScrollReveal>

      {/* 8. Kontakt */}
      <ScrollReveal>
        <Contact className="bg-background-secondary" />
      </ScrollReveal>

      {/* 9. Footer */}
      <Footer className="bg-background border-t border-border/40" />
      <BackToTop />
    </main>
  );
};

export default Index;
