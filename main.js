"use strict"

// loading screen delay
let delay = 2500; // delay time in milliseconds
let timeoutId = setTimeout(function () {
    // alert('Welcome to Coffee!');
    let loading = document.getElementById("loading");
    loading.className = "d-none";
    let mainPage = document.getElementById("main-page");
    mainPage.className = "d-block fluid-container text-center";
}, delay);

// builds HTML structure of coffee element
function renderCoffee(coffee) {
    let html = '<div class="coffee row coffee-item">';
    html += '<h4 class="col text-left">' + coffee.name + '</h4>';
    html += '<p class="col text-right">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

// calls renderCoffee on all coffees[] elements
function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// updates coffee list based on roast selection
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];

    if(selectedRoast === "all"){
        tbody.innerHTML = renderCoffees(coffeesData);
        return;
    }

    coffeesData.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {   // light/ medium/ dark
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// updates coffee list based on name search
function searchCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data

    let searchName = coffeeSearch.value;
    let filteredCoffees = [];

    if (searchName === "") {  // revert to entire list when search input is empty
        tbody.innerHTML = renderCoffees(coffeesData);
        return;
    }

    searchName = searchName.toLowerCase();

    coffeesData.forEach(function (coffee) {
        // if (coffee.name.toLowerCase() === searchName) { // matches completely
        //     filteredCoffees.push(coffee);
        // }

        if (coffee.name.toLowerCase().startsWith(searchName)) { // partial match
            filteredCoffees.push(coffee);
        }

    });

    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// add new coffee to list
function addCoffee(e){
    e.preventDefault();

    // let currentName = newName.value;
    // let currentRoast = newRoast.value;
    // let newCoffee = document.createElement("div");
    //
    // let html = '<div class="coffee row coffee-item">';
    // html += '<h4 class="col text-left">' + currentName + '</h4>';
    // html += '<p class="col text-right">' + currentRoast + '</p>';
    // html += '</div>';
    //
    // newCoffee.innerHTML = html;
    // tbody.appendChild(newCoffee);

    let newCoffee = {
        id: coffeesData[coffeesData.length - 1].id + 1,   //gets id of last element then add 1
        name: newName.value,
        roast: newRoast.value
    };

    coffees.push(newCoffee);
    localStorage.setItem("localCoffees", JSON.stringify(coffees));  // save to local
    coffeesData = JSON.parse(localStorage.getItem("localCoffees")); // retrieve from local

    tbody.innerHTML = renderCoffees(coffeesData);  // render
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// DOM elements
let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let coffeeSearch = document.querySelector('#search-field')
let newRoast = document.getElementById("adding-roast-selection");
let newName = document.getElementById("add-coffee-name");
let addButton = document.getElementById("add-coffee-btn");
let removeButton = document.querySelector('#remove-coffee-btn');
let coffeesData; // local storage array of coffees

// Initialize or retrieve localStorage
if(!localStorage || localStorage.length === 0){  // localStorage is not yet initialized
    localStorage.setItem("localCoffees", JSON.stringify(coffees));
    coffeesData = JSON.parse(localStorage.getItem("localCoffees"));
    tbody.innerHTML = renderCoffees(coffeesData);
} else {
    coffeesData = JSON.parse(localStorage.getItem("localCoffees"));
    tbody.innerHTML = renderCoffees(coffeesData);
}

//Remove Items from Local Storage
removeButton.addEventListener('click', function () {
    localStorage.clear();
})

// DOM events
roastSelection.addEventListener('change', updateCoffees);
coffeeSearch.addEventListener('keyup', searchCoffees);
addButton.addEventListener('click', addCoffee);