const multer = require('multer')

const saveImageToDirectory = () => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'images')
    },
    filename: (req, file, callback) => {
      callback(null, '')
    },
  })

  const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      callback(null, true)
    } else {
      callback(null, false)
    }
  }

  return multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
}

module.exports = saveImageToDirectory
