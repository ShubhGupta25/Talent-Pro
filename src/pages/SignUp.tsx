import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const toggleStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  toggle: (active: boolean) => ({
    padding: "10px 28px",
    borderRadius: 24,
    border: active ? `2px solid var(--primary)` : `2px solid var(--border)`,
    background: active ? "var(--secondary)" : "var(--background)",
    color: active ? "var(--card)" : "var(--primary)",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: active ? `0 4px 16px 0 var(--primary)22` : "none",
    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
    outline: "none",
  }),
};

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
  const [role, setRole] = useState<"recruiter" | "employee">("employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== retype) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const payload = {
        email,
        password,
        registrationType: role,
      };
      console.log("SignUp payload:", payload);
      await axios.post("http://localhost:8080/user/register", payload);
      navigate("/user/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)", // 56px is the navbar height
        marginTop: 56, // offset for fixed navbar
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.7s cubic-bezier(.4,2,.6,1)",
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
            textAlign: "center",
            marginBottom: 8,
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: 1,
            textShadow: "0 2px 16px var(--secondary)22",
            transition:
              "color var(--transition), text-shadow var(--transition)",
          }}
        >
          Sign Up
        </h2>
        <div style={toggleStyles.container as React.CSSProperties}>
          <button
            type="button"
            style={
              {
                ...toggleStyles.toggle(role === "employee"),
                background:
                  role === "employee"
                    ? "var(--secondary)"
                    : "var(--background)",
                color: role === "employee" ? "var(--card)" : "var(--primary)",
                border:
                  role === "employee"
                    ? "2px solid var(--primary)"
                    : "2px solid var(--border)",
                boxShadow:
                  role === "employee"
                    ? "0 4px 16px 0 var(--primary)22"
                    : "none",
                fontWeight: 700,
                fontSize: 16,
                transition: "all var(--transition)",
              } as React.CSSProperties
            }
            onClick={() => setRole("employee")}
            aria-pressed={role === "employee"}
          >
            Employee
          </button>
          <span
            style={{
              color: "var(--primary)",
              fontWeight: 700,
              fontSize: 18,
              transition: "color var(--transition)",
            }}
          >
            or
          </span>
          <button
            type="button"
            style={
              {
                ...toggleStyles.toggle(role === "recruiter"),
                background:
                  role === "recruiter"
                    ? "var(--secondary)"
                    : "var(--background)",
                color: role === "recruiter" ? "var(--card)" : "var(--primary)",
                border:
                  role === "recruiter"
                    ? "2px solid var(--primary)"
                    : "2px solid var(--border)",
                boxShadow:
                  role === "recruiter"
                    ? "0 4px 16px 0 var(--primary)22"
                    : "none",
                fontWeight: 700,
                fontSize: 16,
                transition: "all var(--transition)",
              } as React.CSSProperties
            }
            onClick={() => setRole("recruiter")}
            aria-pressed={role === "recruiter"}
          >
            Recruiter
          </button>
        </div>
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
        <input
          type="password"
          placeholder="Retype Password"
          value={retype}
          onChange={(e) => setRetype(e.target.value)}
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
              textAlign: "center",
              fontWeight: 600,
              marginBottom: 4,
              fontSize: 14,
              transition: "color var(--transition)",
            }}
          >
            {error}
          </div>
        )}
        <button type="submit" className="cta-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
