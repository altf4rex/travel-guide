import Link from "next/link";
import SearchInput from "./SearchInput";
import LanguageSwitch from "./LanguageSwitch";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
    return (
      <header className="flex justify-between items-center px-10 py-3">
            <Link href="/" className="flex items-center">
                <Image 
                  src="/logo.svg"
                  alt="Japan Explorer" 
                  width={91.5}
                  height={119.5}
                />
            </Link>

        <div className="flex">
            <LanguageSwitch />
            <ThemeSwitch />
        </div>
      </header>
    );
}
  