import React from 'react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <label className="searchilein">
      Search by Name/Description:
      <input style={{
        borderRadius: '10px',
    }}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
      />
    </label>
  );
};

export default SearchBar;
