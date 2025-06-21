import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('q');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Results for: "{query}"</h2>
      {/* Later: map through actual products */}
    </div>
  );
};

export default SearchResults;
