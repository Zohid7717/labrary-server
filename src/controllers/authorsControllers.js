const client = require('../db')

const getAuthorsQuery = 'SELECT * FROM authors'
const addAuthorQuery = `INSERT INTO authors (author_name) VALUES ($1) RETURNING *`
const deleteAuthorQuery = `DELETE FROM authors WHERE id = $1 RETURNING *`

exports.getAuthors = async (req, res) => {
  try {
    const result = await client.query(getAuthorsQuery)
    res.status(200).json({ success: true, result: result.rows })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера'  })
  }
}

exports.addAuthor = async (req, res) => {
  try {
    const { author_name } = await req.body
    if (!author_name) {
      return res.status(401).json({ success: false, result: 'Данные некорректны' })
    }
    const result = await client.query(addAuthorQuery, [author_name])
    res.status(201).json({ success: true, result: result.rows[0] })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера'  })
  }
}

exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = await req.params
    if (!id) {
      return res.status(400).json({success: false, message: 'ID автора обязателен'})
    }
    const result = await client.query(deleteAuthorQuery, [id])
    if (result.rowCount === 0) {
      return res.status(404).json({success: false, message: 'Автор не найден'})
    }
    res.status(200).json({success: false, message: 'Автор успешно удален', result: result.rowCount[0]})
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера'  })
  }
}
