import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ArrowLeft, CheckCircle2, Image, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import servicePhotography from "@/assets/service-photography.webp";
import { SEO } from "@/components/SEO";

export default function Portrait() {

  return (
    <div className="min-h-screen">
      <SEO
        title="Profesionální firemní portréty"
        description="Portrétní focení přímo ve vaší firmě. Mobilní ateliér, make-up a styling v ceně. Reprezentativní výsledky bez přesunů a časových ztrát."
        path="/portrait"
      />
      {/* About the Service */}
      <section id="about" className="pt-28 md:pt-36 pb-20 md:pb-32 bg-background">
        <div className="container-custom">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-base md:text-lg font-medium text-foreground hover:text-foreground/75 transition-colors font-serif group"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-1" />
              <span>Zpátky na domovskou stránku</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">MASTER YOUR IMAGE — Portraits</h1>
              <p className="text-xl text-text-secondary mb-2">Professional Corporate Portraits</p>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                MASTER YOUR IMAGE přináší profesionální portrétní focení přímo do prostředí vaší firmy.
                Mobilní ateliér umožní zaměstnancům absolvovat focení během pracovního dne — bez přesunů, bez časových ztrát a v atmosféře, která podporuje přirozený a reprezentativní výsledek.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Co zahrnuje:</span> Make-up & hair styling pro ženy • Jemná grooming úprava pro muže • Doladění outfitu a osobního stylu • Kompletní mobilní ateliér (světla, pozadí, technika, beauty zóna) • Realizaci u vás ve firmě nebo v námi zajištěném ateliéru • Profesionální tým: fotograf, make-up & hair artist, styling asistent, koordinátor
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Image className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Výstupy:</span> Výsledkem jsou portréty, které působí reprezentativně, sebevědomě a přirozeně — v jednotném vizuálním stylu vaší společnosti. Součástí je jemná postprodukce a retuš s citem pro přirozenost. Volitelně lze doplnit o: mini video-portréty • stylizované týmové fotografie • backstage obsah
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Pro koho je služba ideální:</span> Týmy a firmy, které potřebují profesionální portréty pro web a sociální sítě • HR a interní komunikaci • Management a leadership • PR a externí prezentaci • Moderní firmy, které dbají na konzistentní vizuální styl
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <img
                src={servicePhotography}
                alt="Profesionální portrét od Hristiny Georgievské"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
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
