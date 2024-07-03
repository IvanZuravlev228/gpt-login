import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import "./AuthForm.css";

function AuthForm({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const isLogin = type === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword(password)) {
      sendUserData({ email, password });
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log("Check user email: " + email);
    setEmailSubmitted(true);
  };

  const handleSuccess = (credentionalResponse) => {
    const credentionalDecod = jwtDecode(credentionalResponse.credential);
    const googleEmail = credentionalDecod.email || "";
    const googlePassword = credentionalResponse.credential || "";

    sendUserData({
      email: googleEmail,
      password: googlePassword,
    });
  };

  const handleError = () => {
    console.log("Login failed");
  };

  function sendUserData({ email, password }) {
    if (isLogin) {
      console.log("Logging in...");
      console.log("User email: " + email);
      console.log("User password: " + password);
    } else {
      console.log("Registering...");
      console.log("User email: " + email);
      console.log("User password: " + password);
    }

    resetSubmitForm();
  }

  function resetSubmitForm() {
    setEmail("");
    setPassword("");
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, contain one uppercase letter and one special character."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="form-container">
        <img src="src/assets/gpt-icon.png" alt="Logo" className="logo" />
        <form onSubmit={emailSubmitted ? handleSubmit : handleSubmitEmail}>
          <div>
            <h2>{isLogin ? "Welcome back" : "Create an account"}</h2>
            <div className="input-container">
              <input
                type="email"
                name="email"
                value={email}
                placeholder=" "
                onChange={(e) => setEmail(e.target.value)}
                required
                id="email-input"
                className="input-field"
              />
              <label htmlFor="email-input" className="input-label">
                Email address*
              </label>
            </div>
            <div className="input-container" hidden={!emailSubmitted}>
              <p>{emailSubmitted}</p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder=" "
                onChange={(e) => setPassword(e.target.value)}
                id="pass-input"
                className={`input-field ${passwordError ? "input-error" : ""}`}
              />
              <label htmlFor="pass-input" className="input-label">
                Password*
              </label>
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={
                    showPassword
                      ? "src/assets/eye-off.png"
                      : "src/assets/eye.png"
                  }
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </button>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>
            <button type="submit" className="submit-btn">
              Continue
            </button>
          </div>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a id="redirect-link" href={isLogin ? "/register" : "/login"}>
              {isLogin ? "Sign up" : "Login"}
            </a>
          </p>
        </form>
        <div className="or-divider">
          <span className="or-text">OR</span>
        </div>
        <div className="google-login">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </>
  );
}

AuthForm.propTypes = {
  type: PropTypes.oneOf(["login", "register"]).isRequired,
};

export default AuthForm;
