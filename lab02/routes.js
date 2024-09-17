const express = require('express')
const fs = require('fs/promises')
const path = require('path')
const { getGreeting } = require('./functions')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to Lab 2. Available routes: GET /name, GET /greeting')
})

router.get('/name/:user?', async (req, res) => {
  const {user} = req.params
  const outputName = user ? `${user}!` : 'Harman!';
  try {
    const randomGreeting = await getGreeting()
    res.send(`${randomGreeting} ${outputName}`)
  } catch (error) {
    res.status(500).send('Error reading greetings file' + error)
    console.log('error reading greetings file', error)    
  }
})

router.get('/greeting', async (req, res) => {
  try {
    const randomGreeting = await getGreeting()
    res.send(randomGreeting)
  } catch (error) {
    res.status(500).send('Error reading greetings file' + error)
    console.log('error reading greetings file', error)    
  }
})

router.post('/add', (req,res) => {
  const x = parseFloat(req.query.x) || 5;
  const y = parseFloat(req.query.y) || 5;
  const result = x+y
  res.json({ x,y,result });
})

router.post('/calculate', (req, res) => {
  const a = parseFloat(req.query.a) || 5;
  const b = parseFloat(req.query.b) || 5;
  const output = `
  Addition: ${a+b}
  Subtraction: ${a-b}
  Multiplication: ${a*b}
  Division: ${Math.round(a/b)}
  Exponential: ${a**b}
  `
  res.send(output)
})

module.exports = router