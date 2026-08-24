const express = require('express');
const authRoutes = require('./routers/auth.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const interviewRouter = require('./routers/interview.routes')


const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin : "https://genaijobpreprationplatform.netlify.app",
    credentials : true
}))

/**
 * Use Authentication Routes 
 */
app.use("/api/auth",authRoutes);

/**
 * Use Interview Routes
 */
app.use("/api/interview",interviewRouter)


module.exports = app;