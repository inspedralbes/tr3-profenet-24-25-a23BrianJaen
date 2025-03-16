import Link from "next/link";
import ToogleTheme from "./ToogleTheme";

export default function Header() {
  return (
    <div>
      <div className="flex items-center justify-between bg-background md:px-3 md:py-2 sm:px-2 sm:py-1 border-b border-primary">
        <Link href="/" className="font-bold text-2xl">
          <span>ProfeNet</span>
        </Link>
        <ToogleTheme />
      </div>
    </div>
  );
}