const client = require('../db')

const getBooksQuery = 'SELECT books.id, books.book_name, authors.author_name, categories.book_category, publishers.publisher_name FROM books INNER JOIN books_authors ON books_authors.book_id=books.id INNER JOIN authors ON books_authors.author_id=authors.id INNER JOIN categories ON categories.id=books.category_id INNER JOIN publishers ON publishers.id = books.publisher_id'

exports.getBooks = async (req, res) => {
  try {
    const result = await client.query(getBooksQuery)
    res.status(200).json({ success: true, result: result.rows})
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({success: false, message: 'Ошибка сервера' })
  }
}

