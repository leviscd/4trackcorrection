import React from "react";
import ThemeToggle from "./ThemeToggle";

type Props = {
  user: { name: string };
  remaining: string;
};

const Header: React.FC<Props> = ({ user, remaining }) => {
  return (
    <header className="w-full border-b border-purple-500/10 bg-white/70 dark:bg-[#050508]/70 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 select-none cursor-pointer group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-glow-sm group-hover:shadow-glow-md transition-all">
            <span className="text-white font-bold text-xl">4</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white group-hover:text-purple-400 transition-colors">
            Track
          </span>
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-purple-500/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
          <a
            href="#"
            className="px-5 py-2 text-xs font-semibold uppercase tracking-widest rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 dark:bg-purple-500/20 border border-purple-500/20 shadow-glow-sm transition-all"
          >
            Painel
          </a>
          <a
            href="#"
            className="px-5 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-300 hover:bg-white/40 dark:hover:bg-white/5 rounded-full transition-all"
          >
            Databases
          </a>
          <a
            href="#"
            className="px-5 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-300 hover:bg-white/40 dark:hover:bg-white/5 rounded-full transition-all"
          >
            Admin
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Badge de tempo restante */}
          <span className="hidden sm:inline-block text-xs font-mono text-purple-500/70 border border-purple-500/20 rounded px-2 py-1">
            {remaining}
          </span>

          {/* Mobile Button */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-purple-500/20 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all shadow-sm hover:shadow-glow-sm"
          >
            ☰
          </button>

          {/* Toggle Dark Mode */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className="md:hidden hidden flex-col gap-2 p-4 bg-white/70 dark:bg-[#050508]/70 backdrop-blur-md border-t border-purple-500/10"
      >
        <a
          href="#"
          className="block px-4 py-2 rounded-lg text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all"
        >
          Painel
        </a>
        <a
          href="#"
          className="block px-4 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-300 hover:bg-white/40 dark:hover:bg-white/5 transition-all"
        >
          Databases
        </a>
        <a
          href="#"
          className="block px-4 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-300 hover:bg-white/40 dark:hover:bg-white/5 transition-all"
        >
          Admin
        </a>
      </nav>
    </header>
  );
};

export default Header;
