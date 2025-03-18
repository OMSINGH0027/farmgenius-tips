
import { useState } from 'react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'mr', name: 'मराठी' },
  { code: 'bn', name: 'বাংলা' }
];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const selectLanguage = (language: typeof languages[0]) => {
    setSelectedLang(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={cn(
          'flex items-center space-x-1 py-1 px-2 rounded-lg transition-all duration-200',
          'hover:bg-primary/10 text-foreground/80 hover:text-foreground'
        )}
      >
        <span className="text-sm font-medium">{selectedLang.code.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-40 glass-card border border-border/50 rounded-xl shadow-medium z-50 transition-all">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => selectLanguage(language)}
              className={cn(
                'block w-full text-left px-4 py-2 text-sm transition-colors',
                'hover:bg-primary/10',
                selectedLang.code === language.code ? 'text-primary font-medium' : 'text-foreground/80'
              )}
            >
              <span className="flex items-center">
                <span className="w-6 inline-block">{language.code.toUpperCase()}</span>
                <span className="ml-2">{language.name}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
