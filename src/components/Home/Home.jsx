import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <main className="app">
      <div className="header">
        <img src="src/assets/gpt-icon.png" alt="Logo" className="logo" />
        <p>Welcome GPT</p>
        <p>Login with your OpenAI account to continue</p>
      </div>
      <div className="buttons">
        <button className="log-reg-btn" onClick={handleLoginClick}>
          Log in
        </button>
        <button className="log-reg-btn" onClick={handleRegisterClick}>
          Sign up
        </button>
      </div>
    </main>
  );
}

export default Home;
