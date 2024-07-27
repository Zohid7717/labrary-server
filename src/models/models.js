const { types } = require('pg')
const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Admin = sequelize.define('admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: { type: DataTypes.STRING, allowNull: false }
})

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketBook = sequelize.define('basket_book', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Book = sequelize.define('book', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  publication_date: { types: DataTypes.STRING },
  count: { types: DataTypes.INTEGER, defaultValue: 0 },
  image: {types: DataTypes.STRING}
})

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Author = sequelize.define('author', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Publisher = sequelize.define('publisher', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const User = sequelize.Sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  passport_information: { type: DataTypes.STRING, unique:true, allowNull: false },
  phone_number: {type: DataTypes.STRING, allowNull: false}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(Book)
Book.belongsTo(Basket)

Book.hasMany(Author)
Author.belongsToMany(Book)

Book.hasOne(Category)
Category.belongsToMany(Book)


