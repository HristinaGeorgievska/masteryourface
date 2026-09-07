import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Obchodní podmínky"
        description="Obchodní podmínky kurzů make-upu Master Your Face – Hristina Georgievska."
        path="/obchodni-podminky"
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
            OBCHODNÍ PODMÍNKY
          </h1>

          <div className="mb-10 space-y-1 text-base text-foreground leading-relaxed">
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
                1. Základní ustanovení
              </h2>
              <p>
                Tyto obchodní podmínky upravují vzájemná práva a povinnosti mezi poskytovatelem (Hristina Georgievska) a účastnicí kurzu při objednávání a účasti na kurzech make-upu.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                2. Objednávka kurzu
              </h2>
              <div className="space-y-3">
                <p>
                  Kurz je možné rezervovat kliknutím na tlačítko "Rezervovat" na webu masteryourface.cz, které přesměruje na rezervační systém TidyCal s konkrétním termínem kurzu.
                </p>
                <p>
                  Rezervace místa je možná pouze po uhrazení plné ceny kurzu prostřednictvím platební brány Stripe přímo v rezervačním systému. Bez zaplacení není rezervace dokončena a místo není rezervováno.
                </p>
                <p>
                  Minimální počet účastnic pro uskutečnění kurzu: <strong>6 osob</strong>. V případě nedostatečného počtu přihlášených je kurz zrušen a účastnicím jsou vráceny všechny uhrazené prostředky nejpozději do 14 dnů od plánovaného konání kurzu.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                3. Cena a platba
              </h2>
              <div className="space-y-3">
                <p>
                  Cena kurzu "Personal make-up experience": 5 600 Kč.
                </p>
                <p>
                  Platba probíhá výhradně prostřednictvím platební brány Stripe v rámci rezervačního systému TidyCal. Akceptované platební metody: platební karta.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                4. Storno a odstoupení od smlouvy
              </h2>
              <div className="space-y-3">
                <p>
                  Účastnice bere na vědomí, že dle § 1837 písm. j) občanského zákoníku nemá právo odstoupit od smlouvy o poskytnutí služby využití volného času, pokud má být plněno k určitému datu nebo v určitém období. Pro kurzy s pevným termínem tedy platí, že spotřebitel nemá nárok na vrácení peněz při odstoupení od smlouvy.
                </p>
                <div>
                  <p className="font-bold mb-2">Dobrovolné storno podmínky:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Pokud účastnice zruší svou účast na kurzu nejméně <strong>7 dní</strong> před konáním kurzu, zaplacená částka jí nepropadá. Účastnice má nárok na přesun rezervace na další nadcházející termín (případně po individuální dohodě na privátní termín). Po vypsání nových termínů musí účastnice sama kontaktovat poskytovatele za účelem výběru a potvrzení náhradního termínu. Přesun je možný pouze jednou.
                    </li>
                    <li>
                      Při zrušení účasti méně než <strong>7 dní</strong> před kurzem nebo v případě neúčasti bez předchozí omluvy zaplacená částka v plné výši propadá.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                5. Práva z vadného plnění
              </h2>
              <div className="space-y-3">
                <p>
                  Poskytovatel odpovídá za to, že kurz proběhne v termínu, místě a s osobou, která je uvedena v popisu kurzu (Hristina Georgievska).
                </p>
                <p>Účastnice má právo na vrácení peněz, pokud:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kurz byl zrušen ze strany poskytovatele bez náhradního termínu</li>
                  <li>Kurz se nekonal vůbec (poskytovatel se nedostavil)</li>
                  <li>Kurz vedl někdo jiný, než kdo byl uveden v popisu, bez předchozího upozornění</li>
                </ul>
                <p>
                  Reklamaci uplatní účastnice písemně (e-mailem) do 24 hodin od plánovaného konání kurzu. Poskytovatel reklamaci vyřídí do 7 dnů.
                </p>
                <div>
                  <p className="mb-2">V případě oprávněné reklamace má účastnice právo na:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Vrácení 100 % zaplacené ceny, nebo</li>
                    <li>Přesun na náhradní termín dle své volby</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                6. Ochrana osobních údajů
              </h2>
              <p>
                Zpracování osobních údajů upravuje samostatný dokument na adrese:{" "}
                <Link to="/gdpr" className="underline hover:text-primary transition-colors">
                  masteryourface.cz/gdpr
                </Link>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3 text-foreground">
                7. Závěrečná ustanovení
              </h2>
              <div className="space-y-3">
                <p>
                  Tyto obchodní podmínky jsou platné od 7. 9. 2026.
                </p>
                <p>
                  Pro řešení sporů je příslušná Česká obchodní inspekce.
                </p>
              </div>
            </section>

            <div className="pt-8 border-t border-border space-y-1">
              <p>V Praze dne 7. 9. 2026</p>
              <p className="font-medium">Hristina Georgievska</p>
            </div>
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer className="bg-background-secondary" />
    </div>
  );
}
