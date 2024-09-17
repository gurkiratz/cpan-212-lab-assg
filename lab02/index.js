const express = require('express')
const app = new express()
const routes = require('./routes');

const PORT = 3000

app.use(express.json())
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})