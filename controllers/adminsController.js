// const client = require('../db')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const getAdminsQuery = 'SELECT * FROM admins'
// const regAdminQuery = `INSERT INTO admins (name, password) VALUES ($1, $2) RETURNING *`
// const isUsedQuery = `SELECT EXISTS (SELECT 1 FROM admins WHERE name = $1)`
// const deleteAdminQuery = `DELETE FROM admins WHERE id = $1 RETURNING *`
// const authAdminQuery = `SELECT * FROM admins WHERE name = $1`

// const generateJwt = (id, name, role) => {
//   return jwt.sign(
//     { id, name, role },
//     process.env.SECRET_KEY,
//     { expiresIn: '24h' }
//   )
// }

// exports.getAdmins = async (req, res) => {
//   try {
//     const result = await client.query(getAdminsQuery)
//     res.status(200).json({ success: true, result: result.rows, message: 'Получен список администраторов' })
//   } catch (error) {
//     console.error('Ошибка выполнении запроса: ', error)
//     res.status(500).json({ success: false, message: 'Ошибка сервера' })
//   }
// }

// exports.regAdmin = async (req, res) => {
//   try {
//     const { name, admin_password, adminpass } = await req.body
//     if (!name || !admin_password) {
//       return res.status(404).json({ success: false, message: 'Данные ведени не корректно' })
//     }
//     const isUsed = await client.query(isUsedQuery, [name])
//     if (isUsed.rows[0].exists) {
//       return res.status(404).json({ success: false, message: 'Aдминистратора с таким именем уже существует в базе!' })
//     }
//     if (adminpass !== process.env.ADMIN_PASSWORD) {
//       return res.status(401).json({ success: false, message: 'Некорректные данные!' })
//     }
//     const password = await bcrypt.hash(admin_password, 5)
//     const result = await client.query(regAdminQuery, [name, password])
//     const admin = result.rows[0]
//     const token = generateJwt(admin.id, admin.name)
//     res.status(200).json({ success: true, message: 'Администратор успешно создан!', token })
//   } catch (error) {
//     console.error('Ошибка выполнении запроса: ', error)
//     res.status(500).json({ success: false, message: 'Ошибка сервера' })
//   }
// }

// exports.deleteAdmin = async (req, res) => {
//   try {
//     const { id } = await req.body
//     if (!id || isNaN(id)) {
//       return res.status(401).json({ success: false, message: 'Не корректные данные' })
//     }
//     const result = await client.query(deleteAdminQuery, [id])
//     if (result.rowCount === 0) {
//       return res.status(404).json({ success: false, message: 'Администратор не найден!' })
//     }
//     res.status(201).json({ success: true, message: 'Администратор удален!', result: result.rowCount[0] })
//   } catch (error) {
//     console.error('Ошибка выполнении запроса: ', error)
//     res.status(500).json({ success: false, message: 'Ошибка сервера' })
//   }
// }

// exports.authAdmin = async (req, res) => {
//   try {
//     const { name, admin_password } = req.body
//     if (!name || !admin_password) {
//       return res.status(401).json({ success: false, message: 'Данные не получены' })
//     }
//     const result = await client.query(authAdminQuery, [name])
//     if (result.rowCount === 0) {
//       return res.status(402).json({ success: false, message: 'Данные не корректны!' })
//     }
//     const admin = await result.rows[0]
//     const comparePassword = bcrypt.compareSync(admin_password, admin.password)
//     if (!comparePassword) {
//       return res.status(403).json({ success: false, message: 'Данные ведены не корректно!' })
//     }
//     const token = generateJwt(admin.id, admin.name)
//     res.status(200).json({ success: true, message: 'Вы успешно зарегестрированы!', token })
//   } catch (error) {
//     console.error('Ошибка выполнении запроса: ', error)
//     res.status(500).json({ success: false, message: 'Ошибка сервера' })
//   }
// }

