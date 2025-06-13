import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatEnginePage: React.FC = () => {
  const [messages, setMessages] = useState<
    {
      sender: string;
      text: string;
      author?: string;
      animate?: boolean;
    }[]
  >([]);
  const [input, setInput] = useState("");
  const [inputShouldAnimate, setInputShouldAnimate] = useState(true);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputAnimatedRef = useRef(false); // Track if input has animated

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // After first mount, disable input animation
    setInputShouldAnimate(false);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input, animate: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    try {
      const payload = { message: input };
      console.log("ChatEngine payload:", payload);
      const res = await axios.post(
        "http://localhost:8080/chat-engine/query",
        payload
      );
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data?.response || "No response from server.",
          author: "Talent Manager",
          animate: true,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, there was an error contacting the server.",
          author: "Talent Manager",
          animate: true,
        },
      ]);
    }
  };

  const isEmpty = messages.length === 0;

  // Use state to control input animation only on first mount
  let inputFormClass = "glass-card";
  if (inputShouldAnimate && isEmpty) {
    inputFormClass += " fade-in";
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        marginTop: 56,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: isEmpty ? "center" : "flex-start",
        background: "transparent",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: isEmpty ? "center" : "flex-end",
          alignItems: "center",
          height: isEmpty ? "100%" : undefined,
          overflowY: isEmpty ? "hidden" : "auto",
          overflowX: "hidden", // Prevent horizontal scroll
          padding: isEmpty ? 0 : "32px 0 24px 0",
        }}
        className="chat-page-main"
      >
        {isEmpty && (
          <div
            className="fade-in"
            style={{
              width: "100%",
              textAlign: "center",
              color: "var(--secondary)",
              fontSize: 22,
              fontWeight: 500,
              marginBottom: 32,
              opacity: 0.85,
              letterSpacing: 0.2,
            }}
          >
            Welcome to TalentPro Chat! Start the conversation by typing your
            message below.
          </div>
        )}
        {!isEmpty && (
          <div
            className="fade-in chat-page-messages"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              marginBottom: 24,
              overflowX: "hidden", // Prevent horizontal scroll
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.animate ? "message-in" : undefined}
                style={{
                  display: "flex",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  alignItems: "flex-end",
                  gap: 10,
                  overflowX: "hidden", // Prevent horizontal scroll
                }}
              >
                <div
                  className="glass-card"
                  style={{
                    background:
                      msg.sender === "user"
                        ? "var(--secondary)"
                        : "var(--card)",
                    color:
                      msg.sender === "user" ? "var(--card)" : "var(--primary)",
                    borderRadius:
                      msg.sender === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    padding: "12px 18px",
                    maxWidth: "70%",
                    fontSize: 17,
                    boxShadow: "0 2px 8px 0 var(--primary)11",
                    wordBreak: "break-word",
                    border:
                      msg.sender === "user"
                        ? "1.5px solid var(--secondary)"
                        : "1.5px solid var(--border)",
                    marginBottom: 2,
                    overflowX: "hidden", // Prevent horizontal scroll
                    position: "relative",
                  }}
                >
                  {msg.text}
                  {msg.sender === "bot" && msg.author && (
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--secondary)",
                        marginTop: 6,
                        fontWeight: 600,
                        opacity: 0.8,
                        textAlign: "right",
                        letterSpacing: 0.2,
                      }}
                    >
                      — {msg.author}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
        <form
          onSubmit={handleSend}
          className={inputFormClass}
          style={{
            display: "flex",
            width: "100%",
            maxWidth: 700,
            background: "var(--background)",
            borderRadius: 12,
            boxShadow: "none",
            padding: 0,
            gap: 0,
            position: isEmpty ? "relative" : "static",
            margin: isEmpty ? "0 auto" : undefined,
            justifyContent: isEmpty ? "center" : undefined,
            alignItems: "flex-end",
            border: "none",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              background: "var(--background)",
              borderRadius: 12,
              border: "1.5px solid var(--border)",
              boxShadow: "0 2px 8px 0 var(--primary)11",
              padding: 0,
              position: "relative",
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e as any);
                }
              }}
              style={{
                flex: 1,
                border: "none",
                borderRadius: 12,
                padding: 14,
                fontSize: 17,
                outline: "none",
                background: "var(--background)",
                color: "var(--text)",
                boxShadow: "none",
                resize: "none",
                minHeight: 60,
                maxHeight: 120,
                marginRight: 0,
                marginBottom: 0,
                transition:
                  "background var(--transition), color var(--transition)",
              }}
            />
            <button
              type="submit"
              className="cta-btn"
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                height: 36,
                zIndex: 2,
              }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatEnginePage;
