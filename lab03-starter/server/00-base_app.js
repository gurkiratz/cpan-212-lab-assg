const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
 
 
// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
 
// routes
app.get("/", (req, res)=>{
    res.send("Welcome to our server")
})
 
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});