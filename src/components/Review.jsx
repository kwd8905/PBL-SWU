import { useState, useEffect } from 'react';
import './Review.css'

export default function Review({ isLoggedIn, movieId }) {
  const URL = `https://moviestates-alternative.codestates-seb.link`
  const GET_REVIEW_URL = `${URL}/reviews/movie/${movieId}`
  const POST_REVIEW_URL = `${URL}/reviews/${movieId}`
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    content: "",
    score: 0,
  })
  useEffect(() => {
    fetch(GET_REVIEW_URL)
      .then((res) => res.json())
      .then((result) => setReviews(result))
  }, [])
  // console.log(reviews)

  const handleReviewSubmitBtn = async (e) => {
    const token = localStorage.getItem('jwt');
    e.preventDefault();
    if (!newReview.score) {
      alert('평점을 입력하세요!');
      return;
    }
    const response = await fetch(POST_REVIEW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({
        ...newReview,
      })
    })
    fetchReviews()
  }

  async function fetchReviews() {
    const response = await fetch(GET_REVIEW_URL);
    const data = await response.json();
    setReviews(data);
  }


  function handleChangeReviewForm(e) {
    setNewReview({ ...newReview, content: e.target.value })
  }

  function handleChangeReviewScore(e) {
    let score = e.target.value;
    setNewReview({ ...newReview, score: Number(score) })
  }

  async function handleDeleteButton(e) {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    const reviewId = e.target.getAttribute('data-id');
    const DELETE_REVIEW_URL = `${URL}/reviews/${reviewId}`
    const response = await fetch(DELETE_REVIEW_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    console.log(response)
    fetchReviews()
  }
  console.log(isLoggedIn)

  return (
    <>
      <h2 className='review__title'>솔직감상평</h2>
      <form className={`review__submit__form  ${ !isLoggedIn ? 'hide' : ''}`}>
        <label for="score">평점</label>
        <select onChange={handleChangeReviewScore} id="score" className="review__submit__option">
          <option className="review__submit__select" placeholder="평점을 선택하세요." value="">평점을 선택하세요.</option>
          <option className="review__submit__select" value="5">⭐️5</option>
          <option className="review__submit__select" value="4">⭐️4</option>
          <option className="review__submit__select" value="3">⭐️3</option>
          <option className="review__submit__select" value="2">⭐️2</option>
          <option className="review__submit__select" value="1">⭐️1</option>
        </select>
        <lable for="review__submit__content"></lable>
        <textarea onChange={handleChangeReviewForm} cols="30" rows="5" id="review__submit__textarea" placeholder="영화에 대한 솔직한 리뷰를 작성하세요!"></textarea>
        <button className="review__submit__button" type="submit" onClick={handleReviewSubmitBtn}>평가하기</button>
      </form>
      <ul className='review__container'>
        {reviews.map((review) => (
          <li className='review__item' key={review.id}>
            <p className="review__user">{review.user.nickname}</p>
            <p className="review__content">{review.content}</p>
            <p className="review__">{review.score.toFixed(1)}</p>
            <button data-id={review.id} onClick={handleDeleteButton} type="submit">X</button>
          </li>
        ))}
      </ul>
    </>
  )
}