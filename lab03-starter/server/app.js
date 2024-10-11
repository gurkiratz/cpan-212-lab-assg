const PORT = process.env.PORT || 8000
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const save_router = require('./routers/save_router')
const fetch_router = require('./routers/fetch_router')

// middlelware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// routes
app.use('/save', save_router)
app.use('/fetch', fetch_router)

app.get('/', (req, res) => {
  res.send('Welcome to our server')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

app.use('', (req, res) => {
  res.status(404).send('Page not found')
})
