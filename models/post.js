const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.STRING(455),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
  }, {});
  Post.associate = (models) => {
    // associations can be defined here
    Post.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return Post;
};
