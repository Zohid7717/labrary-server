const client = require('../db')

const getBooksQuery = 'SELECT books.id, books.title, authors.author_name, categories.book_category FROM books INNER JOIN books_authors ON books_authors.book_id=books.id INNER JOIN authors ON books_authors.author_id=authors.id INNER JOIN categories ON categories.id=books.category_id'

const addBookQuery = 'INSERT INTO books (title, h_book, e_book, a_book, quantity, book_lang, price, book_location, category_id, book_about, number_of_voters, image, e_book_img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *'

exports.getBooks = async (req, res) => {
  try {
    const result = await client.query(getBooksQuery)
    res.status(200).json({ success: true, result: result.rows })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

exports.addBook = async (req, res) => {
  try {
    const { title, h_book, e_book, a_book, quantity, book_lang, price, book_location, category_id, book_about, number_of_voters, image, e_book_img } = await req.body
    if (!title || !quantity || !book_lang || !price || !book_location || !category_id || !book_about) {
      return res.status(400).json({success: false, message: 'Ведите все необходимые данные для создания книги'})
    }
    const result = await client.query(addBookQuery, [title, h_book, e_book, a_book, quantity, book_lang, price, book_location, category_id, book_about, number_of_voters, image, e_book_img] )
    res.status(200).json({success: true, result})
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

