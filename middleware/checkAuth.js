const jwt = require('jsonwebtoken')

exports.isUser = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (!token) {
      return res.status(403).json({success:false, message: 'Вы не авторизованы!'})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    if (decoded.role !== 'user') {
      return res.status(404).json({success: false, message: 'Вы должны зарегистрироватся!'})
    }
    req.userID = decoded.id
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Срок действия токена истек. Пожалуйста, авторизуйтесь снова.' });
    }
    console.log(error)
    res.status(500).json({ success: false, message: 'Ошибка при обработке данных. Пожалюста повторите попытку!' })
  }
}
exports.isAdmin = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (!token) {
      return res.status(403).json({success:false, message: 'Вы не авторизованы!'})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    if (decoded.role !== 'admin') {
      return res.status(404).json({success: false, message: 'Вы должны зарегистрироватся как администратор сайта!'})
    }
    req.userID = decoded.id
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Ошибка при обработке данных. Пожалюста повторите попытку!' })
  }
}