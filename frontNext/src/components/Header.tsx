import ToogleTheme from "./ToogleTheme";

export default function Header() {
  return (
    <div >
      <div className="sm:hidden flex items-center justify-between">
        <span className="font-bold px-3 py-2 text-2xl">ProfeNet</span>
      </div>
      <div className="border-b-1 border-primary bg-background md:p-6 relative">
        <ToogleTheme />
      </div>
    </div>
  );
}