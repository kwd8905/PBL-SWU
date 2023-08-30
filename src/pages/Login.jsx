import React, { useState } from 'react';
import './Login&Signup.css';
import { useNavigate } from 'react-router-dom';

function Login({ getUserName, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://moviestates-alternative.codestates-seb.link/auth/login"; // 로그인 API URL
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('jwt', data.accessToken);  // JWT 토큰을 로컬 스토리지에 저장
      navigate("/");
      onLogin();  // 로그인 상태 변경
      getUserName() 
    } else {
      console.error('Login failed:', data.message);
      alert(data.message);  // 실패 시 사용자에게 오류 메시지를 표시합니다.
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
