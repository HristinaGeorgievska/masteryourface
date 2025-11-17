import { Button } from "@/components/ui/button";

export const VideoSection = () => {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="video-section" className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover the Art of Facial Massage
          </h2>
          <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
            Watch how professional facial massage techniques can transform your skin and boost your confidence.
          </p>

          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl mb-12">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Master Your Face Introduction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <Button
            onClick={scrollToServices}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            View Our Courses
          </Button>
        </div>
      </div>
    </section>
  );
};
