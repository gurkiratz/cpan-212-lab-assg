const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");

// adding multer
const multer = require("multer");
const storage = multer.diskStorage({
  // the function that saves the file
  destination: function (req, file, cb) {
    // where we are storing the file
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // what is the filename going to be
    cb(null, `${Date.now()}-${file.originalname}`); // this will save files like: date-filename.extension
  },
});

const upload = multer({ storage: storage }); // the middleware function that handles uploading
// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

// single uploads
app.post("/single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.path}`);
});

//multiple uploads
app.post("/multiple", upload.array("files", 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  const filePaths = req.files.map((file) => file.path);
  res.status(200).send(`Files uploaded successfully: ${filePaths.join(", ")}`);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
