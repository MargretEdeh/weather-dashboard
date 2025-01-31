import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
  
    // Debounce the search query to prevent too many API calls
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedQuery(query);
      }, 500); // Wait 500ms after the user stops typing
  
      return () => clearTimeout(timer);
    }, [query]);
  
    // Trigger search when debounced query changes
    useEffect(() => {
      if (debouncedQuery.length >= 2) {
        onSearch(debouncedQuery);
      }
    }, [debouncedQuery, onSearch]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a location"
            className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </form>
    );
  };