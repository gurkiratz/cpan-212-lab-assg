const express = require('express')

const app = new express()
const PORT = 3000

app.get('/', (req, res) => {
    res.status(200).send('Welcome to home page')
})

app.get('/name', (req, res) => {
    res.send('Welcome to the site - Gurkirat Singh')
})

app.get('/greeting', (req, res) => {
    res.send('Good Evening Gurkirat')
})

app.post('/add', (req,res) => {
    const {x,y} = req.query
    res.send(x+y)
})

app.post('/calculate', (req, res) => {
    const {a,b} = req.query
    const output = `
    Addition: ${a+b}
    Subtraction: ${a-b}
    Multiplication: ${a*b}
    Division: ${Math.round(a/b)}
    Exponential: ${a**b}
    `
})

app.post('/', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})