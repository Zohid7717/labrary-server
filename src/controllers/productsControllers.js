const client = require('../db')
const { isUsedQuery, getIsUsedQuery, createItem, addOncomingId, getBookQuery } = require('../middleware/queries')

// const getBooksQuery = 'SELECT books.id, books.title, authors.author_name, categories.category_title FROM books INNER JOIN books_authors ON books_authors.book_id=books.id INNER JOIN authors ON books_authors.author_id=authors.id INNER JOIN categories ON categories.id=books.category_id'

const getBooksQuery = "SELECT books.id, books.title, books.image, books.h_book, books.e_book, books.a_book, books.quantity, books.book_lang, books.price, books.book_location, books.book_about, books.e_book_img, books.fragment,  books.a_book_file, STRING_AGG(authors.author_name, ', ') AS authors_names, categories.category_title FROM books INNER JOIN books_authors ON books_authors.book_id=books.id INNER JOIN authors ON books_authors.author_id=authors.id INNER JOIN categories ON categories.id=books.category_id GROUP BY books.id, books.title, books.h_book, books.e_book, books.a_book, books.quantity, books.book_lang, books.price, books.book_location, books.book_about, books.e_book_img, books.fragment, books.image, books.a_book_file, categories.category_title"

const addBookQuery = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) => {
  return `INSERT INTO books (title, h_book, e_book, a_book, quantity, book_lang, price, book_location, category_id, book_about, e_book_img, fragment, image, a_book_file) VALUES ('${$1}', '${$2}', '${$3}', '${$4}', '${$5}', '${$6}', '${$7}', '${$8}', '${$9}', '${$10}', '${$11}', '${$12}', '${$13}', '${$14}') RETURNING *`
}

exports.getBooks = async (req, res) => {
  try {
    const result = await client.query(getBooksQuery)
    res.status(200).json({ success: true, result: result.rows })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

exports.getBook = async (req, res) => {
  try {
    const id = req.params.id
    const book = await client.query(getBookQuery(id))
    res.status(200).json({ success: true, book: book.rows[0] })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

exports.addBook = async (req, res) => {
  let author = null
  let category_id = null
  try {
    const { title, h_book, e_book, a_book, quantity, book_lang, price, book_location, book_category, authors_name, book_about, e_book_img, fragment, image, a_book_file } = await req.body
    const body = await req.body
    if (!title || !quantity || !book_lang || !price || !book_category || !authors_name) {
      return res.status(400).json({ success: false, message: 'Ведите все необходимые данные для создания книги' })
    }
    const isUsedCategory = await client.query(isUsedQuery('categories', 'category_title', book_category))
    if (isUsedCategory.rows[0].exists) {
      const category = await client.query(getIsUsedQuery('categories', 'category_title', book_category))
      category_id = category.rows[0].id
    } else {
      const category = await client.query(createItem('categories', 'category_title', book_category))
      category_id = category.rows[0].id
    }
    const newBookRes = await client.query(
      addBookQuery(
        title, h_book, e_book, a_book, quantity, book_lang, price, book_location, category_id, book_about, e_book_img, fragment, image, a_book_file
      )
    )
    const newBook = newBookRes.rows[0]
    authors_name.forEach(async (element) => {
      const available = await client.query(isUsedQuery('authors', 'author_name', element))
      if (available.rows[0].exists) {
        author = await client.query(getIsUsedQuery('authors', 'author_name', element))
      } else {
        author = await client.query(createItem('authors', 'author_name', element))
      }
      console.log(author)
      console.log(newBookRes)
      await client.query(addOncomingId('books_authors', newBook.id, author.rows[0].id))
    });
    await res.status(200).json({ success: true, newBookId: newBook.id })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

