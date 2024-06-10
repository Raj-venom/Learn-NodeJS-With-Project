import express from "express";
import cors from "cors"
import { ApiError } from "./utils/ApiError.js"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())


// Router Import

import userRouter from "./routes/user.routes.js"


// routes declaration
app.use("/api/v1/user", userRouter)




app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
  
      console.log(err)
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
        success: false
  
      });
    }
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on the server',
    });
  });
  

export default app