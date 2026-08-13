# AI Java Code Review Assistant

> AI-powered code review platform built with Spring Boot + MongoDB + Gemini AI + React.

---

<p align="center">
  <a href="https://ai-java-code-reviewer.onrender.com/">
    <img src="https://img.shields.io/badge/Live%20Demo-🌐%20Visit-green?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<p align="center"><i>Interactive snapshots from MY AI powerd code reviewer java / java script ,</i></p>

<img width="1908" height="871" alt="image" src="https://github.com/user-attachments/assets/4410db73-0633-48a2-8bf3-0997b636ffd7" />
 <img width="1920" height="3317" alt="image" src="https://github.com/user-attachments/assets/ac67d039-14e6-4e3a-8379-a6143a7ade26" /><br><br>




## Features

- **Register / Login** with JWT authentication
- **Paste code** (any size) or **drag-and-drop upload** `.java` / `.js` files
- AI review powered by **Gemini 2.0 Flash** returning:
  - Overall Score (0–100)
  - Pros & Cons
  - Security Issues
  - Performance Suggestions
  - Clean Code Suggestions
  - Time & Space Complexity
  - Optimized / Corrected Code
- **Review History** — all past reviews saved per user
- **Profile** management
- Dark glassmorphism UI (React + Tailwind CSS)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 21, Spring Boot 3.5, Maven |
| Database | MongoDB (Atlas or local) |
| Auth | Spring Security + JWT (jjwt 0.12) |
| AI | Google Gemini API (gemini-2.0-flash) |
| Frontend | React 18, Vite, Tailwind CSS 3, React Router 6 |
| Deploy | Render (backend), Vercel / Netlify (frontend) |

---

## Project Structure

```
ai-code-reviewer/
├── backend/          # Spring Boot app
│   ├── src/main/java/com/aicode/backend/
│   │   ├── config/       SecurityConfig, MongoConfig
│   │   ├── controller/   AuthController, ReviewController, UserController
│   │   ├── dto/          Request & Response DTOs
│   │   ├── entity/       User, CodeReview, Role
│   │   ├── exception/    GlobalExceptionHandler + custom exceptions
│   │   ├── repository/   UserRepository, ReviewRepository
│   │   ├── security/     JwtService, JwtAuthenticationFilter
│   │   └── service/      AuthService, GeminiService, ReviewService, UserDetailsServiceImpl
│   └── src/main/resources/
│       └── application.properties
└── frontend/         # React app
    └── src/
        ├── api/          axios.js (JWT interceptor)
        ├── components/   Navbar, ProtectedRoute, ReviewReport
        ├── context/      AuthContext
        └── pages/        Landing, Login, Register, Dashboard, History, Profile
```

---

## Local Development

### Prerequisites

- Java 21+
- Maven 3.8+
- Node.js 20+
- MongoDB running locally **OR** a free [MongoDB Atlas](https://cloud.mongodb.com) cluster
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier available)

---

### 1 — Backend

#### Set environment variables

Copy `.env.example` and fill in your values:

```
MONGODB_URI=mongodb://localhost:27017/ai_code_reviewer
# or Atlas: mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/ai_code_reviewer

JWT_SECRET=at-least-32-characters-of-random-secret
JWT_EXPIRATION=86400000

GEMINI_API_KEY=your-key-here
GEMINI_MODEL=gemini-3.6-flash
PORT=8080
```

#### Run

```bash
cd backend

# Export env vars (Mac/Linux)
export MONGODB_URI="..."
export JWT_SECRET="..."
export GEMINI_API_KEY="..."

# Windows PowerShell
$env:MONGODB_URI="..."
$env:JWT_SECRET="..."
$env:GEMINI_API_KEY="..."

mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

#### API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | ✅ | Register new user |
| POST | `/api/auth/login` | ✅ | Login, returns JWT |
| GET | `/api/user/me` | ✅ | Get current user profile |
| PUT | `/api/user/me` | ✅ | Update name / profileImage |
| POST | `/api/review/submit` | ✅ | Review pasted code (JSON body) |
| POST | `/api/review/upload` | ✅ | Review uploaded file (multipart) |
| GET | `/api/review/history` | ✅ | List all reviews for current user |
| GET | `/api/review/{id}` | ✅ | Get single review by ID |

**POST `/api/review/submit` body:**
```json
{
  "sourceCode": "public class Hello { ... }",
  "fileName": "Hello.java"
}
```

---

### 2 — Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env:  VITE_API_URL=http://localhost:8080/api

npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Deployment on Render

### Backend (Web Service)

1. Push the `backend/` folder to GitHub (or use the whole monorepo)
2. New Web Service → Connect repo → **Runtime: Java** or **Docker**
3. Set **Build command:** `cd backend && mvn clean package -DskipTests`
4. Set **Start command:** `java -jar backend/target/backend-1.0.0.jar`
5. Add **Environment Variables** in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL` = `gemini-2.0-flash`
   - `PORT` = `8080`

### Frontend (Static Site — Vercel / Netlify / Render)

1. New Static Site → Connect repo
2. **Root directory:** `frontend`
3. **Build command:** `npm install && npm run build`
4. **Publish directory:** `dist`
5. Add **Environment Variable:**
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`

---

## MongoDB Atlas Setup (Free Tier)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free M0 cluster
2. Database Access → Add user with read/write permissions
3. Network Access → Add `0.0.0.0/0` (or your Render IP)
4. Connect → **Drivers** → copy the connection string
5. Replace `<password>` and set as `MONGODB_URI`

---

## Gemini API Key

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Create API key (free, no billing required for gemini-2.0-flash)
3. Set as `GEMINI_API_KEY`

---

## Development Rules (from project spec)

- Backend first, one module at a time
- Run & test with Postman before moving on
- Frontend only after APIs are stable
- Files only: `.java` and `.js` (server enforced, max 5 MB)

---

## License

MIT

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=villan7667&color=00FFFF" alt="Profile Views" />
  <span style="vertical-align: middle;">Made with ❤️ by </span>
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code:700&size=20&duration=2000&pause=500&color=00FFFF&vCenter=true&width=180&lines=ANKIT+KUMAR;VILLAN" align="center" />
</p>

