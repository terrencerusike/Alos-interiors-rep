import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginSignupform = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);

    try {
      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      };

      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        reqOptions
      );

      const data = await response.json();

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        console.log("Registration successful:", data);
        toast.success("Registration successful");

        navigate("/");
      } else {
        setError(data.error?.message || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>

        <p className="loginsignup-login">
          Already have an account?
          <span>
            <Link to="/Login"> Login here </Link>
          </span>
        </p>

        <div className="loginsignup-agree">
          <input type="checkbox" name="agree" id="agree" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupform;
