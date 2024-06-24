"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/dashboard/posts",
    label: "Posts",
  },
  {
    href: "/dashboard/create-post",
    label: "Create Post",
  },
  {
    href: "/dashboard/portfolio",
    label: "Portfolio",
  },
];

const DashboardHeader = () => {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">

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
  );
};

export default DashboardHeader;
