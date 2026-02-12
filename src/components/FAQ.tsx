import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Je workshop vhodný i pro úplné začátečnice?",
    answer: "Ano. Workshop je navržený tak, aby vše zvládla i žena, která se běžně nelíčí. Postupuje se krok po kroku, společně, v klidném tempu — nikdo se neztratí a každý krok Hristina osobně zkontroluje.",
  },
  {
    question: "Co si mám na workshop přinést?",
    answer: "Stačí vaše běžná kosmetika, se kterou pracujete doma. Pokud něco chybí, doplníme vše na místě — včetně make-upu Armani Beauty a pleťové péče WELEDA, se kterými spolupracuje Hristina dlouhodobě.",
  },
  {
    question: "Mohu používat vlastní kosmetiku?",
    answer: "Ano, je to dokonce doporučené. Hristina vám přímo během workshopu ukáže, jak vaše produkty používat tak, aby fungovaly co nejlépe.",
  },
  {
    question: "Kolik žen může být v jedné skupině?",
    answer: "Ideální počet je 10–20 žen. Díky tomu se Hristina může věnovat každé individuálně a workshop má příjemné, osobní tempo.",
  },
  {
    question: "Jak dlouho předem je potřeba rezervovat termín?",
    answer: "U individuálních workshopů doporučujeme 2–4 týdny předem. Firemní workshopy a portréty je dobré rezervovat alespoň 4–6 týdnů dopředu.",
  },
  {
    question: "Líčí Hristina každou ženu individuálně?",
    answer: "Ano. Po každém kroku Hristina projde všechny účastnice, upraví techniku, doporučí vhodný způsob aplikace a dává osobní doporučení.",
  },
  {
    question: "Je možné uspořádat firemní workshop i mimo Prahu?",
    answer: "Ano. Workshop je možné realizovat v Brně, Ostravě a dalších městech podle domluvy.",
  },
  {
    question: "Jak probíhá portrétní focení ve firmě?",
    answer: "Tým přijede přímo k vám a připraví mobilní ateliér — světla, pozadí, beauty zónu i styling. Zaměstnanci se fotí v rámci pracovního dne, bez přesunů a bez narušení provozu. Výsledek je jednotný, profesionální a přirozený.",
  },
  {
    question: "Je možné kombinovat firemní workshop a portréty v jednom dni?",
    answer: "Ano, podle kapacity týmu to lze. Často se workshop dopoledne kombinuje s portréty odpoledne.",
  },
  {
    question: "Nabízíte i čistě individuální lekce pro jednu osobu?",
    answer: "Ano. Individuální \"one-to-one\" lekce jsou možné podle domluvy a probíhají ve stejném klidném, praktickém formátu.",
  },
];

export const FAQ = () => {
  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Často kladené otázky</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => {
              const slug = faq.question.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60);
              return (
              <AccordionItem
                key={slug}
                value={slug}
                className="bg-background rounded-lg px-6 border-0"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
