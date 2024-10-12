"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DarkModeToggle } from "./DarkModeToggle";


const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
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
    <aside className="w-64 bg-white dark:bg-gray-800 h-screen fixed left-0 top-0 border-r dark:border-gray-700">
      <nav className="py-4">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={`block py-2 px-4 ${
                  pathname === link.href
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        </nav>
      <div className="absolute bottom-4 left-4">
        <DarkModeToggle />
      </div>
    </aside>
  );
};

export default DashboardHeader;
