// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
// might have to use cascade to make sure if category is deleted, associated products are also deleted, leaving it out for now

Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

// Category have many Product
// also leaving it out here onDelete: 'cascade'
Category.hasMany(Product, {
  foreignKey: 'category_id',
})

// Product belongToMany Tag (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag });

// Tag belongToMany Product (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
