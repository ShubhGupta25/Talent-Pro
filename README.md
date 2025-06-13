# TalentPro

A modern, professional React (TypeScript) talent management platform with dark/light themes, animated UI, glassmorphism, and role-based access for recruiters and employees.

## Features

- Responsive, theme-aware UI (dark/light toggle)
- Glassmorphism and premium color palette
- Animated transitions and modern design
- Role-based access: recruiter (chat engine), employee (input page)
- JWT authentication and user type stored in localStorage
- API integration for registration, login, user details, and chat engine

## API Endpoints Used

### 1. Register User

- **Endpoint:** `POST http://localhost:8080/user/register`
- **Payload:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "registrationType": "recruiter" | "employee"
  }
  ```
- **Response:**
  - Success: 200 OK
  - Error: `{ message: string }`

### 2. Login User

- **Endpoint:** `POST http://localhost:8080/user/login`
- **Payload:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<jwt-token>",
    "userType": "recruiter" | "employee"
  }
  ```
- **Client stores:**
  - `jwtToken` and `userType` in localStorage

### 3. User Details Submission (Employee)

- **Endpoint:** `POST http://localhost:8080/user/details`
- **Payload:** `multipart/form-data`
  - `githubUrl`: string
  - `file`: file (optional)
- **Response:**
  - Success: 200 OK
  - Error: `{ message: string }`

### 4. Chat Engine Query (Recruiter)

- **Endpoint:** `POST http://localhost:8080/chat-engine/query`
- **Payload:**
  ```json
  {
    "message": "Your chat message here"
  }
  ```
- **Response:**
  ```json
  {
    "response": "Bot reply here"
  }
  ```

### 5. Logout

- **Endpoint:** `POST /user/logout`
- **Payload:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:**
  - Success: 200 OK

## LocalStorage Keys

- `jwtToken`: JWT authentication token
- `userType`: "recruiter" or "employee"
- `theme`: "dark" or "light"

## Getting Started

1. Clone the repo and install dependencies:
   ```sh
   git clone https://github.com/ShubhGupta25/Talent-Pro.git
   cd Talent-Pro
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```
3. Ensure your backend API is running at `http://localhost:8080`.

## Project Structure

- `src/pages/` — All main pages (Landing, SignIn, SignUp, InputPage, ChatEnginePage)
- `src/components/` — Navbar and shared UI components
- `src/index.css` — Global styles, themes, and responsive design

## Notes

- Only recruiters can access the chat engine; only employees can access the input page.
- All API payloads are logged to the browser console for debugging.
- For production, update API endpoints and security as needed.

---

**Made with ❤️ using React, TypeScript, and modern UI best practices.**
