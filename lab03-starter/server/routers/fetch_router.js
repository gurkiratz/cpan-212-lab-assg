const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const upload_directory = path.join(__dirname, '../uploads')
const _ = require('lodash')

router.get('/single', (req, res) => {
  // we read the directory items synchronously to not trip the async speed
  let files_array = fs.readdirSync(upload_directory)
  // error checking
  if (files_array.length == 0) {
    // adding return will stop the rest of the operations
    console.log('no images')
    return res.status(503).send({
      message: 'No images',
    })
  }
  let filename = _.sample(files_array)
  res.sendFile(path.join(upload_directory, filename))
})

router.get('/multiple', (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads')
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve images' })
    }
    const images = files.map((file) => `uploads/${file}`)
    res.json(_.sampleSize(images, 3))
  })

  // let files_array = fs.readdirSync(upload_directory)
  // if (files_array.length == 0) {
  //   console.log('no images')
  //   return res.status(503).send({
  //     message: 'No images',
  //   })
  // }
  // let filenames = _.sampleSize(files_array, 3)
  // let files = filenames.map((filename) => {
  //   return path.join(upload_directory, filename)
  // })
  // console.log(JSON.stringify(files))
  // res.status(200).json(files)
})

module.exports = router
