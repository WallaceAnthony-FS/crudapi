import express from "express"
import Student from "../models/Student.js"

const router = express.Router()

const getStudent = async (req, res, next) => {
  let student
  try {
    student = await Student.findById(req.params.id)
    if(!student){
      return res.status(404).json({ message: "Student not found." })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.student = student
  next()
}

// GET ALL
router.get('/', async (req, res) => {
  try{
    const students = await Student.find()
    res.status(200).json({students})
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
})

// GET One
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student)
})

// POST Create
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    class: req.body.class
  })
  try{
    const newStudent = await student.save()
    res.status(201).json(newStudent)
  }catch(err){
    res.status(400).json({ message: err.message })
  }
})

// PATCH Update
router.patch('/:id', getStudent, async (req, res) => {
  if(req.body.name !== null){
    res.student.name = req.body.name
  }
  if(req.body.class !== null){
    res.student.class = req.body.class
  }
  try {
    const updatedStudent = await res.student.save()
    res.json(updatedStudent)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE One
router.delete('/:id', getStudent, async (req, res) => {
  try{
    await res.student.remove()
    res.json({ message: "student removed" })
  }catch(err){
    res.status(500).json({ message: err.message })
  }
})

export default router