import hristinaImg from '../assets/hristinageorgievska.jpg';

export const VideoSection = () => {
  return (
    <section id="video-section" className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl min-h-[320px] bg-muted">
            <img
              src={hristinaImg}
              alt="Hristina Georgievska"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-8">
            <header>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">
                O Hristině a MASTER YOUR FACE
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Hristina Georgievska
              </h2>
            </header>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <div className="space-y-4">
                <p>
                  Make-up artistka s více než 25 lety zkušeností napříč módními editoriály,
                  televizními projekty a českými i mezinárodními kampaněmi. Spolupracovala se světovými
                  značkami jako Dior, Jean Paul Gaultier, Vivienne Westwood i s předními českými
                  produkcemi. Líčila osobnosti jako Tereza Maxová, Karolína Kurková, Daniela Peštová či
                  Eva Herzigová a v rámci své práce se setkala i s významnými světovými osobnostmi —
                  například prezidentem Georgem W. Bushem. Pravidelně působí na MFF Karlovy Vary a
                  dlouhodobě spolupracuje jako ambasadorka značek WELEDA a ARMANI BEAUTY.
                </p>
                <p className="italic text-foreground">
                  „Make-up pro mě není maska, ale nástroj sebevědomí.“
                </p>
                <p>
                  Je známá svým citem pro přirozenost, detail a osobní přístup, díky kterému dokáže
                  podtrhnout krásu a autenticitu každé ženy.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">MASTER YOUR FACE</h3>
                <p>
                  Master Your Face je autorský beauty koncept Hristiny Georgievské, který propojuje
                  její dlouholeté zkušenosti z módního a vizuálního světa s osobním přístupem k výuce a
                  reprezentaci. Koncept zahrnuje individuální make-up kurzy, firemní beauty vzdělávání
                  a profesionální portréty. Učí ženy i firmy pracovat s líčením tak, aby působily
                  přirozeně, sebevědomě a reprezentativně — v každodenním i pracovním životě.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};