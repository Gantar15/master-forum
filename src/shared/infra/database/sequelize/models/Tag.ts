export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "tag",
    {
      tag_id: {
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
      tableName: "tag",
    }
  );

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Post, {
      through: "posts_tags",
      foreignKey: "tag_id",
    });
  };

  return Tag;
};
