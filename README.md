# Gen AI Job Preparation Platform

A full-stack platform for preparing for technical interviews with AI-generated interview reports, resume analysis, and personalized feedback.

## Features

- User registration and login
- JWT-based authentication
- Resume upload for interview preparation
- AI-generated interview reports using Google Gemini
- Interview report history
- Resume PDF generation
- React frontend with a Node.js and Express backend

---
## Frontend Live Link
https://genaijobpreprationplatform.netlify.app

---

## Backend Live Link
https://gen-ai-job-preparation-platform.onrender.com

## Project Structure

```text
.
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
└── Frontend/
    ├── package.json
    └── src/
```

## Requirements

- Node.js 18 or later
- npm
- MongoDB database
- Google Gemini API key

## Backend Setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend in development mode:

```bash
npm run dev
```

The backend runs at `http://localhost:3000`.

## Frontend Setup

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

## API Routes

### Authentication

- `POST /api/auth/register` - Create an account
- `POST /api/auth/login` - Log in
- `GET /api/auth/logout` - Log out
- `GET /api/auth/get-me` - Get the logged-in user

### Interviews

- `POST /api/interview` - Generate an interview report
- `GET /api/interview` - Get the user's interview reports
- `GET /api/interview/report/:interviewId` - Get a report by ID
- `POST /api/interview/resume/pdf/:interviewReportId` - Generate a resume PDF

