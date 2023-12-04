export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      category_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "category",
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Post, { foreignKey: "category_id", as: "Posts" });
  };

  return Category;
};
