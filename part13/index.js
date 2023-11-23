require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.findAll();
  response.json(blogs);
});

app.post('/api/blogs', async (request, response) => {
  const body = request.body;
  try {
    const newBlog = Blog.build(body);
    await newBlog.save();

    return response.status(201).json(newBlog);
  } catch (error) {
    return response.status(400).json(error);
  }
});

app.delete('/api/blogs/:id', async (request, response) => {
  const id = request.params.id;
  try {
    const blog = await Blog.findByPk(id);
    await blog.destroy();
    return response.status(204).end();
  } catch (error) {
    return response.status(400).json(error);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
