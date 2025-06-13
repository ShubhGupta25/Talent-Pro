import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import InputPage from "./pages/InputPage";
import Navbar from "./components/Navbar";
import ChatEnginePage from "./pages/ChatEnginePage";
import "./App.css";

function App() {
  const jwtToken = localStorage.getItem("jwtToken");
  const userType = localStorage.getItem("userType");

  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          {jwtToken ? (
            <>
              {userType === "recruiter" && (
                <Route path="/user/chat" element={<ChatEnginePage />} />
              )}
              {userType === "employee" && (
                <Route path="/user/input" element={<InputPage />} />
              )}
              {/* Default route for logged-in users */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={userType === "recruiter" ? "/user/chat" : "/user/input"}
                    replace
                  />
                }
              />
            </>
          ) : (
            <>
              <Route path="/user/home" element={<LandingPage />} />
              <Route path="/user/login" element={<SignIn />} />
              <Route path="/user/register" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/user/home" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
