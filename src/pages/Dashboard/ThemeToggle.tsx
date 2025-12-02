import React, { useEffect, useState } from 'react';
import * as Lucide from 'lucide-react';


const ThemeToggle: React.FC = () => {
const [isDark, setIsDark] = useState(() => {
const saved = localStorage.getItem('theme');
if (saved) return saved === 'dark';
return true; // default dark
});


useEffect(() => {
const html = document.documentElement;
if (isDark) html.classList.add('dark');
else html.classList.remove('dark');
localStorage.setItem('theme', isDark ? 'dark' : 'light');
}, [isDark]);


return (
<button onClick={() => setIsDark((s) => !s)} className="relative group h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-purple-500/20 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-500/50 transition-all shadow-sm hover:shadow-glow-sm">
<Lucide.Sun className={`w-5 h-5 absolute transition-all duration-300 ${isDark ? 'rotate-0 scale-0' : 'rotate-0 scale-100'}`} />
<Lucide.Moon className={`w-5 h-5 absolute transition-all duration-300 ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
</button>
);
};


export default ThemeToggle;