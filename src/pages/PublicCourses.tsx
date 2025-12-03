import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Clock, MapPin, Package, Users, Sparkles, CheckCircle2, UsersRound, Palette, Sparkle, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import servicePublic from "@/assets/service-public.jpg";
import { useCourses } from "@/hooks/useCourses";

export default function PublicCourses() {
  const { data: courses, isLoading, error } = useCourses();

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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">MASTER YOUR FACE — Individual</h2>
              <p className="text-xl text-text-secondary mb-2">Personal Make-Up Experience</p>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Objevte make-up, který konečně dává smysl — jednoduchý, přirozený a použitelný v běžném životě.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Palette className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">S čím budete pracovat:</span> Během workshopu pracujete se svou běžnou kosmetikou. Pokud něco chybí, Hristina doplní kompletní zázemí — včetně make-upu Armani Beauty — tak, aby výsledek působil co nejpřirozeněji a fungoval pro každou ženu individuálně.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkle className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Atmosféra:</span> Příjemná, elegantní, s lehkým cateringem a šampaňským. Atmosféra, která vám připomene, jaké to je věnovat čas jen sama sobě.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Individuální přístup:</span> Na závěr nabízí Hristina krátkou osobní konzultaci — projde vaše produkty, upraví techniku a odpoví na otázky, které vznikly v průběhu workshopu.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Kde:</span> Praha • Brno • Ostrava
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Délka:</span> cca 5 hodin
                  </div>
                </div>
              </div>
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

      {/* Upcoming Courses */}
      <section id="dates" className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left">Nadcházející termíny</h2>
          
          {isLoading && <p className="text-center text-lg text-text-secondary">Načítání termínů...</p>}
          {error && <p className="text-center text-lg text-red-500">Nepodařilo se načíst termíny.</p>}
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses?.map((course) => (
              <div key={course.id} className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">{course.city}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {course.status ? 'Volná místa' : 'Obsazeno'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.date}</h3>
                <div className="flex items-center gap-2 text-text-secondary mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.timeRange}</span>
                </div>
                {course.address && (
                   <div className="text-sm text-text-secondary mb-6">
                     {course.address}
                   </div>
                )}
                
                {course.status ? (
                    <a 
                      href={course.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
                    >
                      Rezervovat místo
                    </a>
                ) : (
                    <button disabled className="w-full py-3 px-4 bg-gray-200 text-gray-500 rounded-lg font-medium cursor-not-allowed">
                      Plně obsazeno
                    </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}
