const express = require('express');
const cors = require('cors')
const connectDB = require('./db');
const recipesRoutes = require('./recipesRoutes')

const app = express();
const port = 8001;

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api', recipesRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});