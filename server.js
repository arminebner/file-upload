const express = require('express')
const path = require('path');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
   
const upload = multer({ storage: storage })

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(express.static('public'))
app.use('/static', express.static('public'))

app.post('/upload-profile-pic', upload.single('profile_pic'), function (req, res, next) {
    // req.file is the `avatar` file
    res.send(`<img src="http://localhost:5000/static/${req.file.filename}">`)
    // req.body will hold the text fields, if there were any
    next()
  })


app.listen(5000, () => console.log('Server running on port 5000'));