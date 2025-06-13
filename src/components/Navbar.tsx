import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  React.useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    let email = null;
    if (jwtToken) {
      try {
        // Decode JWT to get email (assuming payload is in the 2nd part and base64 encoded)
        const payload = JSON.parse(atob(jwtToken.split(".")[1]));
        email = payload.email;
      } catch (e) {
        // fallback: try to get from localStorage if you store it elsewhere
        email = localStorage.getItem("email");
      }
    }
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userType");
    try {
      if (email) {
        console.log("Logout payload:", { email });
        await axios.post("/user/logout", { email });
      }
    } catch (err) {
      // Optionally handle error (e.g., show notification)
    }
    window.location.href = "/user/home";
  };

  return (
    <nav className="navbar-glass">
      <div className="navbar-logo-wrapper">
        <Link to="/user/home" className="navbar-logo">
          TalentPro
        </Link>
      </div>
      <div className="navbar-actions">
        <button
          onClick={handleThemeToggle}
          className="navbar-btn"
          style={{
            background: theme === "dark" ? "#23242b44" : "#fff8",
            color: theme === "dark" ? "#ff9800" : "#6c47ff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 var(--primary)11",
            transition: "background var(--transition), color var(--transition)",
          }}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        {jwtToken ? (
          <button
            onClick={handleLogout}
            className="navbar-btn"
            style={{
              background: theme === "dark" ? "#23242b44" : "#fff8",
              color: theme === "dark" ? "#ff9800" : "#6c47ff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 var(--primary)11",
              transition:
                "background var(--transition), color var(--transition)",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/user/login" className="navbar-link">
              Login
            </Link>
            <Link to="/user/register" className="navbar-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
