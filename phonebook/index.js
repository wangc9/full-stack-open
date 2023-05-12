const express = require("express");
const app = express()

app.use(express.json());

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
];

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/person/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((entry) => entry.id === id)
    person ? response.json(person) : response.status(404).end();
});

app.delete("/api/person/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(entry => entry.id !== id);
    response.status(204).end();
});

app.get("/info", (request, response) => {
    const total = persons.reduce((count, people) => {
        if (people.id) count ++;
        return count
    }, 0);

    response.send(`<p>Phonebook has info for ${total} people\t</p><p>${new Date()}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running, port: ${PORT}`);
});