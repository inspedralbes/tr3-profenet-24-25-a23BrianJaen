// import Image from "next/image";

export default function Home() {
  const user = null;
  return (
    <>
      <h1 className="text-2xl font-bold">Benvingut a ProfeNet, {user ?? "Usuari"}</h1>
      <p>Aquest es el contingut principal de la página d&apos;inici.</p>
    </>
  );
}
