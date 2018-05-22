/*
Build all of your functions for displaying and gathering information below (GUI).
*/
"use strict";
// app is the function called to start the entire application
function app(people){
  let searchType = prompt("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    let result = searchByName(people);
    let personName = result[0];
    displayPerson(result);
    mainMenu(personName, people);
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
      console.log(filteredPeople);
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
let userPrompt;
for(let i=0; i<filteredPeople.length; i++){
  let foundPerson = filteredPeople[i];
  prompt("Found " + JSON.stringify(filteredPeople, null, 4));
  do{
  userPrompt = prompt("Would you like to filter your search further? y/n");
  if(userPrompt === 'y'){
    searchByTraits(filteredPeople);
  }
  else if(userPrompt === 'n'){
  mainMenu(foundPerson, people);
}
}while((userPrompt!=='y')&&(userPrompt!=='n'))
}}
// write functions searchBy Height, Eye Color, Gender, Age, Occuoation
function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");
  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }// return true if el.weight matches userInputWeight
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
    }// return true if el.weight matchges userInputWeight
  });
    return newArray;
}
  function searchByAge(people) {
  let userInputAge = prompt("How old is the person?");
  userInputAge = parseInt(userInputAge);
  let todaysDate = prompt("What is today's date? Month/Day/Year");
  let age = 0;
  let todaysDateArray = todaysDate.split("/");
  //for(let i = 0; i < people.length; i++){
  let newArray = people.filter(function(el){
  age = 0;
  let dateArray = el.dob.split("/");
  //debugger;
      if (parseInt(dateArray[0])<parseInt(todaysDateArray[0])){
        age = 2018 - parseInt(dateArray[2]);
      }
      else if (parseInt(dateArray[0])>parseInt(todaysDateArray[0])){
        age = 2017 - parseInt(dateArray[2]);
      }
      else{
        if(parseInt(dateArray[1])<parseInt(todaysDateArray[1])){
          age = 2017 - parseInt(dateArray[2]);
        }
        else{
          age = 2018 - parseInt(dateArray[2]);
        }
      }
      if(age === userInputAge) {
      console.log(el.firstName + " is " + age);
      return true;
    }
    else{
      return false;
    }
    
    });
    return newArray;
}
function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?");
  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }// return true if el.weight matches userInputWeight
  });
  return newArray;
}// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people);//restart
  }  
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type 'next' to filter to the next found person. Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
    getInfo(people, person);
    break;
    case "family":// TODO: get person's family, write funciton for getFamily
    getFamily(people, person);
    break;
    case "descendants":
    let descendantsArray = getDescendants(people, person);
    console.log(person.firstName + " " + person.lastName + "'s descendants: ");
    for(let i = 0; i < descendantsArray.length; i++){
    console.log(descendantsArray[i].firstName + " " + descendantsArray[i].lastName);
    }
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
    return mainMenu(person, people);//ask again
  }
}
function getDescendants(people, person, descendantsArray = []){
      let newDescendantsArray = [];
      let concatArray = [];
       people.filter(function(el){
        for(let i = 0; i < el.parents.length; i++){
         if(el.parents[i] === person.personId){
          //alert(person.firstName + " " + person.lastName + " is " + el.firstName + " " + el.lastName + "'s parent!");
          descendantsArray.push(el);
          return true;
        }
         else{
          return false;
        }
      }
    }
); 
    for(let i = 0; i < descendantsArray.length; i++){
    let newPerson = descendantsArray[i];  
    newDescendantsArray = getDescendants(people, newPerson, newDescendantsArray);
    concatArray = descendantsArray.concat(newDescendantsArray)
  }
  
return concatArray;}


function getInfo(people, person){
  alert(JSON.stringify(person, null, 4));
  console.log(person);
}
function searchByName(people){
  let firstName = prompt("What is the person's first name?", chars).toLowerCase();
  let lastName = prompt("What is the person's last name?", chars).toLowerCase();//filter through array of people to find match from user prompts
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
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPerson(person){
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender: " + person[0].gender + "\n";
  personInfo += "Date of BirthL: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  personInfo += "Occupation: " + person[0].occupation;
  alert(personInfo);
  return personInfo;
}
function promptFor(question, valid){
  let response;
  do{
    response = prompt(question).trim();
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
function getFamily(people, person){
  let spouse;
  let parentsArray = [];
  let siblingsArray;
  spouse = getSpouse(people, person);
  parentsArray = getParents(people, person);
  siblingsArray = getSiblings(people, person);
}
function getSpouse(people, person){
   for (let i = 0; i < people.length; i++){
     if (people[i].currentSpouse === person.personId) {
     alert(person.firstName + " " + person.lastName + " is married to " + people[i].firstName + " " + people[i].lastName);
     return people[i];
     } 
   } 
 } 
function getParents(people, person, parentsArray = []){
   people.filter(function(el){
     for (let i = 0; i < person.parents.length; i++){
       if (el.personId === person.parents[i]) {
       alert(el.firstName + " " + el.lastName + " is the parent of " + person.firstName + " " + person.lastName);
       parentsArray.push(el);
       return true; 
   }
       else{
          return false;
       } 
     } 
   } 
 );return parentsArray;
 }
function getSiblings(people, person){
 let siblingsArray = [];
 people.filter(function(el){
     for (let i = 0; i < el.parents.length; i++){
      for (let j = 0; j < person.parents.length; j++){
        if (el.parents[i] === person.parents[j]) {
          if(el.personId !== person.personId){
            alert(el.firstName + " " + el.lastName + " is " + person.firstName + " " + person.lastName + "'s sibling!")
            siblingsArray.push(el);
            return true;
          }
          else{
            return false;
          }
      }
     } 
   } 
 }); return siblingsArray;
 }
