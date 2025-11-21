import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Clock, MapPin, Package, Camera, ArrowLeft, CheckCircle2, Image, Building2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import servicePhotography from "@/assets/service-photography.jpg";

export default function PortraitPhotography() {

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

      {/* About the Service */}
      <section id="about" className="section-padding bg-background">
        <ScrollReveal>
          <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">MASTER YOUR IMAGE — Portraits</h2>
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
                alt="Portrait session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}
