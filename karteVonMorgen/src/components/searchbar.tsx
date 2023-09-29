import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        // Hier können Sie die Suchfunktion implementieren, z. B. Integration mit einer API
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Suche nach Orten..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch}>Suchen</button>
        </div>
    );
};

export default SearchBar;
