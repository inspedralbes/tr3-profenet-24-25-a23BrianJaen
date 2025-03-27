
export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-primary">ProfeNet</h1>
        <p className="text-xl text-primary/80 max-w-2xl mx-auto">
          La plataforma que connecta professors
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-semibold mb-3 text-primary">Professors</h3>
          <p className="text-primary/70">
            Accedeix al nostre directori de professors qualificats i experts en diferents àrees
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-semibold mb-3 text-primary">Cursos</h3>
          <p className="text-primary/70">
            Explora la nostra àmplia gamma de cursos i materials educatius
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-semibold mb-3 text-primary">Comunitat</h3>
          <p className="text-primary/70">
            Forma part d&apos;una comunitat educativa en constant creixement
          </p>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6 text-primary">Com funciona?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4">
            <div className="text-2xl font-bold mb-2 text-primary">1</div>
            <p className="text-primary/70">Explora el nostre catàleg de professors</p>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold mb-2 text-primary">2</div>
            <p className="text-primary/70">Descobreix els seus cursos i especialitats</p>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold mb-2 text-primary">3</div>
            <p className="text-primary/70">Connecta i comença a aprendre</p>
          </div>
        </div>
      </section>
    </main>
  );
}
