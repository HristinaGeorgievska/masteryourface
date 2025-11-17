import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CourseGallery } from "@/components/CourseGallery";
import { Clock, MapPin, Package, Users, ChevronDown } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import servicePublic from "@/assets/service-public.jpg";
import galleryPublic1 from "@/assets/gallery-public-1.jpg";
import galleryPublic2 from "@/assets/gallery-public-2.jpg";
import galleryPublic3 from "@/assets/gallery-public-3.jpg";
import galleryPublic4 from "@/assets/gallery-public-4.jpg";
import { Link } from "react-router-dom";

export default function PublicCourses() {
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
          src={servicePublic}
          alt="Public Courses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Public Courses
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Learn to do your makeup so you feel confident every day
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Course</h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Our public courses are designed for anyone who wants to master the art of facial massage and makeup application. 
                Whether you're a complete beginner or looking to refine your skills, our expert instructors will guide you 
                through practical techniques you can use every day.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Duration:</span> 3-hour intensive session
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Location:</span> Prague city center (exact address upon booking)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Included:</span> All materials, refreshments, course workbook
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Group Size:</span> Maximum 8 participants for personalized attention
                  </div>
                </div>
              </div>

              <Button onClick={scrollToBooking} size="lg">
                Reserve Your Date
              </Button>
            </div>
            
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <img
                src={servicePublic}
                alt="Course experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* Course Gallery */}
      <CourseGallery
        images={[galleryPublic1, galleryPublic2, galleryPublic3, galleryPublic4]}
        title="Course Experience"
        subtitle="See what our makeup courses look like"
      />

      {/* Pricing and Booking */}
      <section id="booking" className="section-padding bg-background">
        <ScrollReveal>
          <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Join?</h2>
            <div className="bg-background rounded-lg p-8 md:p-12 shadow-xl mb-8">
              <p className="text-5xl md:text-6xl font-bold mb-4">2,490 CZK</p>
              <p className="text-lg text-text-secondary mb-8">
                Includes all materials, refreshments, and course workbook
              </p>
              <Button
                size="lg"
                className="w-full md:w-auto px-12"
                asChild
              >
                <a href="mailto:info@masteryourface.com?subject=Public Course Booking">
                  Book Your Spot
                </a>
              </Button>
              <p className="text-sm text-text-secondary mt-6">
                You'll receive a confirmation email after booking
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
              <AccordionTrigger>Do I need any prior experience?</AccordionTrigger>
              <AccordionContent>
                Not at all! Our public courses are designed for complete beginners. We start with the basics 
                and progress at a comfortable pace for everyone.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What should I bring?</AccordionTrigger>
              <AccordionContent>
                Just yourself! We provide all necessary materials, tools, and products. However, you're welcome 
                to bring your own makeup if you'd like to learn specifically with your products.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I get a refund if I can't attend?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer full refunds for cancellations made at least 7 days before the course date. 
                Cancellations within 7 days receive a 50% refund or free rescheduling to another date.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Are men welcome in the courses?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Our courses are for everyone interested in learning makeup and skincare techniques, 
                regardless of gender.
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
