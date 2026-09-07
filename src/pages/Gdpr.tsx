import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Gdpr() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Zpracování osobních údajů (GDPR)"
        description="Informace o zpracování a ochraně osobních údajů – Master Your Face, Hristina Georgievska."
        path="/gdpr"
      />

      {/* Back to Home Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors font-serif bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-xs md:shadow-none md:bg-transparent"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium text-sm md:text-base">Zpátky na domovskou stránku</span>
      </Link>

      <main className="flex-1 pt-24 pb-16 md:pt-28 md:pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-8 text-foreground">
            ZPRACOVÁNÍ OSOBNÍCH ÚDAJŮ
          </h1>

          <div className="mb-10 space-y-1 text-base text-foreground leading-relaxed">
            <p className="font-semibold text-lg mb-1">Správce osobních údajů:</p>
            <p className="font-bold text-lg">Hristina Georgievska</p>
            <p>se sídlem: Londýnská 217/33, 120 00 Praha 2</p>
            <p>IČO: 67994369</p>
            <p>
              Email:{" "}
              <a
                href="mailto:hristina.georgievska1@gmail.com"
                className="underline hover:text-primary transition-colors"
              >
                hristina.georgievska1@gmail.com
              </a>
            </p>
            <p>
              Telefon:{" "}
              <a
                href="tel:+420602367517"
                className="underline hover:text-primary transition-colors"
              >
                +420 602 367 517
              </a>
            </p>
          </div>

          <div className="space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                1. Jaké údaje sbíráme
              </h2>
              <div className="space-y-2">
                <p>Při rezervaci kurzu zpracováváme:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Jméno a příjmení</li>
                  <li>Emailovou adresu</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                2. Účel a právní důvod zpracování
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="mb-2">Údaje zpracováváme za účelem:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Plnění smlouvy o účasti na kurzu (rezervace, komunikace, fakturace)</li>
                    <li>Ochrany práv správce (dokazování, že kurz proběhl)</li>
                  </ul>
                </div>
                <p>
                  <strong>Právní důvod:</strong> Plnění smlouvy podle čl. 6 odst. 1 písm. b) GDPR
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                3. Doba uchovávání
              </h2>
              <div className="space-y-2">
                <p>Osobní údaje uchováváme:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Po dobu 3 let od uskutečnění kurzu (účetní a daňové povinnosti)</li>
                  <li>Po tuto dobu jsou údaje archivovány a nejsou dále zpracovávány</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                4. Komu údaje poskytujeme
              </h2>
              <div className="space-y-2">
                <p>Údaje mohou být předány:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Poskytovateli rezervačního systému (TidyCal) — nezbytné pro rezervaci</li>
                  <li>Poskytovateli platební brány (Stripe) — nezbytné pro zpracování platby</li>
                  <li>Účetní / daňovému poradci — nezbytné pro plnění zákonných povinností</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                5. Cookies a analytika
              </h2>
              <div className="space-y-3">
                <p>Na webu používáme:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Meta (Facebook) Pixel — marketingové účely (souhlas)</li>
                </ul>
                <p>
                  Tyto nástroje začnou sbírat data až po vašem souhlasu v cookie liště.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                6. Vaše práva
              </h2>
              <div className="space-y-3">
                <p>Máte právo:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Na přístup k vašim údajům</li>
                  <li>Na opravu nepřesných údajů</li>
                  <li>Na výmaz údajů (pokud nejsme vázáni zákonnou lhůtou)</li>
                  <li>Na omezení zpracování</li>
                  <li>Vznést námitku proti zpracování</li>
                  <li>Podat stížnost u Úřadu pro ochranu osobních údajů</li>
                </ul>
                <p className="pt-2">
                  <strong>Uplatnění práv:</strong>{" "}
                  <a
                    href="mailto:hristina.georgievska1@gmail.com"
                    className="underline hover:text-primary transition-colors"
                  >
                    hristina.georgievska1@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                7. Zabezpečení
              </h2>
              <p>
                Údaje jsou uchovávány v zabezpečených systémech (TidyCal, Stripe) s přístupem pouze pro oprávněné osoby.
              </p>
            </section>
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer className="bg-background-secondary" />
    </div>
  );
}
