import ToogleTheme from "./ToogleTheme";

export default function Header() {
  return (
    // <header className="flex items-center justify-between p-4">
    //   <h1 className="text-2xl font-bold">ProfeNet</h1>
    // </header>
    <div className="border-b-1 border-gray-200 p-6 relative">
      <ToogleTheme />
    </div>
  );
}