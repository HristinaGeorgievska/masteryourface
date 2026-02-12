import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The facial massage course completely transformed my approach to self-care. The techniques are professional and the results are amazing!",
    author: "Sarah Johnson",
    role: "Course Graduate",
  },
  {
    quote: "Our team absolutely loved the corporate wellness workshop. It was a perfect blend of relaxation and skill-building. Highly recommend!",
    author: "Michael Chen",
    role: "HR Director",
  },
  {
    quote: "The portrait photography session captured my confidence beautifully. Professional, elegant, and the results exceeded all expectations.",
    author: "Emma Williams",
    role: "Client",
  },
  {
    quote: "Learning facial massage techniques has been life-changing. The instructor's expertise and passion shine through every lesson.",
    author: "Lisa Anderson",
    role: "Course Graduate",
  },
];

export const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-background-secondary">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real experiences from people who have transformed their lives through our courses.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative min-h-[200px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="text-center">
                <blockquote className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="text-lg font-semibold">{testimonial.author}</p>
                  <p className="text-text-secondary">{testimonial.role}</p>
                </div>
                <Quote className="w-12 h-12 mx-auto mt-8 text-primary/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
