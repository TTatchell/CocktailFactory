/////////////////////////////////////////////////////////////////////////////////////////
//Big boy function that get
/////////////////////////////////////////////////////////////////////////////////////////

async function cockFetch(searchType, searchTerm) {
    let url;
    switch (searchType) {
        case "random":
            url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
            break;

        case "search":
            console.log("CALLING SEARCH")
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
            break;
        
        case "letter":
            console.log("CALLING LETTER");
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`;
            break;

        case "ingredient":
            console.log("CALLING INGREDIENT");
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
            break;

        case "id":
            console.log("CALLING ID");
            url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idFromDay()}`
            console.log(url)
            break;

        default:
            console.log("This ain't supposed to 'appen")
            break;
    }

    await fetch(url)
    .then(resp => {return resp.json()})
    .then(json => {
        //console.log(json)
        //console.log(searchType)
        this[searchType](json.drinks);
    })
}

/////////////////////////////////////////////////////////////////////////////////////////
//Code For Cocktail of the day
/////////////////////////////////////////////////////////////////////////////////////////

function loadDaily() {
    
    ////Loads Heading////

    let dailyHeading = document.createElement('h2');
    dailyHeading.appendChild(document.createTextNode("Cocktail Of The Day"));
    document.querySelector("#workingArea").appendChild(dailyHeading);

    ////Will eventually usecockFetch("id"); but for now will use:////
    
    cockFetch('random')
}

function id(package) {
    clearWorkingArea()

    const currentDrink = package[0]

    console.log(currentDrink)
    


}

function idFromDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    console.log(day)


    return day
    //cocktail id

}

/////////////////////////////////////////////////////////////////////////////////////////
//Code for Random Section
/////////////////////////////////////////////////////////////////////////////////////////

function loadRandom() {

    ////Loads Heading////

    let randomHeading = document.createElement('h2');
    randomHeading.appendChild(document.createTextNode("Discover A New Cocktail"));
    document.querySelector("#workingArea").appendChild(randomHeading);


    ////Loads Button////

    let randomButton = document.createElement('button');
    randomButton.id="randomSearch";
    randomButton.type="button";
    randomButton.appendChild(document.createTextNode("Random"));
    document.querySelector("#workingArea").appendChild(randomButton)
    document.querySelector("#randomSearch").addEventListener('click', function(){
        clearWorkingArea()
        cockFetch('random')})

    ////Loads Drink Container////

    // let containerDiv = document.createElement('div')
    // containerDiv.id = "discoverDrinkContainer"
    // document.querySelector('#workingArea').appendChild(containerDiv);

}

function random(package) {

    ////Loads Drink Container////

    let containerDiv = document.createElement('div')
    containerDiv.id = "discoverDrinkContainer"
    document.querySelector('#workingArea').appendChild(containerDiv);

    let currentDrink = package[0]
    let randomDrink = document.createElement('h3');
    let drinkName = currentDrink["strDrink"]

    randomDrink.appendChild(document.createTextNode(drinkName));
    document.querySelector('#discoverDrinkContainer').appendChild(randomDrink)

    let drinkPreview = document.createElement('img');
    drinkPreview.src = currentDrink["strDrinkThumb"];
    drinkPreview.alt = `Thumbnail of ${drinkName}`;
    drinkPreview.style.width = "200px";
    document.querySelector('#discoverDrinkContainer').appendChild(drinkPreview)

    let moreInfoButton = document.createElement('button');
    moreInfoButton.type = "button";
    moreInfoButton.appendChild(document.createTextNode("Check It Out!"))
    document.querySelector('#discoverDrinkContainer').appendChild(moreInfoButton)
    moreInfoButton.addEventListener('click', function() {
        displayMoreInfo(currentDrink)
    })
}

/////////////////////////////////////////////////////////////////////////////////////////
//Code For Search
/////////////////////////////////////////////////////////////////////////////////////////

function loadSearch() {

    ////Loads Heading////

    let searchHeading = document.createElement('h2');
    searchHeading.appendChild(document.createTextNode("Search"));
    document.querySelector("#workingArea").appendChild(searchHeading);

    ////Loads Search Box////

    //Div to store form
    let searchDiv = document.createElement('div');
    searchDiv.id = 'searchDiv';
    document.querySelector('#workingArea').appendChild(searchDiv);

    //Form container
    let searchForm = document.createElement('form');
    searchForm.id = 'searchForm';
    searchForm.onsubmit='return false';
    document.querySelector('#searchDiv').appendChild(searchForm);

    //Search Radio

    const radioArr = ["cocktail", "ingredient", "letter"]
    for (let index = 0; index < radioArr.length; index++) {

        //Creates a radio button and label for each item in above array
        let searchRadioX = document.createElement('input');
        searchRadioX.type = 'radio';
        searchRadioX.id = `${radioArr[index]}`;
        searchRadioX.name = 'typeOfSearch';
        searchRadioX.value = `${radioArr[index]}`;
        document.querySelector('#searchDiv').appendChild(searchRadioX);

        //Label for above
        let radioLabel = document.createElement('label');
        radioLabel.for = `${radioArr[index]}`;
        radioLabel.appendChild(document.createTextNode(`${radioArr[index].charAt(0).toUpperCase() + radioArr[index].slice(1)}`));
        document.querySelector(`#searchDiv`).appendChild(radioLabel);

        


        //Line break
        let lineBreak = document.createElement('br');
        document.querySelector('#searchDiv').appendChild(lineBreak);
    }
    
    //Search box
    let searchInputBox = document.createElement('input');
    searchInputBox.type = 'text';
    searchInputBox.placeholder = 'Looking for something?..';
    searchInputBox.id = 'searchInputBox';
    document.querySelector('#searchDiv').appendChild(searchInputBox);
}

    



