import '../styles/Select.scss';

import React, { useEffect, useRef, useState } from 'react';

// Icon component
const Icon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="#222"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isOpen ? 'translate' : ''}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

// CloseIcon component
const CloseIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};

interface CustomSelectProps {
  placeHolder?: string;
  options: Option[];
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange?: any;
  value?: Option;
  align?: 'left' | 'right';
}

interface Option {
  label: string;
  value: string;
}

// CustomSelect component
const CustomSelect = ({
  placeHolder = '',
  options,
  isMulti = false,
  isSearchable = false,
  onChange = () => {},
  value,
  align = 'left'
}: CustomSelectProps) => {
  // State variables using React hooks
  const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
  const [selectedValue, setSelectedValue] = useState<Option[] | Option | null>(
    isMulti ? [] : null
  ); // Stores the selected value(s)
  const [searchValue, setSearchValue] = useState(''); // Stores the value entered in the search input
  const searchRef = useRef<HTMLInputElement | null>(null); // Reference to the search input element
  const inputRef = useRef<HTMLInputElement | null>(null); // Reference to the custom select input element

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const handleInputClick = (e: any) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (
      !selectedValue ||
      (Array.isArray(selectedValue) && selectedValue.length === 0)
    ) {
      return placeHolder;
    }
    if (isMulti && Array.isArray(selectedValue)) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option, index) => (
            <div key={`${option.value}-${index}`} className="dropdown-tag-item">
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    } else if (!Array.isArray(selectedValue)) return selectedValue.label;
  };

  const removeOption = (option: Option) => {
    if (Array.isArray(selectedValue))
      return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e: any, option: Option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    if (newValue) setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option: Option) => {
    let newValue;
    if (isMulti && Array.isArray(selectedValue)) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    if (newValue) setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: Option) => {
    if (isMulti && Array.isArray(selectedValue)) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }

    if (!selectedValue) {
      return false;
    }

    if (!Array.isArray(selectedValue)) {
      return selectedValue.value === option.value;
    }
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  return (
    <div className="custom--dropdown-container">
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div
          className={`dropdown-selected-value ${
            !selectedValue ||
            (Array.isArray(selectedValue) && selectedValue.length === 0)
              ? 'placeholder'
              : ''
          }`}
        >
          {getDisplay()}
        </div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon isOpen={showMenu} />
          </div>
        </div>
      </div>

      {showMenu && (
        <div className={`dropdown-menu alignment--${align || 'auto'}`}>
          {isSearchable && (
            <div className="search-box">
              <input
                className="form-control"
                onChange={onSearch}
                onClick={(e) => e.stopPropagation()}
                value={searchValue}
                ref={searchRef}
                placeholder="Search"
              />
            </div>
          )}
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item ${isSelected(option) && 'selected'}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
