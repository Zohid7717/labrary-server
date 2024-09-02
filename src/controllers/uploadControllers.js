const multer = require('multer')
const path = require('path')
const fs = require('fs').promises

class FileHandler {
  constructor() {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './src/uploads/userImg')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    this.types = ['image/png', 'image/jpg', 'image/jpeg']
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
    this.upload = multer({ storage: this.storage, fileFilter: this.fileFilter })
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
      res.status(200).json({ success: true, message: 'Файл успешно загружен' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Ошибка при загрузке файла' })
    }
  }

  async deleteFile(req, res) {
    const filePath = path.join(__dirname, '../uploads/userImg', req.params.filename)
    try {
      await fs.access(filePath)
      await fs.unlink(filePath)
      res.status(200).json({ success: true, message: 'Файл успешно удалён.' })
    } catch (error) {
      console.log(error)
      if (error.code === 'ENOENT') {
        res.status(404).json({success: false, message: 'Файл не найден'})
      } else {
        res.status(500).json({ success: false, message: 'Ошибка при удалении файла' })
      }
    }
  }
}

module.exports = new FileHandler()