import MovieItem from '../components/MovieItem';
// import movieList from '../static/movieList.json';
import { useEffect, useState } from 'react';

export default function MovieList() {
  const [movieData, setMovieData] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const SERVER_API = "https://moviestates-alternative.codestates-seb.link/movies/top";

  const fetchData = () => {
    fetch(SERVER_API)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data.data);
      })
  }

  useEffect(() => {
    fetchData();
  })

  // console.log(movieData)

  return (
    <>
      <h1>인기영화 TOP 10</h1>
      <ul className="movie__container">
        {!movieData ? (<Loading />) : 
          (movieData.map((movie) =>
          <MovieItem key={movie.id} movie={movie} />))
        }
      </ul>
    </>
  )
}

