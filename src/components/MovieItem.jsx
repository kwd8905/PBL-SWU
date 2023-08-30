import { Link } from 'react-router-dom';

export default function MovieItem({ movie }) {
  // movie.averageScore가 만약 없는 값(falsy)인 경우
  // 그냥 0으로 표시하고
  // 값이 잘 들어있으면 그 값 그대로 averageScore에 할당해줘
  const averageScore = movie.averageScore || 0;
  return (
    <Link to={`/MOVIE/${movie.id}`}>
      <li className="movie__item">
        <img src={movie.postImage} alt={`영화 ${movie.title}의 포스터`} />
        <div className="movie__info__wrapper">
          <span>{movie.title}</span>
          <span>⭐️{averageScore.toFixed(1)}</span>
        </div>
      </li>
    </Link>
  )
}
