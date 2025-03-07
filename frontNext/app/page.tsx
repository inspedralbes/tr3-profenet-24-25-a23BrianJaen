
export default function Home() {
  const user = null;
  return (
    <>
      <main className="color-primary">
        <div className="inline-block border border-gray-300 p-2 rounded-lg mb-6">
          <span className="text-4xl font-bold">Inici</span>
        </div>
        <h2 className="text-lg font-semibold mb-2">Benvingut a ProfeNet, {user ?? "Bernat"}!</h2>
        <p>Aquest es el contingut principal de la página d&apos;inici.</p>
      </main>
    </>
  );
}
