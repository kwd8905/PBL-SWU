import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login&Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    birth: ''
  });
  const [errors, setErrors] = useState({});

  function validate(data) {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,16}$/;

    if (!emailPattern.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!passwordPattern.test(data.password)) {
      errors.password = "Password must contain at least one letter, one number, one special character, and be between 8-16 characters";
    }
    if (!data.birth) {
      errors.birth = "Birth should be in YYYY-MM-DD format";
    }
    return errors;
  }

  async function handleSignupBtn(e) {
    e.preventDefault(); // form의 기본 submit 동작을 막습니다.
    const url = "https://moviestates-alternative.codestates-seb.link/auth/register";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/MovieList");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 입력값이 변경될 때마다 유효성 검사 실행
    const newErrors = validate({ ...formData, [name]: value });
    setErrors(newErrors);
  };
  console.log(formData)

  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Sign Up</h2>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="nickname"
            placeholder="Nickname"
            value={formData.nickname}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleInputChange}
          />
          {errors.birth && <span className="error">{errors.birth}</span>}
        </div>
        <button type="submit" onClick={handleSignupBtn}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
