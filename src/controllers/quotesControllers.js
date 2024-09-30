const client = require('../db')

const createQuotesTableQuery = `CREATE TABLE quotes (user_id INT PRIMARY KEY, quote_author_ru VARCHAR(100), quote_author_uz VARCHAR(100), quote_ru TEXT, quote_uz TEXT, create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`

const addQuoteQuery = 'INSERT INTO quotes (quote_author_ru, quote_author_uz, quote_ru, quote_uz) VALUES ($1, $2, $3, $4) RETURNING *'
const getQuotesDateQuery = 'SELECT id, create_at FROM quotes'
const deleteQuoteQuery = `DELETE FROM quotes WHERE id = $1`
const getQuotesQuery = 'SELECT * FROM quotes'



exports.createQuotesTable = async (req, res) => {
  try {
    await client.query(createQuotesTableQuery)
    res.status(200).json({ success: true, message: 'Таблица успешно создана!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Таблица не было создана!' })
  }
}

exports.addQuote = async (req, res) => {
  try {
    const { quote_author_ru, quote_author_uz, quote_ru, quote_uz } = req.body
    if (!quote_author_ru | !quote_author_uz | !quote_ru | !quote_uz) {
      return res.status(401).json({ success: false, message: 'Ведите все нужные данные для создания пользователя' })
    }
    const quotesDate = await client.query(getQuotesDateQuery)
    const quotesDateRows = quotesDate.rows
    if (quotesDateRows.length >= 4) {
      const oldQuote = await quotesDateRows.reduce((oldest, current) => {
        return new Date(current.create_at) < new Date(oldest.create_at) ? current : oldest
      })
      await client.query(deleteQuoteQuery, [oldQuote.id])
    }
    await client.query(addQuoteQuery, [quote_author_ru, quote_author_uz, quote_ru, quote_uz])
    const quotes = await client.query(getQuotesQuery)
    res.status(200).json({ success: true, quotes: quotes.rows, message: 'Цитата создана успешно' })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await client.query(getQuotesQuery)
    res.status(200).json({ success: true, quotes: quotes.rows })
  } catch (error) {
    console.error('Ошибка выполнении запроса: ', error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

exports.example = async (req, res) => {
  try {
    const pass = process.env.SECRET_KEY
    res.status(200).json({ message: 'hello world', pass })
  } catch (error) {
    res.status(500).json({ message: 'server error' })
  }
}