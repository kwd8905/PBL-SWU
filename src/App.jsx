import "./App.css";
import { useState, useEffect } from 'react';
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResult";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
      getUserName()
    }
  }, []);

  const getUserName = async () => {
    const url = 'https://moviestates-alternative.codestates-seb.link/users/me';
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      // return data.name; // 또는 원하는 다른 속성을 반환합니다.
      setUserName(data.nickname);

    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  }

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     getUserName();
  //   }
  // }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <BrowserRouter>
      <Header userName={userName} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main id="main-container">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:movieId" element={<MovieDetail userName={userName} isLoggedIn={isLoggedIn}/>} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login getUserName={getUserName} onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
