const { rejects } = require('assert')
const multer = require('multer')
const path = require('path')
const fs = require('fs').promises

class BookFileHandler {
  constructor() {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/uploads/book_img')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    this.zipStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/uploads/a_books_file')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    this.eBookStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/uploads/e_books_img')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    this.types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/svg+xml']
    this.zipTypes = ['application/zip', 'application/x-zip-compressed']
    this.fileFilter = (req, file, cb) => {
      try {
        if (this.types.includes(file.mimetype)) {
          cb(null, true)
        } else {
          cb(new Error('Тип файла не соответствует', false))
        }
      } catch (error) {
        cb(error, false)
      }
    }
    this.zipFileFilter = (req, file, cb) => {
      try {
        if (this.zipTypes.includes(file.mimetype)) {
          cb(null, true)
        } else {
          cb(new Error('Тип файла не соответствует', false))
        }
      } catch (error) {
        cb(error, false)
      }
    }
    this.upload = multer({ storage: this.storage, fileFilter: this.fileFilter })
    this.zipUpload = multer({ storage: this.zipStorage, fileFilter: this.zipFileFilter })
    this.eBookUpload = multer({ storage: this.eBookStorage, fileFilter: this.fileFilter })
  }

  async uploadFile(req, res) {
    try {
      await new Promise((resolve, rejects) => {
        this.upload.single('file')(req, res, (err) => {
          if (err) {
            rejects(err)
          } else {
            resolve()
          }
        })
      })
      res.status(200).json({ success: true, message: 'Файл загружен!' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Ошибка при загрузки файла' })
    }
  }

  async uploadZipFile(req, res) {
    try {
      await new Promise((resolve, rejects) => {
        this.zipUpload.single('file')(req, res, (err) => {
          if (err) {
            rejects(err)
          } else {
            resolve()
          }
        })
      })
      res.status(200).json({ success: true, message: 'Файл успешно загружен' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Ошибка при загрузке файла' })
    }
  }

  async uploadEBook(req, res) {
    try {
      await new Promise((resolve, rejects) => {
        this.eBookUpload.single('file')(req, res, (err) => {
          if (err) {
            rejects(err)
          } else {
            resolve()
          }
        })
      })
      res.status(200).json({ success: true, message: 'Файл успешно загружен' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Ошибка при загрузке файла' })
    }
  }

  async deleteFile(req, res) {
    const filePath = path.join(__dirname, '../uploads/e_books_img', req.params.filename)
    try {
      await fs.access(filePath)
      await fs.unlink(filePath)
      res.status(200).json({ success: true, message: 'Файл успешно удалён.' })
    } catch (error) {
      console.log(error)
      if (error.code === 'ENOENT') {
        res.status(404).json({ success: false, message: 'Файл не найден' })
      } else {
        res.status(500).json({ success: false, message: 'Ошибка при удалении файла' })
      }
    }
  }
}

module.exports = new BookFileHandler()