"use strict";

function app(people){
  let searchType = prompt("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", "").toLowerCase();
  switch(searchType){
    case 'yes':
      let result = searchByName(people);
      let person = result[0];
      mainMenu(person, people);
      break;
    case 'no':
      searchByTraits(people);
      break;
    default:
      alert("Incorrect input. Please try again, following the instructions please. :)");
      app(people);
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.", "").toLowerCase();
  userSearchChoice = userSearchChoice.split(", ");
  let filteredPeople = [];
  for(let i = 0; i < userSearchChoice.length; i++){
  switch(userSearchChoice[i]) {
    case "height":
      filteredPeople.push(searchByHeight(people));
      break;
    case "weight":
      filteredPeople.push(searchByWeight(people));
      break;
    case "eye color":
      filteredPeople.push(searchByEyeColor(people));
      break;
    case "gender":
      filteredPeople.push(searchByGender(people));
      break;
    case "age": 
      filteredPeople.push(searchByAge(people));
      break;
    case "occupation":
      filteredPeople.push(searchByOccupation(people));
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  
  }
  filteredPeople = sym(filteredPeople);
  alert(filteredPeople.length + " were found matching the criteria.");

    for (let i = 0; i < filteredPeople.length; i++){
    let foundPerson = filteredPeople[i];
    mainMenu(foundPerson, people)
    }
  //let userPrompt;
  //do{
  //   userPrompt = prompt("Would you like to filter your search further? y/n", "");
  // }while((userPrompt !== 'y')&&(userPrompt !== 'n'));
  
  // if(userPrompt === 'y'){
  //   searchByTraits(filteredPeople);
  // }
  // else{
  //   for (let i = 0; i < filteredPeople.length; i++){
  //   let foundPerson = filteredPeople[i];
  //   mainMenu(foundPerson, people)
  //   }
  // }
}

function sym(filteredPeople) {
  let finalArr = [];
    let newArr = filteredPeople[0].reduce( function(prev, e1) {
    if(prev.indexOf(e1) < 0 && filteredPeople.every( function(arr){
      return arr.indexOf(e1) > -1;
    })){
    return [...prev, e1];    
    }else{
      return prev;
    };
  },[]);        
  return newArr;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?", "");
  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });
  return newArray;
}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person?", "");
  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });
  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What color eyes does the person have?", "");
  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
  });
  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("Is the person male or female?", "");
  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
  return newArray;
}

function searchByAge(people) {
 let userInputAge = prompt("How old is the person?", "");
 userInputAge = parseInt(userInputAge);
 let todaysDate = prompt("What is today's date? Month/Day/Year", "");
 let ageArray = determineAge(userInputAge, todaysDate, people);
 return ageArray;
}
 
function determineAge(userInputAge, todaysDate, people){
 let age = 0;
 let todaysDateArray = todaysDate.split("/");
 let newArray = people.filter(function(el){
   age = 0;
   let dateArray = el.dob.split("/");
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
     return true;
   }
   else {
     return false;
   }
 });
 return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?", "");
  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });
  return newArray;
}

function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }  
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type 'next' to filter to the next found person. Type the option you want or 'restart' or 'quit'", "");
  switch(displayOption){
    case "info":
      getInfo(people, person);
      break;
    case "family":
      let familyArray = getFamily(people, person);
      break;
    case "descendants":
      let descendantsArray = getDescendants(people, person);
      console.log(person.firstName + " " + person.lastName + "'s descendants: ");
      for(let i = 0; i < descendantsArray.length; i++){
       console.log(descendantsArray[i].firstName + " " + descendantsArray[i].lastName);
      }
      break;
    case "restart":
      app(people);
      break;
    case "next":
      return;
    case "quit":
      let userPrompt = prompt("Would you like to do another search? 'yes' or 'no'", "");
      while((userPrompt!=='yes')&&(userPrompt!=='no')){
        userPrompt = prompt("Invalid input, enter 'yes' to do another search, 'no' to exit'", "");
      }
      if(userPrompt === 'yes'){
        app(people);
      }
      if(userPrompt === 'no'){
        process.exit();
      }
    default:
    return mainMenu(person, people);
  }
}

function getDescendants(people, person, descendantsArray = []){
  let newDescendantsArray = [];
  let concatArray = [];
  people.filter(function(el){
    for(let i = 0; i < el.parents.length; i++){
      if(el.parents[i] === person.personId){
        descendantsArray.push(el);
        return true;
      }
      else {
        return false;
      }
    }
  }); 

  for(let i = 0; i < descendantsArray.length; i++){
    let newPerson = descendantsArray[i];  
    newDescendantsArray = getDescendants(people, newPerson, newDescendantsArray);
    concatArray = descendantsArray.concat(newDescendantsArray)
  }
  return concatArray;
}

function getInfo(people, person){
  let personInfo = displayPerson(person);
}

function searchByName(people){
  let firstName = prompt("What is the person's first name?", "").toLowerCase();
  let lastName = prompt("What is the person's last name?", "").toLowerCase();
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
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation;
  console.log(personInfo);
  return personInfo;
}

function promptFor(question, valid){
  let response;
  do{
    response = prompt(question).trim();
  } while(!response || !valid(response));
  
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true;
}

function getFamily(people, person){
  let familyArray = [];
  familyArray.push(getSpouse(people, person));
  familyArray.push(getParents(people, person));
  familyArray.push(getSiblings(people, person));
  familyArray.push(getChildren(people, person));
  return familyArray;
}

function getSpouse(people, person){
 for (let i = 0; i < people.length; i++){
   if (people[i].currentSpouse === person.personId) {
   console.log(person.firstName + " " + person.lastName + " is married to " + people[i].firstName + " " + people[i].lastName + ".");
   return people[i];
   } 
 } 
} 

function getParents(people, person, parentsArray = []){
   people.filter(function(el){
     for (let i = 0; i < person.parents.length; i++){
      if (el.personId === person.parents[i]) {
       console.log(el.firstName + " " + el.lastName + " is the parent of " + person.firstName + " " + person.lastName + ".");
       parentsArray.push(el);
       return true; 
      }
      else{
        return false;
      } 
    } 
   });return parentsArray;
}

function getSiblings(people, person){
 let siblingsArray = [];
 people.filter(function(el){
    for (let i = 0; i < el.parents.length; i++){
      for (let j = 0; j < person.parents.length; j++){
        if (el.parents[i] === person.parents[j]) {
          if(el.personId !== person.personId){
            console.log(el.firstName + " " + el.lastName + " is " + person.firstName + " " + person.lastName + "'s sibling.")
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

function getChildren(people, person){
  let childrenArray = [];
  people.filter(function(el){
    for(let i = 0; i < el.parents.length; i++){
      if(el.parents[i] === person.personId){
        childrenArray.push(el);
        console.log(childrenArray[i].firstName + " " + childrenArray[i].lastName + " is " + person.firstName + " " + person.lastName + "'s child.")
        return true;
      }
      else {
        return false;
      }
    }
  }); return childrenArray;
}