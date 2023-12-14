import '../styles/Search.scss';

import { Button, SubmitButton } from '../../button';
import React, { useEffect } from 'react';

import { TextInput } from '../../text-input';

type SearchProps = {
  onChange?: (text: string) => void;
  value?: string;
  placeholder?: string;
  onSearch: (text: string) => void;
};

const Search = ({
  onChange,
  value,
  placeholder = 'Try search something ^3',
  onSearch
}: SearchProps) => {
  const [searchValue, setSearchValue] = React.useState('');

  useEffect(() => {
    if (value === undefined) return;
    setSearchValue(value);
  }, [value]);

  const onInnerChange = (text: string) => {
    setSearchValue(text);
    if (onChange) onChange(text);
  };

  return (
    <div className="header-posts-search">
      <div className="header-posts-search__wrapper">
        <TextInput
          onChange={onInnerChange}
          value={searchValue}
          placeholder={placeholder}
          type="text"
        />
        <SubmitButton
          onClick={() => {
            onSearch(searchValue);
          }}
          text="Search"
        />
      </div>
    </div>
  );
};

export default Search;
