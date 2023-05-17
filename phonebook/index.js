require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
// eslint-disable-next-line no-unused-vars
morgan.token('entry', (request, response) => (request.method === 'POST' ? JSON.stringify(request.body) : ' '));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :entry'));

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
  // eslint-disable-next-line no-undef
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const newPerson = request.body;
  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
  });
  person.save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const record = request.body;
  const person = {
    name: record.name,
    number: record.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
  // eslint-disable-next-line no-unused-vars
    .then((result) => {
      response.status(204).end();
    })
  // eslint-disable-next-line no-undef
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then((count) => {
      response.send(`<p>Phonebook has info for ${count} people\t</p><p>${new Date()}</p>`);
    });
});

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  // eslint-disable-next-line no-console
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running, port: ${PORT}`);
});
