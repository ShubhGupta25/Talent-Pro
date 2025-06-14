import React, { useState } from "react";
import axios from "axios";

const InputPage: React.FC = () => {
  const [githubUrl, setGithubUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("githubUrl", githubUrl);
      if (file) formData.append("file", file);
      console.log("InputPage payload:", { githubUrl, file });
      const jwtToken = localStorage.getItem("jwtToken");
      await axios.post("http://localhost:8080/user/details", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
      });
      setSubmitted(true);
    } catch (err: any) {
      alert(
        err?.response?.data?.message || "Submission failed. Please try again."
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
      }}
    >
      {submitted ? (
        <h1
          style={{
            fontWeight: 900,
            fontSize: 36,
            color: "var(--primary)",
            background: "var(--background)",
            borderRadius: 18,
            padding: "48px 36px",
            boxShadow: "0 4px 32px 0 var(--primary)22",
            textAlign: "center",
            letterSpacing: 1,
            textShadow: "0 2px 16px var(--secondary)22",
            transition: "color var(--transition), background var(--transition)",
            margin: 0,
          }}
        >
          Thankyou for sharing the details with us!
        </h1>
      ) : (
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
            Submit GitHub URL & File
          </h2>
          <input
            type="url"
            placeholder="GitHub Repository URL"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
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
              transition:
                "background var(--transition), color var(--transition)",
            }}
          />
          <label
            htmlFor="file-upload"
            style={{
              background: "var(--background)",
              color: "var(--primary)",
              border: "1.5px solid var(--border)",
              borderRadius: 12,
              padding: 14,
              fontSize: 17,
              cursor: "pointer",
              marginBottom: 2,
              boxShadow: "0 2px 8px 0 var(--primary)11",
              display: "block",
              textAlign: "center",
              transition:
                "background var(--transition), color var(--transition)",
            }}
          >
            {fileName || "Upload File"}
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
          <button type="submit" className="cta-btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default InputPage;
