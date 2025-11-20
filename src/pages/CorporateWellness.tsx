import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CourseGallery } from "@/components/CourseGallery";
import { Clock, MapPin, Package, Users, ChevronDown } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import serviceCorporate from "@/assets/service-corporate.jpg";
import galleryCorporate1 from "@/assets/gallery-corporate-1.jpg";
import galleryCorporate2 from "@/assets/gallery-corporate-2.jpg";
import galleryCorporate3 from "@/assets/gallery-corporate-3.jpg";
import galleryCorporate4 from "@/assets/gallery-corporate-4.jpg";
import { Link } from "react-router-dom";

export default function CorporateWellness() {
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
          src={serviceCorporate}
          alt="Corporate Wellness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Corporate Wellness
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Transform your workplace with wellness that energizes and inspires
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

      {/* About the Course */}
      <section id="about" className="section-padding bg-background">
        <ScrollReveal>
          <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Program</h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Bring wellness directly to your workplace with our customized facial massage workshops. 
                These sessions are designed to reduce stress, boost team morale, and introduce valuable 
                self-care practices that employees can use daily. Perfect for team building, wellness weeks, 
                or corporate events.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Duration:</span> 2-4 hours (customizable to your needs)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Location:</span> Your office or chosen venue
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Included:</span> All materials, setup, expert instructor, certificates
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Group Size:</span> Flexible - from 10 to 50+ participants
                  </div>
                </div>
              </div>

              <Button onClick={scrollToBooking} size="lg">
                Reserve Your Date
              </Button>
            </div>
            
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <img
                src={serviceCorporate}
                alt="Corporate wellness session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Program Gallery */}
      <CourseGallery
        images={[galleryCorporate1, galleryCorporate2, galleryCorporate3, galleryCorporate4]}
        title="Program Experience"
        subtitle="See our corporate wellness sessions in action"
      />

      {/* Pricing and Booking */}
      <section id="booking" className="section-padding bg-background">
        <ScrollReveal>
          <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Book?</h2>
            <div className="bg-background rounded-lg p-8 md:p-12 shadow-xl mb-8">
              <p className="text-4xl md:text-5xl font-bold mb-4">Custom Pricing</p>
              <p className="text-lg text-text-secondary mb-8">
                Pricing varies based on group size, duration, and location. Contact us for a personalized quote.
              </p>
              <Button
                size="lg"
                className="w-full md:w-auto px-12"
                asChild
              >
                <a href="mailto:info@masteryourface.com?subject=Corporate Wellness Inquiry">
                  Request a Quote
                </a>
              </Button>
              <p className="text-sm text-text-secondary mt-6">
                We'll respond within 24 hours with a customized proposal
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
              <AccordionTrigger>What's the minimum group size?</AccordionTrigger>
              <AccordionContent>
                We typically recommend a minimum of 10 participants for corporate workshops. However, 
                we're flexible and can accommodate smaller groups - contact us to discuss your needs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Do you provide all equipment?</AccordionTrigger>
              <AccordionContent>
                Yes! We bring everything needed for the workshop including all materials, products, and equipment. 
                You just need to provide the space and we'll handle the rest.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can we customize the workshop content?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We work with you to create a program that fits your company's goals, whether that's 
                stress relief, team building, or wellness education. Every corporate program is tailored to your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How far in advance should we book?</AccordionTrigger>
              <AccordionContent>
                We recommend booking at least 4-6 weeks in advance to ensure availability, especially for larger 
                groups or specific dates. However, we'll do our best to accommodate last-minute requests when possible.
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
