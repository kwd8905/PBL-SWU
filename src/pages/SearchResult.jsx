import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieItem from '../components/MovieItem.jsx'
import '../App.css';

function SearchResults(props) {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");


  useEffect(() => {
    fetch(`https://moviestates-alternative.codestates-seb.link/movies?page=1&limit=10&title=${query}`)
      .then(response => response.json())
      .then(data => setMovies(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [query]);

  return (
    <>
      <h2>{query}에 대한 검색 결과</h2>
      <ul className="movie__container">
        {!movies? <Loading /> : 
          movies.map(movie => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
}

export default SearchResults;
