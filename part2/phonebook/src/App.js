import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [personOnDisplay, setPersonOnDisplay] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
        .getAll()
        .then((initPerson) => {
            setPersons(initPerson);
            setPersonOnDisplay(initPerson);
        });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const addPerson = (event) => {
    event.preventDefault();
    const currentName = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (currentName.length === 0) {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setPersonOnDisplay(persons.concat(returnedPerson));
          setMessage(`Added ${newPerson.name} to phonebook`);
        })
        .catch((error) => setMessage(error.response.data.error));
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(currentName[0].id, newPerson)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );
            setPersons(updatedPersons);
            setPersonOnDisplay(updatedPersons);
            setMessage(`Updated ${newPerson.name}'s number`);
          })
          .catch((error) => setMessage(`Information of ${newPerson.name} has already been removed from the server`));
      }
    }
    setNewPerson({ name: "", number: "" });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
          .remove(id)
          .then((response) => {
              const updatedPersons = persons.filter((person) => person.id !== id);
              setPersons(updatedPersons);
              setPersonOnDisplay(updatedPersons);
              setMessage(`Removed ${name} from phonebook`);
          });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const filterByName = (event) => {
    const search = event.target.value;
    setFilter(search);
    setPersonOnDisplay(
      persons.filter((person) => person.name.toLowerCase().includes(search))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={filterByName} />
      <h2>Add new entry here:</h2>
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Persons personOnDisplay={personOnDisplay} deletePerson={deletePerson} />
    </div>
  );
};

export default App;