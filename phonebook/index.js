const express = require("express");
const morgan = require("morgan");
const app = express()

app.use(express.json());
morgan.token("entry", (request, response) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " "
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :entry"));

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
    const person = persons.find((entry) => entry.id === id);
    person ? response.json(person) : response.status(404).end();
});

app.post("/api/persons", (request, response) => {
    let id = 0;
    const newPerson = request.body;
    if (!newPerson.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    } else if (!newPerson.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    } else if (persons.find((entry) => entry.name === newPerson.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else {
        while (true) {
            id = Math.floor(Math.random() * 100000000);
            if (!persons.find((entry) => entry.id === id)) {
                break;
            }
        }
        newPerson.id = id;
        // console.log(`new person entry: ${newPerson.name}, ${newPerson.number}`);
        persons = persons.concat(newPerson);
        response.json(newPerson);
    }
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