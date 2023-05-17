require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express()
const Person = require("./models/person")

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
morgan.token("entry", (request, response) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " "
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :entry"));

app.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.get("/api/person/:id", (request, response) => {
    Person.findById(request.params.id).then((person) => {
        person ? response.json(person) : response.status(404).end();
    });
});

app.post("/api/persons", (request, response) => {
    const newPerson = request.body;
    if (newPerson.name === undefined) {
        return response.status(400).json({
            error: 'name is missing'
        })
    } else if (newPerson.number === undefined) {
        return response.status(400).json({
            error: 'number is missing'
        })
    } else {
        const person = new Person({
            name: newPerson.name,
            number: newPerson.number,
        });
        person.save().then(savedPerson => {
            response.json(savedPerson);
        });
    }
});
//
// app.delete("/api/person/:id", (request, response) => {
//     const id = Number(request.params.id);
//     persons = persons.filter(entry => entry.id !== id);
//     response.status(204).end();
// });
//
// app.get("/info", (request, response) => {
//     const total = persons.reduce((count, people) => {
//         if (people.id) count ++;
//         return count
//     }, 0);
//
//     response.send(`<p>Phonebook has info for ${total} people\t</p><p>${new Date()}</p>`);
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running, port: ${PORT}`);
});