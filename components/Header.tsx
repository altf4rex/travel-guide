import Link from "next/link";
import SearchInput from "./SearchInput";
import LanguageChangeButton from "./LanguageChangeButton";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
    return (
      <header className="flex justify-between items-center px-10 py-3">
        <div className="flex">
            <Link href="/" className="flex items-center">
                <svg className="mr-3 mb-[1px] " width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.333333 0.833333H4.7778V5.2778H9.2222V9.7222H13.6667V14.1667H0.333333V0.833333Z" fill="#121417"/>
                </svg>
                <p className="mr-8 text-lg font-bold text-primaryDark dark:text-primaryLight">Globe Trotter</p>
            </Link>
            <SearchInput /> 
        </div>
        <div className="flex">
            <LanguageChangeButton />
            <ThemeSwitch />
            <Link 
            className="ml-8"
            href="/account">
                <Image 
                    className="rounded-full"
                    src="/avatar-demo.jpg"
                    alt="avatar"
                    width={42}
                    height={41}
                />
            </Link>
        </div>
      </header>
    );
}
  