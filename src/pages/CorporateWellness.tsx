import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Clock, MapPin, Package, Users, Sparkles, CheckCircle2, UsersRound, Palette, Sparkle, Target, Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import serviceCorporate from "@/assets/service-corporate.jpg";

export default function CorporateWellness() {

  return (
    <div className="min-h-screen">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-black hover:text-black/80 transition-colors font-serif"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Zpátky na domovskou stránku</span>
      </Link>

      {/* About the Course */}
      <section id="about" className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">MASTER YOUR FACE — Business</h2>
              <p className="text-xl text-text-secondary mb-2">Beauty & Confidence for Business</p>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Firmy mohou tento workshop využít jako součást interních aktivit, wellbeing programů nebo jako stylový zážitek pro své zaměstnankyně či klientky. 
                Jde o praktický workshop, který ženám pomáhá cítit se jistěji, upraveněji a profesionálněji v pracovním i osobním životě.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Pro koho je vhodný:</span> HR programy • Firemní benefity pro ženy • Interní wellbeing aktivity • Teambuildingy (10–20 žen) • Klientské eventy • Firmy podporující profesionální prezentaci a osobní styl
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Palette className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">S čím budete pracovat:</span> Účastnice mohou pracovat se svou běžnou kosmetikou. Pokud něco chybí, Hristina doplní kompletní zázemí — včetně make-upu Armani Beauty a pleťové péče WELEDA, se kterými spolupracuje Hristina dlouhodobě — tak, aby výsledek působil přirozeně a odpovídal profesionálnímu prostředí.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkle className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Atmosféra:</span> Stylová, příjemná a uvolněná. Šampaňské, lehký catering a profesionální vedení vytvářejí prostředí, kde ženy mohou zpomalit, načerpat inspiraci a věnovat čas samy sobě — i v rámci pracovního dne.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Výsledek pro firmy:</span> Účastnice získají praktické techniky, které využijí každý den — při pracovních schůzkách, prezentacích i v běžném životě. Firma nabídne zážitek, který podporuje sebevědomí, reprezentaci a firemní kulturu.
                  </div>
                </div>
              </div>
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
      </section>

      {/* Jak workshop probíhá */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Jak workshop probíhá</h2>
            <p className="text-lg text-text-secondary mb-12">
              Workshop je klidný, přehledný a maximálně praktický. Nikdo se neztratí, nikdo nečeká — všechny postupují společně.
            </p>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="relative">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                        1
                      </div>
                    </div>
                    <div className="flex-1 bg-background rounded-xl p-6 shadow-md border border-border/50">
                      <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">Demonstrace na modelce</h3>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        Hristina ukáže jeden konkrétní krok na modelce — například přípravu pleti, sjednocení, oči nebo kontury.
                        Vysvětlí, co je v dané části nejdůležitější, aby make-up vypadal přirozeně a vydržel co nejdéle.
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-8 top-16 w-0.5 h-6 bg-border"></div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                        2
                      </div>
                    </div>
                    <div className="flex-1 bg-background rounded-xl p-6 shadow-md border border-border/50">
                      <div className="flex items-center gap-3 mb-3">
                        <UsersRound className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">Praktické cvičení</h3>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        Ženy následně udělají stejný krok na své vlastní tváři. Každá pracuje svým tempem a má prostor pro vlastní zkoušení.
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-8 top-16 w-0.5 h-6 bg-border"></div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                        3
                      </div>
                    </div>
                    <div className="flex-1 bg-background rounded-xl p-6 shadow-md border border-border/50">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">Individuální zpětná vazba</h3>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        Poté Hristina projde jednotlivé ženy, zkontroluje jejich výsledek a každé předá osobní doporučení — co upravit, 
                        jak produkt aplikovat, aby výsledek působil čistě, lehce a dlouhodobě. Až když je krok u všech zvládnutý, pokračuje se dalším.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </section>

      <Contact showHeading={false} />

      <BackToTop />
      <Footer />
    </div>
  );
}
