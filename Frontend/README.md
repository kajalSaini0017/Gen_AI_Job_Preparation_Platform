# Frontend

React and Vite frontend for the Gen AI Job Preparation Platform.

## Features

- User registration and login screens
- Protected home and interview pages
- Interview report generation and report details
- Resume upload workflow
- API requests with Axios and cookie credentials

## Requirements

- Node.js 18 or later
- npm
- Backend running at `http://localhost:3000`

## Installation

From this folder, run:

```bash
npm install
```

## Development

```bash
npm run dev
```

Vite normally serves the application at `http://localhost:5173`.

## Production Build

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

## Code Quality

```bash
npm run lint
```

## Main Routes

- `/login` - Log in
- `/register` - Create an account
- `/` - Protected interview dashboard
- `/interview` - Create a new interview
- `/interview/:interviewId` - View an interview report

## Configuration

The API base URL is currently configured in the frontend service files as `http://localhost:3000`. Update it before deploying the frontend to another environment.

Do not commit `.env` files or other secret values. See `Frontend/.gitignore` for ignored files.
