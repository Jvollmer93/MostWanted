/*
Build all of your functions for displaying and gathering information below (GUI).
*/
"use strict";
//app(data);
// app is the function called to start the entire application
function app(people){
  let searchType = prompt("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    people = searchByName(people);
    for(let i = 0; i < people.length; i++){
      if (people[i] === true){
        let person = people[i];
        mainMenu(person, people);
      }
    }
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.").toLowerCase();
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  
alert(filteredPeople.length + " were found matching the criteria.");
for(let i=0; i<filteredPeople.length; i++){
  let foundPerson = filteredPeople[i];
  mainMenu(foundPerson, people);
}

}
// write functions searchBy Height, Eye Color, Gender, Age, Occuoation
function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");
  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.weight matches userInputWeight
  });
  return newArray;
}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.weight matches userInputWeight
  });

  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What color eyes does the person have?");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.weight matches userInputWeight
  });

  return newArray;
}

  function searchByGender(people) {
  let userInputGender = prompt("Is the person male or female?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
    // return true if el.weight matchges userInputWeight
  });

    return newArray;
}

  function searchByAge(people) {
  let userInputAge = prompt("How old is the person?");

  let newArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
    // return true if el.weight matchges userInputWeight
  });

    return newArray;
}



function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.weight matches userInputWeight
  });

  return newArray;
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  

  
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type 'next' to filter to the next found person. Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    getInfo(people, person);
    break;
    case "family":
    // TODO: get person's family, write funciton for getFamily
    getFamily();
    break;
    case "descendants":
    // TODO: get person's descendants, write function for getDescendants
    let start = people[0]
    let counter = 0;
    getDescendants(people, start, person, counter);
    break;
    case "restart":
    app(people); // restart
    break;
    case "next":
    return;
    case "quit":
    let userPrompt = prompt("Would you like to do another search? 'yes' or 'no'");
    while((userPrompt!=='yes')&&(userPrompt!=='no'))
    {
      userPrompt = prompt("Invalid input, enter 'yes' to do another search, 'no' to exit'");
    }
    if(userPrompt === 'yes'){
      app(people);
    }
    if(userPrompt === 'no'){
      alert("Thanks for using the system, refresh to start over.");
      process.exit();
    }
    default:
    return mainMenu(person, people); // ask again
  }
}

function getDescendants(people, start, person, counter){
  do{
    let counterTwo = 0;
    while(counterTwo < start.parents.length){
    if(start.parents[counterTwo] === person.personId){
      alert(start.firstName + " " + start.lastName + " is " + person.firstName + " " + person.lastName + "'s parent!");
    }
    counterTwo++;
  }
    counter++;
    start = people[counter]; 
    getDescendants(people, start, person, counter)
  }while(counter < people.length);
}

function getInfo(people, person){
  alert(JSON.stringify(person, null, 4));
  console.log(person);
}

function getFamily(){

}



function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);
  firstName = firstName.toLowerCase();
  lastName = lastName.toLowerCase();
  // TODO: find the person using the name they entered
  //filter through array of people to find match from user prompts
  let newArray = people.filter(function(el){
    if((el.firstName.toLowerCase() === firstName)&&(el.lastName.toLowerCase() === lastName)){
      return true;
    }
    else{
      return false;
    }
  })
  return newArray;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  let response;
  do{
  let response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
