const client = require('../db')
const { userRating } = require('../middleware/queries')

exports.getUserRating = async (req, res) => {
  try {
    const { user_id, book_id } = await req.body
    if (!user_id && !book_id) {
      return res.status(400).json({success: false, message: 'Полученные данные не корректны'})
    }
    const result = await client.query(userRating(user_id, book_id))
    const rating = await result.rows[0]
    if (rating) {
      return res.status(200).json({success: true, rating: rating.rating})
    }
    res.status(200).json({success: true, rating: 0})
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}