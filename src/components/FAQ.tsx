import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What experience level do I need for the courses?",
    answer: "No prior experience is necessary! Our courses are designed for all levels, from complete beginners to those looking to refine their techniques. We provide comprehensive instruction and hands-on practice for everyone.",
  },
  {
    question: "How long are the courses?",
    answer: "Course duration varies by program. Public courses typically run 4-8 weeks with weekly sessions, while corporate workshops can be customized from half-day to full-day formats based on your team's needs.",
  },
  {
    question: "Do you provide course materials?",
    answer: "Yes! All participants receive professional course materials including technique guides, practice tools, and digital resources. Everything you need to master the techniques is included in your course fee.",
  },
  {
    question: "Can I book a private session?",
    answer: "Absolutely! We offer private one-on-one sessions for both facial massage training and portrait photography. Contact us to discuss your specific needs and schedule a personalized session.",
  },
  {
    question: "What makes your approach unique?",
    answer: "We combine professional expertise with a holistic approach to facial wellness. Our methods are research-backed, our instruction is personalized, and we focus on sustainable techniques you can use for life.",
  },
  {
    question: "Is there a certification upon completion?",
    answer: "Yes! Graduates of our comprehensive courses receive a professional certificate of completion, recognizing your mastery of facial massage techniques. This certificate demonstrates your commitment to professional wellness practices.",
  },
];

export const FAQ = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about our courses and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background-secondary rounded-lg px-6 border-0"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
