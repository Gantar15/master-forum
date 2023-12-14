export default (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "member",
          key: "member_id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "category",
          key: "category_id",
        },
      },
      type: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_num_comments: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "post",
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.Member, {
      foreignKey: "member_id",
      targetKey: "member_id",
      as: "Member",
    });
    Post.belongsTo(models.Category, {
      foreignKey: "category_id",
      targetKey: "category_id",
      as: "Category",
    });
    Post.hasMany(models.PostVote, { foreignKey: "post_id", as: "Votes" });
    Post.hasMany(models.Comment, { foreignKey: "post_id", as: "Comments" });
    Post.belongsToMany(models.Tag, {
      through: "posts_tags",
      foreignKey: "post_id",
    });
  };

  return Post;
};
