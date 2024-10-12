import { DarkModeToggle } from "./DarkModeToggle";

function Footer() {
  return (
    <footer className="mt-auto text-center text-zinc-400 dark:text-zinc-500 py-5 px-7 border-t dark:border-zinc-700 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <small>&copy; 2024. All rights reserved.</small>
        <DarkModeToggle />
      </div>
    </footer>
  );
}

export default Footer;