/////////////////////////////////////////////////////////////////////////////////////////
// More info on the cocktails
/////////////////////////////////////////////////////////////////////////////////////////

function displayMoreInfo(currentDrink){
    clearWorkingArea()

    ////Loads Drink Container////

    let containerDiv = document.createElement('div')
    containerDiv.id = "moreInfoContainer"
    document.querySelector('#workingArea').appendChild(containerDiv);

    

    ////Heading////

    let drinkName = currentDrink["strDrink"]
    let randomDrink = document.createElement('h3');

    console.log(currentDrink)

    switch (currentDrink["strAlcoholic"]) {
        case "Alcoholic":
            alcoholicQuestion = " (Alcoholic)";            
            break;
        case "Non alcoholic":
            alcoholicQuestion = " (Non-Alcoholic)";
            break;
        case "Optional alcoholic":
            alcoholicQuestion = " (Optional-Alcoholic)";
            break;    
        default:
            alcoholicQuestion = "";
            break;
    }
    (currentDrink["strAlcoholic"] === "Alcoholic") ? alcoholicQuestion = " (Alcoholic)" : alcoholicQuestion = " (Non-Alcoholic)";
    randomDrink.appendChild(document.createTextNode(drinkName+alcoholicQuestion));
    document.querySelector('#moreInfoContainer').appendChild(randomDrink)

    ////Preview////

    let drinkPreview = document.createElement('img');
    drinkPreview.src = currentDrink["strDrinkThumb"];
    drinkPreview.alt = `Thumbnail of ${drinkName}`;
    drinkPreview.style.width = "200px";
    document.querySelector('#moreInfoContainer').appendChild(drinkPreview)

    ////Recommended Glass////

    let glassRecommend = document.createElement('h4');
    glassRecommend.appendChild(document.createTextNode(`Recommended Glass: ${currentDrink['strGlass']}`));
    document.querySelector('#moreInfoContainer').appendChild(glassRecommend)

    ////Ingredients////

    let ingredientHeading = document.createElement("h4");
    ingredientHeading.appendChild(document.createTextNode('Ingredients:'))
    document.querySelector('#moreInfoContainer').appendChild(ingredientHeading)

    let ingredientList = [];
    let current;
    let index = 0;
    let amount;

    //Creates an array of ingredients
    while (true) {
        current = currentDrink[`strIngredient${index+1}`]
        if (current === null || current === ""){break}
        if (currentDrink[`strMeasure${index+1}`] === "" || currentDrink[`strMeasure${index+1}`] === null) {amount = ""}
        else {amount = currentDrink[`strMeasure${index+1}`]}
        
        ingredientList[index] = amount + " " + currentDrink[`strIngredient${index+1}`].toLowerCase();
        index ++;
    }

    let unorderedList = document.createElement("ul")
    unorderedList.id = "ingredientList"
    document.querySelector('#moreInfoContainer').appendChild(unorderedList);

    for (let i = 0; i < ingredientList.length; i++) {
        let listItem = document.createElement('li');
        let itemText = ingredientList[i];
        listItem.appendChild(document.createTextNode(itemText));
        document.querySelector('#ingredientList').appendChild(listItem);
    }

    ////Instructions////

    let instructionsHeading = document.createElement("h4");
    instructionsHeading.appendChild(document.createTextNode("Instructions"));
    document.querySelector('#moreInfoContainer').appendChild(instructionsHeading)

    let instructionsOrderedList = document.createElement("ol");
    instructionsOrderedList.id = 'instructionList';
    document.querySelector('#moreInfoContainer').appendChild(instructionsOrderedList);


    let stepsArr = currentDrink['strInstructions'].split(/[!\.]/);

    for (let index = 0; index < stepsArr.length; index++) {
        if (stepsArr[index] === "") {
            break;
        }
        let stepItem = document.createElement("li");
        stepItem.appendChild(document.createTextNode(stepsArr[index]));
        document.querySelector('#instructionList').appendChild(stepItem);
    }

    

}

function separateSteps(string) {
    const stepsArr = string.split(".");
    return stepsArr

}

/////////////////////////////////////////////////////////////////////////////////////////
//Adding event listeners once page has loaded
/////////////////////////////////////////////////////////////////////////////////////////

function eventListeners() {

    //Random Cock
    document.querySelector("#navToDiscoverCocktail").addEventListener('click', function(){
        clearWorkingArea()
        loadRandom()})

    //Clear Page
    document.querySelector("#clearPage").addEventListener('click', function(){
        clearWorkingArea()})

    //Cock of the day
    document.querySelector("#navToDailyCocktail").addEventListener('click', function(){
        clearWorkingArea()
        loadDaily()
    })

    //Search for different cocks
    document.querySelector("#navToSearchContainer").addEventListener('click', function(){
        clearWorkingArea()
        loadSearch()
    })
}

function clearWorkingArea() {
    const content = document.querySelector("#workingArea");
    content.innerHTML = '';

}

////Runs all the good stuff once page has loaded
document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
    //cockFetch("id"); THIS WILL RUN COCKTAIL OF THE DAY but for now will use random
    loadDaily()
})