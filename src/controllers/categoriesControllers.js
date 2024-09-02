const client = require('../db')

const getAllQuery = 'SELECT * FROM categories'


exports.getAll = async (req, res) => {
  try {
    const result = await client.query(getAllQuery)
    res.status(200).json({success: true, categories: result.rows})
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
  
}

