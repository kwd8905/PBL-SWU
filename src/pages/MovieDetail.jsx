import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Loading from "../components/Loading"
import Staffs from "../components/Staffs"
import Review from "../components/Review"
import "./MovieDetail.css";


export default function MovieDetail({userName, isLoggedIn}) {
  // 특정 영화 클릭시 해당 영화의 id가 담긴 상세경로로 이동
  // movie/:movieId
  // 그리고 movieId라는 url 파라미터는 useParams를 통해 얻은
  // params 객체의 프로퍼티로 접근할 수 있다. 
  // movieId를 통해 특정 영화의 상세정보를 api로 요청한다. 
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false);
  const [movieData, setMovieData] = useState(null)
  const MOVIE_DETAIL_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/detail`
  useEffect(() => {
    // 여기에 영화 상세정보를 요청하는 코드를 작성
    fetch(MOVIE_DETAIL_API)
      .then((res) => res.json())
      .then((result) => setMovieData(result))
  }, [])
  const averageScore = movieData && movieData.averageScore ? movieData.averageScore : 0;

  return (
    <>
      {movieData === null ?
        <Loading /> :
        <section className="movie__detail-container">
          <img className="movie__poster" src={movieData.postImage} />
          <div className="movie__info-container">
            <div className="movie__title">
              <h1> {movieData.title} </h1>
              <h3>⭐️ {averageScore.toFixed(1)}</h3>
            </div>
            <div className="movie__genre">
              <h3>장르</h3>
              <div>
                {movieData.genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </div>
            </div>
            <div className="movie__staff">
              <h3>스태프 및 출연진</h3>
              {movieData.staffs.map((staff) => (
                <Staffs key={staff.id} staff={staff} />
              ))}
            </div>
            <div className="movie__plot">
              <h3> 줄거리 </h3>
              <p>{movieData.plot}</p>
            </div>
          </div>
        </section>}
      <Review userName={userName} isLoggedIn={isLoggedIn} movieId={params.movieId} />
    </>
  );
}
