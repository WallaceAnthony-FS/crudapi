import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"
import cors from "cors"
import studentRouter from "./routes/students.routes.js"

// Load environment variables
dotenv.config()

// Add __filename and __dirname to esm
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// create app and setup middleware
const app = express()
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/v1/students', studentRouter)

// Serve static bundle if route is not /api/*
app.use(express.static(path.join(__dirname, '../reactjs/build')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'))
})


const PORT = process.env.PORT || 8000

const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connection established.'))


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})