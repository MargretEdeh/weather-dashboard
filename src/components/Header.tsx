import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { LuMenu } from "react-icons/lu";
import lady from "../assets/lady.jpeg"

interface HeaderProps {
    onSearch: (query: string) => void;
    onMenuClick: () => void;
  }
  
  export const Header = ({ onSearch, onMenuClick }: HeaderProps) => {
    return (
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LuMenu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Weather</h1>
        </div>
        
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <img
            src={lady}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </header>
    );
  }