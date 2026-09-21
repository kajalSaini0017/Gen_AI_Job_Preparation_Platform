# Gen AI Job Preparation Platform

A full-stack interview preparation platform that uses Google Gemini to generate interview feedback, reports, and personalized guidance.

## Live Demo

- Frontend: <https://genaijobpreprationplatform.netlify.app>
- Backend: <https://gen-ai-job-preparation-platform.onrender.com>

## Features

- User registration and login with JWT authentication
- Resume upload for interview preparation
- AI-generated interview reports using Google Gemini
- Interview report history
- Resume PDF generation
- Responsive React frontend with a Node.js and Express API

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Authentication: JWT and HTTP cookies
- AI: Google Gemini API
- Deployment: Netlify and Render

## Project Structure

```text
.
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routers/
│       ├── services/
│       └── utils/
├── Frontend/
│   ├── public/
│   ├── package.json
│   └── src/
└── README.md
```

## Requirements

- Node.js 18 or later
- npm
- MongoDB database
- Google Gemini API key

## Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/kajalSaini0017/Gen_AI_Job_Preparation_Platform.git
cd Gen_AI_Job_Preparation_Platform
```

### Backend

```bash
cd Backend
npm install
```

Create `Backend/.env` and add your private credentials:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend in development mode:

```bash
npm run dev
```

The API runs at `http://localhost:3000`.

### Frontend

Open a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Vite will print the local frontend URL, usually `http://localhost:5173`.

## Frontend Scripts

Run these commands from the `Frontend` directory:

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

## Deployment

The frontend is deployed on Netlify and the backend is deployed on Render.

For a new deployment, configure the backend environment variables from the local setup section in the hosting provider. Keep `.env` files and API keys out of GitHub. The frontend deployment should publish the `Frontend/dist` directory after running `npm run build`.

## API Routes

### Authentication

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/logout` | Log out |
| GET | `/api/auth/get-me` | Get the logged-in user |

### Interviews

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/interview` | Generate an interview report |
| GET | `/api/interview` | Get the user's interview reports |
| GET | `/api/interview/report/:interviewId` | Get a report by ID |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Generate a resume PDF |

## Security Notes

- Never commit `Backend/.env` or any API keys.
- Use a strong, unique `JWT_SECRET` in production.
- Configure the backend CORS origin to match the deployed frontend URL.

