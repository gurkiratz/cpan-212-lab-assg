import { useState } from 'react'
import axios from 'axios'

function App() {
  const [singleFile, setSingleFile] = useState(null)
  const [multipleFiles, setMultipleFiles] = useState([])
  const [fetchedSingleFile, setFetchedSingleFile] = useState(null)
  const [fetchedMultipleFiles, setFetchedMultipleFiles] = useState(null)
  const [randomImage, setRandomImage] = useState(null)

  // Handle file input for single upload
  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0])
  }

  // Handle file input for multiple uploads
  const handleMultipleFilesChange = (e) => {
    setMultipleFiles(e.target.files)
  }

  // Upload a single file to the server
  const uploadSingleFile = async () => {
    if (!singleFile) return

    try {
      const formData = new FormData()
      formData.append('file', singleFile)
      const response = await fetch('http://localhost:8000/save/single', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      alert(data.message)
    } catch (error) {
      alert(error.message)
      console.error('Error uploading single file:', error)
    }
  }

  // Upload multiple files to the server
  const uploadMultipleFiles = async () => {
    const formData = new FormData()
    console.log(multipleFiles)
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append('files', multipleFiles[i])
    }

    try {
      const response = await fetch('http://localhost:8000/save/multiple', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      alert(data.message)
    } catch (error) {
      alert(error.message)
      console.error('Error uploading multiple files:', error)
    }
  }

  // Fetch a random single file from the server
  const fetchSingleFile = async () => {
    try {
      const response = await fetch('http://localhost:8000/fetch/single')
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setFetchedSingleFile(url)
    } catch (error) {
      alert(error.message)
      console.error('Error fetching single file:', error)
    }
  }

  // Fetch multiple files from the server
  const fetchMultipleFiles = async () => {
    setFetchedMultipleFiles([])
    try {
      const response = await fetch('http://localhost:8000/fetch/multiple')
      const data = await response.json()
      const files = data.map((filePath) => `http://localhost:8000/${filePath}`)
      setFetchedMultipleFiles(files)
    } catch (error) {
      alert(error.message)
      console.error('Error fetching multiple files:', error)
    }
  }

  // Fetch a random image from picsum.photos
  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/fetch/random-image',
        { responseType: 'blob' }
      )
      const imageUrl = URL.createObjectURL(response.data)
      setRandomImage(imageUrl)
    } catch (error) {
      alert(error.message)
      console.error('Error fetching random image:', error)
    }
  }

  // Save the random image to the server
  const saveRandomImage = async () => {
    if (!randomImage) return

    try {
      const imageBlob = await fetch(randomImage).then((res) => res.blob())
      const formData = new FormData()
      formData.append('file', new File([imageBlob], 'random-image.jpg'))

      const response = await axios.post(
        'http://localhost:8000/save/single',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response.data.message)
      alert(response.data.message)
    } catch (error) {
      console.error('Error saving image', error)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>File Upload and Fetch App</h1>

      {/* Section for uploading single file */}
      <div className="section">
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button onClick={uploadSingleFile}>Upload Single File</button>
      </div>

      {/* Section for uploading multiple files */}
      <div className="section">
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFilesChange} />
        <button onClick={uploadMultipleFiles}>Upload Multiple Files</button>
      </div>

      {/* Section for fetching and displaying a single file */}
      <div className="section">
        <h2>Fetch Single File</h2>
        <button onClick={fetchSingleFile}>Fetch Single File</button>
        {fetchedSingleFile && (
          <div>
            <h3>Single File</h3>
            <img
              src={fetchedSingleFile}
              alt="Fetched Single"
              style={{ width: '200px', marginTop: '10px' }}
            />
          </div>
        )}
      </div>

      {/* Section for fetching and displaying multiple files */}
      <div className="section">
        <h2>Fetch Multiple Files</h2>
        <button onClick={fetchMultipleFiles}>Fetch Multiple File</button>
        <h3>Multiple File</h3>

        {fetchedMultipleFiles && (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {fetchedMultipleFiles.map((file, index) => (
              <img
                key={index}
                src={file}
                alt={`Fetched Multiple ${index}`}
                style={{ width: '200px', margin: '10px' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section for uploading random image */}
      <div className="section">
        <h2>Fetch Random Image</h2>
        <button onClick={fetchRandomImage}>Fetch Random Image</button>
        {randomImage && (
          <div>
            <h3>Random Image</h3>
            <img
              src={randomImage}
              alt="Fetched Random"
              style={{ width: '200px', marginTop: '10px' }}
            />
            <button onClick={saveRandomImage}>Save Random Image</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
