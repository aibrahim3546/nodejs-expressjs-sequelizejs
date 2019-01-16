module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'userId',
    });
  };
  return User;
};
