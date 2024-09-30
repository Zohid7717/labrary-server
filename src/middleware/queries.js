exports.generateUniqueID = () => {
  return new Date().getTime().toString(36) + Math.random().toString(36).substr(2, 9);
}

exports.isUsedQuery = (table, column, value) => {
  return `SELECT EXISTS (SELECT 1 FROM ${table} WHERE ${column} = '${value}')`
}

exports.getItemQuery = (table, column, value) => {
  return `SELECT * FROM ${table} WHERE ${column}='${value}'`
}

exports.createItem = (table, item, value) => {
  return `INSERT INTO ${table} (${item}) VALUES ('${value}') RETURNING *`
}

exports.addOncomingId = (table, value_1, value_2) => {
  return `INSERT INTO ${table} VALUES (${value_1}, ${value_2})`
}

exports.getBookQuery = (id) => {
  return `SELECT 
      books.id, 
      books.title, 
      books.h_book, 
      books.e_book, 
      books.a_book, 
      books.quantity, 
      books.book_lang, 
      books.price, 
      books.book_location, 
      books.book_about, 
      books.e_book_img, 
      books.fragment, 
      books.image, 
      books.a_book_file,
      books.number_of_voters,
      books.sum_of_ratings,
      STRING_AGG(DISTINCT authors.author_name, ', ') AS authors_names, 
      categories.category_title
    FROM 
      books 
    INNER JOIN books_authors ON books_authors.book_id = books.id 
    INNER JOIN authors ON books_authors.author_id = authors.id 
    INNER JOIN categories ON categories.id = books.category_id
    WHERE 
      books.id = ${id}
    GROUP BY 
      books.id, 
      books.title, 
      books.h_book, 
      books.e_book, 
      books.a_book, 
      books.quantity, 
      books.book_lang, 
      books.price, 
      books.book_location, 
      books.book_about, 
      books.e_book_img, 
      books.fragment, 
      books.image, 
      books.a_book_file, 
      books.number_of_voters,
      books.sum_of_ratings,
      categories.category_title;`
};


exports.userRating = (user_id, book_id) => {
  return `SELECT rating
    FROM ratings
    WHERE user_id = ${user_id} AND book_id = ${book_id};
  `
}
