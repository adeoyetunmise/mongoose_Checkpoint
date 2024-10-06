const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


PORT = 5000;
// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>{
    console.log('connected to database');
    
  })

  .catch((err) =>{
    console.log(err);
    
  })

//   Define the Person schema with name, age, and favoriteFoods:
const personSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }, 
    age: Number,
    favoriteFoods: [String], // Array of strings for favorite foods
  });
  
  // Create the model based on the schema
  const Person = mongoose.model('Person', personSchema);

  // Function to create and save a person using async/await
  const createPerson = async () => {
    const person = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Pasta'],
    });
  
    try {
      // Save the new person record using await
      const savedPerson = await person.save();
      console.log('Person saved:', savedPerson);
    } catch (err) {
      console.error('Error saving person:', err);
    }
  };
  

// Array of people to be created
const arrayOfPeople = [
    { name: 'John Doe', age: 30, favoriteFoods: ['Pizza', 'Pasta'] },
    { name: 'Jane Smith', age: 25, favoriteFoods: ['Salad', 'Sushi'] },
    { name: 'Mike Johnson', age: 35, favoriteFoods: ['Burgers', 'Steak'] },
    // Add more people as needed
  ];
  
  // Function to create multiple people using async/await
  const createManyPeople = async () => {
    try {
      // Use await to wait for the create() operation to complete
      const data = await Person.create(arrayOfPeople);
      console.log('People created:', data);
    } catch (err) {
      console.error('Error creating people:', err);
    }
  };
  
  // Call the function to create people
  createManyPeople();
  

//   Find all people with a given name:
const findPeopleByName = async (name) => {
    try {
      // Use await to wait for the find() operation to complete
      const people = await Person.find({ name });
      console.log('People found:', people);
    } catch (err) {
      console.error('Error finding people:', err);
    }
  };
  findPeopleByName('John Doe')
  

//   Find one person based on their favorite food:
const findOneByFood = async (foods) => {
    try {
      // Use $in to find one person whose favoriteFoods contain any of the foods in the array
      const person = await Person.findOne({ favoriteFoods: { $in: foods } });
      console.log('Person found by favorite food:', person);
    } catch (err) {
      console.error('Error finding person by favorite food:', err);
    }
  };
  
  // Call the function with an array of foods
  findOneByFood(['Salad', 'Sushi']); 
  

//   Find a person by their ID
const findPersonById = async (personId) => {
    try {
      // Use await to find the person by ID
      const person = await Person.findById(personId);
      console.log('Person found by ID:', person);
    } catch (err) {
      console.error('Error finding person by ID:', err);
    }
  };
    findPersonById('670049f07da02738b6a0062f')  

//   Find a person by their ID and add "hamburger" to their favorite foods:
const findEditThenSave = async (personId) => {
    try {
      // Find the person by ID
      const person = await Person.findById(personId);
  
      if (!person) {
        return console.log('Person not found');
      }
  
      // Add 'hamburger' to the favoriteFoods array
      person.favoriteFoods.push('hamburger');
  
      // Save the updated person document
      const updatedPerson = await person.save();
      console.log('Person updated with hamburger:', updatedPerson);
  
    } catch (err) {
      console.error('Error updating person:', err);
    }
  };
    findEditThenSave('6700467a873080b04727efe0')  

//   Find a person by name and set their age to 20:
const findAndUpdateAge = async (personName) => {
    try {
      // Find a person by name and update their age to 20
      const updatedPerson = await Person.findOneAndUpdate(
        { name: personName }, // Search by name
        { age: 20 },          // Update age to 20
        { new: true }         // Return the updated document
      );
  
      console.log('Person updated:', updatedPerson);
    } catch (err) {
      console.error('Error updating person:', err);
    }
  };
    findAndUpdateAge('Mike Johnson')  

//   Remove a person by their ID:
const removePersonById = async (personId) => {
    try {
      // Use findByIdAndRemove to remove the person by ID
      const removedPerson = await Person.findByIdAndDelete(personId);
  
      if (!removedPerson) {
        console.log('No person found with that ID');
        return;
      }
  
      console.log('Person removed:', removedPerson);
    } catch (err) {
      console.error('Error removing person:', err);
    }
  };
    removePersonById('670048999fcb54b2acce9845')  

//   Delete all people named "Mary":
const removeAllMarys = async () => {
  try {
    // Use deleteMany to remove all people named Mary
    const result = await Person.deleteMany({ name: 'Mary' });

    console.log('People named Mary removed:', result.deletedCount);
  } catch (err) {
    console.error('Error removing people named Mary:', err);
  }
};
    removeAllMarys()

//   Find people who like burritos, sort them by name, limit the results to two, and hide their age:
const queryChain = async () => {
    try {
      // Chain the query to find people who like burritos
      const data = await Person.find({ favoriteFoods: 'burritos' })
        .sort({ name: 1 }) // Sort by name (ascending)
        .limit(2) // Limit to two results
        .select('-age'); // Exclude age
  
      console.log('People who like burritos:', data);
    } catch (err) {
      console.error('Error querying people:', err);
    }
  };
  
  // Call the function to execute the query
  queryChain();
  
  app.listen(PORT, (err) =>{
    console.log('listening at '+ PORT);
    
  })










  



  