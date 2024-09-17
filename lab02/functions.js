const fs = require('fs/promises')
const path = require('path')

const getGreeting = async () => {
  const data = await fs.readFile(path.join(__dirname, './greetings.json'), 'utf8')
  const greetings = JSON.parse(data) // greetings array
  const random = Math.floor(Math.random() * greetings.length); // random number
  const randomGreeting = greetings[random] // random greeting
  return randomGreeting
}

module.exports = {getGreeting}