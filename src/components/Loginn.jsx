import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Loginn.css";

const Loginn = () => {
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
        "https://alos-strapi-repo-3.onrender.com/api/auth/local/",
        reqOptions
      );

      const data = await response.json();

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        console.log("Successful Login:", data);
        toast.success("Successful Login");

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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="email"
              name="identifier"
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
      </div>
    </div>
  );
};

export default Loginn;
