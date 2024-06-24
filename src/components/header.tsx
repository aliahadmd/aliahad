"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks =[
    {
        href:"/",
        label: "Home",
    },
    {
        href:"/posts",
        label: "Posts",
    },
    {
        href:"/portfolio",
        label: "Portfolio",
    },
];



const Header = () => {
    const pathname = usePathname();
  return (
     <header className="flex justify-between items-center py-4 px-7 border-b">
        <Link href="/">
        <Image
            src="/images/logo.png"
            alt="logo"
            className="w-[35px] h-[35px] rounded-md"
            width="35"
            height="35"
            />
        </Link>

        <nav>
            <ul className="flex gap-x-5 text-[14px]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={`${
                  pathname === link.href ? "text-zinc-900" : "text-zinc-400"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        </nav>
    </header>
  )
}

export default Header