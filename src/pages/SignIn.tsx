import React, { useState } from "react";
import axios from "axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // localStorage.setItem("jwtToken", "xyz123");
  // localStorage.setItem("userType", "employee"); 
  // Temporary for testing, remove in production
  // // Remove the above line in production, it's just for testing purposes
  // // Ensure you have a valid JWT token in localStorage for testing

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { email, password };
      console.log("SignIn payload:", payload);
      const response = await axios.post(
        "http://localhost:8080/user/login",
        payload
      );
      // Assuming the token is in response.data.token and userType in response.data.userType
      if (response.data && response.data.token && response.data.userType) {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userType", response.data.userType);
        if (response.data.userType === "recruiter") {
          window.location.href = "/user/chat";
        } else {
          window.location.href = "/user/input";
        }
      } else {
        setError("Invalid response from server.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Sign in failed. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        marginTop: 56,
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background var(--transition)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="glass-card fade-in"
        style={{
          color: "var(--text)",
          width: 370,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          position: "relative",
        }}
      >
        <h2
          style={{
            color: "var(--primary)",
            marginBottom: 8,
            textAlign: "center",
            letterSpacing: 1,
            fontWeight: 800,
            fontSize: 28,
            textShadow: "0 2px 16px var(--secondary)22",
            transition:
              "color var(--transition), text-shadow var(--transition)",
          }}
        >
          Sign In
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: 14,
            borderRadius: 12,
            border: "1.5px solid var(--border)",
            outline: "none",
            fontSize: 17,
            background: "var(--background)",
            color: "var(--text)",
            marginBottom: 2,
            boxShadow: "0 2px 8px 0 var(--primary)11",
            transition: "background var(--transition), color var(--transition)",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: 14,
            borderRadius: 12,
            border: "1.5px solid var(--border)",
            outline: "none",
            fontSize: 17,
            background: "var(--background)",
            color: "var(--text)",
            marginBottom: 2,
            boxShadow: "0 2px 8px 0 var(--primary)11",
            transition: "background var(--transition), color var(--transition)",
          }}
        />
        {error && (
          <div
            style={{
              color: "var(--error)",
              fontSize: 14,
              textAlign: "center",
              marginTop: -10,
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}
        <button type="submit" className="cta-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
