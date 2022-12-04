import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"
import cors from "cors"
import studentRouter from "./routes/students.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/students', studentRouter)


const PORT = process.env.PORT || 8000

const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connection established.'))


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})