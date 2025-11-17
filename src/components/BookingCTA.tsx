import { Button } from "@/components/ui/button";

export const BookingCTA = () => {
  return (
    <section id="booking" className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Ready to Master Your Face?
          </h2>
          <p className="text-xl text-text-secondary mb-12 leading-relaxed">
            Begin your journey to radiant skin and professional facial massage expertise.
            Book your course or session today.
          </p>

          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-12 py-6 h-auto"
            asChild
          >
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
              Book Your Course Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
