import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CourseGallery } from "@/components/CourseGallery";
import { Clock, MapPin, Package, Camera, ChevronDown } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import servicePhotography from "@/assets/service-photography.jpg";
import galleryPhotography1 from "@/assets/gallery-photography-1.jpg";
import galleryPhotography2 from "@/assets/gallery-photography-2.jpg";
import galleryPhotography3 from "@/assets/gallery-photography-3.jpg";
import galleryPhotography4 from "@/assets/gallery-photography-4.jpg";
import { Link } from "react-router-dom";

export default function PortraitPhotography() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Link
          to="/"
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
        <img
          src={servicePhotography}
          alt="Portrait Photography"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Portrait Photography
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Capture your beauty with elegant, timeless portraits
            </p>
            <Button
              onClick={scrollToBooking}
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Book Your Spot
            </Button>
          </div>
        </div>
        
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary-foreground animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* About the Service */}
      <section id="about" className="section-padding bg-background">
        <ScrollReveal>
          <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Session</h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Our portrait photography sessions are designed to capture your natural beauty and confidence. 
                Whether you need professional headshots, personal branding photos, or simply want to celebrate 
                yourself, we create images that showcase your authentic radiance. Each session includes professional 
                makeup guidance to ensure you look and feel your absolute best.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Duration:</span> 2-hour session with styling time
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Location:</span> Professional studio in Prague or outdoor location
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Included:</span> Makeup consultation, 2 outfit changes, 20 edited photos
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Camera className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Delivery:</span> High-resolution digital files within 7 days
                  </div>
                </div>
              </div>

              <Button onClick={scrollToBooking} size="lg">
                Reserve Your Date
              </Button>
            </div>
            
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <img
                src={servicePhotography}
                alt="Portrait session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Session Gallery */}
      <CourseGallery
        images={[galleryPhotography1, galleryPhotography2, galleryPhotography3, galleryPhotography4]}
        title="Session Experience"
        subtitle="Behind the scenes of our portrait photography sessions"
      />

      {/* Pricing and Booking */}
      <section id="booking" className="section-padding bg-background">
        <ScrollReveal>
          <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Book Your Session?</h2>
            <div className="bg-background rounded-lg p-8 md:p-12 shadow-xl mb-8">
              <p className="text-5xl md:text-6xl font-bold mb-4">3,990 CZK</p>
              <p className="text-lg text-text-secondary mb-8">
                Includes makeup consultation, 2-hour session, and 20 edited high-resolution photos
              </p>
              <Button
                size="lg"
                className="w-full md:w-auto px-12"
                asChild
              >
                <a href="mailto:info@masteryourface.com?subject=Portrait Photography Booking">
                  Book Your Session
                </a>
              </Button>
              <p className="text-sm text-text-secondary mt-6">
                You'll receive a confirmation email with session details
              </p>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background-secondary">
        <ScrollReveal>
          <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What should I wear?</AccordionTrigger>
              <AccordionContent>
                We recommend bringing 2-3 outfit options that make you feel confident. Solid colors work best, 
                and we suggest avoiding busy patterns. We'll discuss outfit choices before your session to ensure 
                you get the look you want.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need to do my own makeup?</AccordionTrigger>
              <AccordionContent>
                We provide makeup guidance and tips, but professional makeup services can be added for an additional 
                fee. Many clients prefer to do their own makeup following our recommendations, which we discuss before the session.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I bring someone with me?</AccordionTrigger>
              <AccordionContent>
                Yes! You're welcome to bring a friend or family member for support. Many clients find it helps them 
                relax and enjoy the experience even more.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How long until I receive my photos?</AccordionTrigger>
              <AccordionContent>
                You'll receive your professionally edited photos within 7 days of your session via digital download. 
                All images are high-resolution and ready for both print and digital use.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        </ScrollReveal>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}
