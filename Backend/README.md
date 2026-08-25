# Backend

Node.js and Express API for the Gen AI Job Preparation Platform.

## Features

- User registration and login
- JWT authentication with cookies
- MongoDB data storage with Mongoose
- Resume file upload
- AI-generated interview reports using Google Gemini
- Interview report history
- Resume PDF generation
- Token blacklist support for logout

---

## Live Link 
https://gen-ai-job-preparation-platform.onrender.com


## Requirements

- Node.js 18 or later
- npm
- MongoDB database
- Google Gemini API key

## Installation

From this folder, run:

```bash
npm install
```

Create a `.env` file in the `Backend` folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

Never commit the real `.env` file or any API keys to GitHub.

## Running the Server

Development mode with Nodemon:

```bash
npm run dev
```

The API runs at `http://localhost:3000`.

## API Routes

### Authentication

- `POST /api/auth/register` - Create a user account
- `POST /api/auth/login` - Log in
- `GET /api/auth/logout` - Log out
- `GET /api/auth/get-me` - Get the authenticated user

### Interviews

These routes require authentication:

- `POST /api/interview` - Generate an interview report; accepts a `resume` file
- `GET /api/interview` - Get all reports for the logged-in user
- `GET /api/interview/report/:interviewId` - Get one report
- `POST /api/interview/resume/pdf/:interviewReportId` - Generate a resume PDF

## Frontend Connection

The API allows requests from `http://localhost:5173` with credentials enabled. Start the frontend separately:

```bash
cd ../Frontend
npm install
npm run dev
```

## Project Structure

```text
Backend/
├── server.js
└── src/
    ├── app.js
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routers/
    └── services/
```

## Security

Keep `MONGO_URL`, `JWT_SECRET`, and `GOOGLE_GEMINI_API_KEY` private. The backend `.gitignore` excludes `.env`, dependencies, logs, uploads, and generated files.
