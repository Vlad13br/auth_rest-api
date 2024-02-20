const express = require('express')
const cors = require('cors')
const limiter = require('./middlewares/rate-limit')
const contactsRouter = require('./routes/contacts')
const userRouter = require('./routes/user')
require('dotenv').config()

const app = express()

app.use(limiter(15 * 60 * 1000, 100))
app.use(cors())
app.use(express.json({ limit: 10000 }))

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app