const Persons = ({ personOnDisplay, deletePerson }) => {
  return (
    <div>
      {personOnDisplay.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;