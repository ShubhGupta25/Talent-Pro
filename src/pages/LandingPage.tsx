import React from "react";

const styles = {
  wrapper: {
    minHeight: "calc(100vh - 56px)",
    marginTop: 56,
    background: "transparent",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "Segoe UI, Arial, sans-serif",
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  blurBg: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none" as const,
    background:
      "radial-gradient(circle at 20% 30%, var(--primary)22 0%, transparent 70%)," +
      "radial-gradient(circle at 80% 70%, var(--secondary)22 0%, transparent 70%)",
    filter: "blur(80px)",
    opacity: 0.7,
    transition: "background var(--transition), filter var(--transition)",
  },
  hero: {
    display: "flex",
    marginTop: 80,
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    gap: 24,
    zIndex: 2,
    position: "relative" as const,
    animation: "fadeIn 0.7s var(--transition) both",
  },
  title: {
    fontSize: 52,
    fontWeight: 900,
    color: "var(--primary)",
    marginBottom: 12,
    letterSpacing: 1,
    textShadow: "0 2px 24px var(--secondary)33",
    lineHeight: 1.1,
    transition: "color var(--transition), text-shadow var(--transition)",
  },
  subtitle: {
    fontSize: 24,
    color: "var(--secondary)",
    marginBottom: 24,
    fontWeight: 500,
    textShadow: "0 2px 16px var(--primary)22",
    transition: "color var(--transition), text-shadow var(--transition)",
  },
  cta: {
    display: "flex",
    gap: 18,
    marginTop: 18,
  },
  button: {
    background: "var(--cta-gradient)",
    color: "var(--primary)",
    border: "none",
    borderRadius: 8,
    padding: "14px 32px",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "var(--shadow)",
    letterSpacing: 1,
    transition: "background 0.2s, color 0.2s",
  },
  githubLogo: {
    width: 60,
    height: 60,
    marginBottom: 24,
    filter: "grayscale(0.2)",
  },
  card: {
    maxWidth: 480,
    margin: "0 auto",
    padding: 40,
    borderRadius: "var(--card-radius)",
    background: "var(--card)",
    boxShadow: "var(--shadow)",
    backdropFilter: "var(--glass-blur)",
    border: "1.5px solid var(--border)",
    transition: "background var(--transition), box-shadow var(--transition)",
  },
  footer: {
    marginTop: 80,
    color: "var(--footer)",
    fontSize: 15,
    textAlign: "center" as const,
    width: "100%",
    padding: "24px 0 12px 0",
    zIndex: 2,
    position: "relative" as const,
    letterSpacing: 0.2,
  },
};

const LandingPage: React.FC = () => (
  <div style={styles.wrapper}>
    <div style={styles.blurBg}></div>
    <section style={{ ...styles.hero }} className="fade-in">
      <h1 style={styles.title}>Build, Connect, and Grow Your Talent</h1>
      <div style={styles.subtitle}>
        The professional platform for recruiters and employees.
        <br />
        Sign up to discover opportunities or find the best talent.
      </div>
      <div style={styles.cta}>
        <a href="/user/register">
          <button className="cta-btn">Sign Up</button>
        </a>
        <a href="/user/login">
          <button className="cta-btn">Sign In</button>
        </a>
      </div>
    </section>
    <footer style={styles.footer}>
      &copy; {new Date().getFullYear()} TalentPro. All rights reserved.
    </footer>
  </div>
);

export default LandingPage;
