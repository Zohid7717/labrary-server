const client = require('../db')
const { getItemQuery } = require('../middleware/queries')

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

exports.getCategory = async (req, res) => {
  try {
    const {id} = req.params
    const result = await client.query( getItemQuery('categories', 'id', id))
    if (!result) {
      return res.status(400).json({ success: false, result: 'Несуществующая категория' })
    }
    res.status(200).json({success: true, result: result.rows[0]})
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}
