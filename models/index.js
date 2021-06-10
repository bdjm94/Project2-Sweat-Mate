// const User = require('./User');
// const Blog = require('./blog');

// User.hasMany(Blog, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Blog.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// module.exports = { User, Blog };

const User = require('./User');

module.exports = { User };
