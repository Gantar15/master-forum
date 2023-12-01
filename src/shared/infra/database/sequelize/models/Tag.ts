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
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "post",
          key: "post_id",
        },
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
    Tag.belongsTo(models.Post, {
      foreignKey: "post_id",
      targetKey: "post_id",
      as: "Post",
    });
  };

  return Tag;
};
