const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Please input the password, exiting...");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.micnbvn.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });
    person.save().then(result => {
        console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
    });
} else {
    Person.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`);
        });
        mongoose.connection.close();
    });
}