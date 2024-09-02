const client = require('../db')

const addTagQuery = 'INSERT INTO tags (tag_uz_title, tag_ru_title) VALUES ($1, $2) RETURNING *'
const getTagsQuery = 'SELECT * FROM tags'
const isUsedQuery = (baseParam) => {
  return `SELECT EXISTS (SELECT 1 FROM tags WHERE ${baseParam} = $1)`
}
const getOne = 'SELECT * FROM tags WHERE id=$1'
const deleteTagQuery = `DELETE FROM tags WHERE id = $1 RETURNING *`

exports.addTag = async (req, res) => {
  try {
    const { tag_uz_title, tag_ru_title } = req.body
    if (!tag_uz_title || !tag_ru_title) {
      return res.status(404).json({ success: false, message: 'Данные не полностью' })
    }
    const isUsedInUz = await client.query(isUsedQuery('tag_uz_title'), [tag_uz_title])
    if (isUsedInUz.rows[0].exists) {
      return res.status(405).json({ success: false, message: 'На узбекском такой тег существует' })
    }
    const isUsedInRu = await client.query(isUsedQuery('tag_ru_title'), [tag_ru_title])
    if (isUsedInRu.rows[0].exists) {
      return res.status(405).json({ success: false, message: 'На русском такой тег существует' })
    }
    await client.query(addTagQuery, [tag_uz_title, tag_ru_title])
    const tags = await client.query(getTagsQuery)
    res.status(200).json({ success: true, tags: tags.rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Ошибка севера. Повторите попытку!' })
  }
}

exports.getTags = async (req, res) => {
  try {
    const tags = await client.query(getTagsQuery)
    res.status(200).json({ success: true, tags: tags.rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Ошибка севера. Повторите попытку!' })
  }
}

exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params
    const result = await client.query(deleteTagQuery, [id])
    if (result.rowCount === 0) {
      return res.status(400).json({success: false, message: 'Тагой тег не найден!'})
    }
    res.status(200).json({ success: true, message: 'Тег успешно удален' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Ошибка севера. Повторите попытку!' })
  }
}