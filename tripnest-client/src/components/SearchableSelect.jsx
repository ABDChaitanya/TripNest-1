import React, { useState, useEffect, useRef } from 'react';
import './searchableselect.css';

export default function SearchableSelect({ options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(0); // Tracks keyboard focus

  const containerRef = useRef(null);
  const listContainerRef = useRef(null); // Ref for the dropdown wrapper
  const itemRefs = useRef([]); // Dynamic array of refs for items

  // Sync item refs array length with current filtered options
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Proactive autoscroll effect when focused item changes
  useEffect(() => {
    if (isOpen && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex].scrollIntoView({
        behavior: 'smooth', // Smooth animation
        block: 'nearest',   // Prevent the whole page from scrolling
      });
    }
  }, [focusedIndex, isOpen]);

  // Reset focus index back to top whenever search term updates
  useEffect(() => {
    setFocusedIndex(0);
  }, [searchTerm]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option);
    setIsOpen(false);
  };

  // Keyboard navigation controller
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') setIsOpen(true);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % filteredOptions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className="searchable-select">
      {/* Search Input Container */}
      <div className="searchable-select__control">
        <input
          type="text"
          className="searchable-select__input"
          placeholder="Type city or airport code..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        
        <button 
          type="button"
          className="searchable-select__toggle"
          aria-label={isOpen ? 'Close airport suggestions' : 'Open airport suggestions'}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className={`searchable-select__chevron ${isOpen ? 'is-open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Floating Dropdown Results */}
      {isOpen && (
        <div 
          ref={listContainerRef}
          className="searchable-select__options"
          role="listbox"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`searchable-select__option${focusedIndex === index ? ' is-focused' : ''}${selectedOption === option ? ' is-selected' : ''}`}
                role="option"
                aria-selected={selectedOption === option}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="searchable-select__empty">No matching airports</div>
          )}
        </div>
      )}
    </div>
  );
};
