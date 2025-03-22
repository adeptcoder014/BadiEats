import { useState } from "react";
import { CiSquareCheck } from "react-icons/ci";

const themes = [

  { id: "dark", name: "Dark" },
  { id: "light", name: "Light" },
];

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState("erp");
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    document.documentElement.className = theme;
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-white text-text-muted py-2 px-4 rounded-lg shadow-sm  transition-all"
      >
        <span>{themes.find((t) => t.id === selectedTheme)?.name}</span>
        <CiSquareCheck size={20} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-xl border border-[var(--color-muted)] z-[var(--z-index-overlay)] overflow-hidden">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`flex items-center justify-between w-full text-left px-4 py-3 hover:bg-[var(--color-neutral-200)] transition-colors ${selectedTheme === theme.id ? "font-semibold text-[var(--color-primary)]" : "text-gray-700"
                }`}
            >
              {theme.name}
              {selectedTheme === theme.id && <CiSquareCheck size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
