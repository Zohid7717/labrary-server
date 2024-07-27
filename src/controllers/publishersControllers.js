const client = require('../db')

const getPublishersQuery = 'SELECT * FROM publishers'
const addPublisherQuery = `INSERT INTO publishers (publisher_name) VALUES ($1) RETURNING *`
const deletePublisherQuery = `DELETE FROM publishers WHERE id = $1 RETURNING *`

exports.getPublishers = async (req, res) => {
  try {
    const result = await client.query(getPublishersQuery)
    res.status(200).json({ success: true, result: result.rows })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера'  })
  }
}

exports.addPublisher = async (req, res) => {
  try {
    const { publisher_name } = await req.body
    if (!publisher_name) {
      return res.status(401).json({ success: false, message: 'Не получены данные для обработки' })
    }
    const result = await client.query(addPublisherQuery, [publisher_name])
    res.status(201).json({ success: true, result: result.rows[0], message: 'Издатель создан успешно!' })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера'  })
  }
}

exports.deletePublisher = async (req, res) => {
  try {
    const { id } = await req.params
    if (!id) {
      return res.status(401).json({ success: false, message: 'ID издателя обязателен' })
    }
    const result = await client.query(deletePublisherQuery, [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Издатель не найден!' })
    }
    res.status(201).json({ success: true, message: 'Издатель удалён', result: result.rowCount[0] })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера'  })
  }
}