const client = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const isUsedQuery = (baseParam) => {
  return `SELECT EXISTS (SELECT 1 FROM users WHERE ${baseParam} = $1)`
}
const addUser = `INSERT INTO users (user_name, user_passport, phone_number, user_password, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING *`
const addBasketQuery = `INSERT INTO basket (user_id) VALUES ($1) RETURNING *`
const getAllQuery = 'SELECT * FROM users'
const deleteUserQuery = `DELETE FROM users WHERE id = $1 RETURNING *`

const generateJwt = (id, name, role) => {
  return jwt.sign(
    { id, name, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

exports.regUser = async (req, res) => {
  try {
    const { user_name, user_passport, phone_number, user_pass } = req.body
    if (!user_name || !user_passport || !phone_number || !user_pass) {
      return res.status(401).json({ success: false, message: 'Ведите все нужные данные для создания пользователя' })
    }
    const isUsedPassport = await client.query(isUsedQuery('user_passport'), [user_passport])

    if (isUsedPassport.rows[0].exists) {
      return res.status(402).json({ success: false, message: 'Такие паспортные данные существуют в базе!' })
    }
    const isUsedPhone = await client.query(isUsedQuery('phone_number'), [phone_number])
    if (isUsedPhone.rows[0].exists) {
      return res.status(403).json({ success: false, message: 'Такой номер телефона существует в базе!' })
    }
    const user_password = await bcrypt.hash(user_pass, 5)
    const user_role = 'user'
    const newUser = await client.query(addUser, [user_name, user_passport, phone_number, user_password, user_role])
    const user = newUser.rows[0]
    const token = generateJwt(user.id, user.user_name, user.user_role)
    const newBasket = await client.query(addBasketQuery, [user.id])
    res.status(200).json({ success: true, message: 'Пользователь создан успешно!', result: user, token })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

exports.regAdmin = async (req, res) => {
  try {
    const { user_name, user_passport, phone_number, user_pass, admin_pass } = await req.body
    if (!user_name || !user_passport || !phone_number || !user_pass || !admin_pass) {
      return res.status(401).json({ success: false, message: 'Ведите все нужные данные для создания администратора' })
    }
    const isUsedPassport = await client.query(isUsedQuery('user_passport'), [user_passport])

    if (isUsedPassport.rows[0].exists) {
      return res.status(402).json({ success: false, message: 'Такие паспортные данные существуют в базе!' })
    }
    const isUsedPhone = await client.query(isUsedQuery('phone_number'), [phone_number])
    if (isUsedPhone.rows[0].exists) {
      return res.status(403).json({ success: false, message: 'Такой номер телефона существует в базе!' })
    }
    if (admin_pass !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Данные не коррктны' })
    }
    const user_password = await bcrypt.hash(user_pass, 5)
    const user_role = 'admin'
    const newUser = await client.query(addUser, [user_name, user_passport, phone_number, user_password, user_role])
    const user = newUser.rows[0]
    const token = generateJwt(user.id, user.user_name, user.user_role)
    res.status(200).json({success: true, message: 'Администратор успешно создан!', token, user})
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const result = await client.query(getAllQuery)
    res.status(200).json({ success: true, result: result.rows })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = await req.body
    if (!id || isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Данные не получены' })
    }
    const result = await client.query(deleteUserQuery, [id])
    if (result.rowCount === 0) {
      return res.status(401).json({ success: false, message: 'Пользователь не найден' })
    }
    res.status(200).json({ success: true, message: 'Пользователь успешно удален' })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

