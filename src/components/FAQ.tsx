import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Voucher {
  id: string;
  name: string;
  image: string;
  pdf: string;
  downloadName: string;
}

const vouchers: Voucher[] = [
  {
    id: "v1",
    name: "Varianta 1",
    image: "/vouchers/voucher_v1.webp",
    pdf: "/vouchers/voucher_v1.pdf",
    downloadName: "MasterYourFace-Voucher-Varianta-1.pdf",
  },
  {
    id: "v2",
    name: "Varianta 2",
    image: "/vouchers/voucher_v2.webp",
    pdf: "/vouchers/voucher_v2.pdf",
    downloadName: "MasterYourFace-Voucher-Varianta-2.pdf",
  },
  {
    id: "v3",
    name: "Varianta 3",
    image: "/vouchers/voucher_v3.webp",
    pdf: "/vouchers/voucher_v3.pdf",
    downloadName: "MasterYourFace-Voucher-Varianta-3.pdf",
  },
];

interface FAQProps {
  className?: string;
}

export const FAQ = ({ className = "bg-background" }: FAQProps) => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

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
      question: "Lze zakoupit dárkový voucher?",
      answer: (
        <div className="space-y-4">
          <p>
            Voucher Master Your Face je krásný dárek pro každou ženu, která se chce naučit líčit sama sebe a cítit se ve svém make-upu skvěle.
          </p>
          <p>
            Voucher lze využít na skupinový kurz Master Your Face, nebo po předchozí domluvě také na osobní privátní kurz, který přizpůsobím individuálně vašim časovým možnostem, potřebám a přáním.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSelectedVoucher(vouchers[0])}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-black text-white hover:bg-neutral-800 font-medium text-sm transition-colors shadow-sm cursor-pointer"
            >
              <Eye className="w-4 h-4 text-white" />
              <span>Prohlédnout a stáhnout voucher (3 varianty)</span>
            </button>
          </div>
        </div>
      ),
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
    {
      question: "Jak je to se stornem nebo vracením peněz, pokud se nemohu zúčastnit?",
      answer: (
        <>
          Pokud svou účast zrušíte nejméně 7 dní před konáním kurzu, zaplacená částka vám nepropadá a máte nárok na přesun rezervace na další nadcházející termín. Při zrušení méně než 7 dní předem nebo v případě neúčasti zaplacená částka v plné výši propadá. V případě zrušení kurzu ze strany poskytovatele vám budou vráceny všechny uhrazené prostředky. Kompletní pravidla naleznete v našich{" "}
          <Link to="/obchodni-podminky" className="underline hover:text-primary transition-colors">
            obchodních podmínkách
          </Link>
          .
        </>
      ),
    },
  ];

  return (
    <section id="faq" className={`section-padding ${className}`}>
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
                  className="bg-background-secondary rounded-lg px-6 border-0"
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

      {/* Voucher Preview & Download Modal */}
      <Dialog open={!!selectedVoucher} onOpenChange={(open) => !open && setSelectedVoucher(null)}>
        <DialogContent className="max-w-2xl sm:max-w-3xl p-6 bg-white border border-neutral-200 text-neutral-900 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif font-bold text-neutral-900">
              Dárkový voucher — {selectedVoucher?.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-600">
              Zde si můžete prohlédnout voucher ve vysokém rozlišení. Níže si jej můžete stáhnout v tiskovém PDF.
            </DialogDescription>
          </DialogHeader>

          {/* Variant Switcher */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3 pt-1">
            {vouchers.map((v) => {
              const isActive = selectedVoucher?.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVoucher(v)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer",
                    isActive
                      ? "bg-black text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-black"
                  )}
                >
                  {v.name}
                </button>
              );
            })}
          </div>

          {/* High Resolution Image Preview */}
          <div className="relative w-full aspect-2/1 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shadow-inner">
            {selectedVoucher && (
              <img
                src={selectedVoucher.image}
                alt={selectedVoucher.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Action Footer */}
          <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 pt-2">
            <span className="text-xs text-neutral-500">
              Formát: PDF (připraveno pro tisk i online zaslání)
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <DialogClose asChild>
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 hover:text-black font-medium text-sm transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Zavřít
                </button>
              </DialogClose>
              {selectedVoucher && (
                <a
                  href={selectedVoucher.pdf}
                  download={selectedVoucher.downloadName}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white hover:bg-neutral-800 font-medium text-sm transition-colors shadow-sm w-full sm:w-auto cursor-pointer"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Stáhnout PDF ({selectedVoucher.name})</span>
                </a>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
