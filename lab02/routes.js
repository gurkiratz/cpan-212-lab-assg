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
  const { a: numA, b: numB, calc } = req.query;

  const a = parseFloat(numA) || 5;
  const b = parseFloat(numB) || 7;

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Invalid numbers' });
}

  let result
  console.log(calc)

  switch(calc) {
    case '+' || 'add':
      result = a + b
      break
    case '-' || 'sub':
      result = a-b
      break
    case '*' || 'multiply':
      result=a*b
      break
    case '/' || 'divide':
      if (b===0) {
        return res.status(400).json({error: 'Division by zero is invalid'})
      }
      result = a/b
      break
    default:
      return res.status(400).json({error: 'Invalid operator. Calculation not completed'})

  }
  res.json({ a,b,calc,result });
})

module.exports = router