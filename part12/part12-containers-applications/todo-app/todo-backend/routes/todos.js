const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const count = await redis.getAsync('count');
  await redis.setAsync('count', parseInt(count) + 1);
  res.send(todo);
});

router.get('/statistics', async (req, res) => {
  const count = await redis.getAsync('count');
  res.send({
    added_todos: parseInt(count),
  });
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const oldTodo = req.todo;
  const newTodo = {
    text: req.body.text ? req.body.text : oldTodo.text,
    done: typeof req.body.done !== 'undefined' ? req.body.done : oldTodo.done,
  };
  const updated = await Todo.findByIdAndUpdate(oldTodo._id, newTodo, { new:true });
  res.send(updated);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
