import React from 'react';



function SearchBar({
  filterText,
  onFilterTextChange
}) {
  return (
    <form>
       <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} /> 
    </form>
  );
}

export default SearchBar;
