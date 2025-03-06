
export default function Home() {
  const user = null;
  return (
    <>
      <main className="color-primary">
        <h1 className="text-2xl font-bold">Benvingut a ProfeNet, {user ?? "Bernat"}!</h1>
        <p>Aquest es el contingut principal de la página d&apos;inici.</p>
      </main>
    </>
  );
}
