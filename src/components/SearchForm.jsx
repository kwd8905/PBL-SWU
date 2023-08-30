import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm(props) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
        navigate(`/search?query=${searchTerm}`);
    }
    setSearchTerm('');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="영화를 검색하세요."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
