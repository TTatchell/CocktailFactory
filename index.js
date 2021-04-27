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

        default:
            console.log("This ain't supposed to 'appen")
            break;
    }

    await fetch(url)
    .then(resp => {return resp.json()})
    .then(json => {
        this[searchType](json.drinks);
    })
}



/////////////////////////////////////////////////////////////////////////////////////////
//Code For Cocktail of the day
/////////////////////////////////////////////////////////////////////////////////////////

// const now = new Date();
// const start = new Date(now.getFullYear(), 0, 0);
// const diff = now - start;
// const oneDay = 1000 * 60 * 60 * 24;
// const day = Math.floor(diff / oneDay);
// console.log('Day of year: ' + day);


/////////////////////////////////////////////////////////////////////////////////////////
//Code for Random Section
/////////////////////////////////////////////////////////////////////////////////////////

function random(package) {
    let currentDrink = package[0]
    console.log(currentDrink)

    clearPreviousRandom()

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
        clearPreviousRandom()
        displayMoreInfo(currentDrink)
    })
}

function clearPreviousRandom(){
    const content = document.querySelector("#discoverDrinkContainer");
    content.innerHTML = '';
}



/////////////////////////////////////////////////////////////////////////////////////////
// More info on the cocktails
/////////////////////////////////////////////////////////////////////////////////////////

function displayMoreInfo(currentDrink){
    clearMoreInfo()

    //Heading
    let drinkName = currentDrink["strDrink"]
    let randomDrink = document.createElement('h3');

    console.log(currentDrink["strAlcoholic"]);
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

    //Preview
    let drinkPreview = document.createElement('img');
    drinkPreview.src = currentDrink["strDrinkThumb"];
    drinkPreview.alt = `Thumbnail of ${drinkName}`;
    drinkPreview.style.width = "200px";
    document.querySelector('#moreInfoContainer').appendChild(drinkPreview)

    //Ingredients
    let ingredientHeading = document.createElement("h4");
    ingredientHeading.appendChild(document.createTextNode('Ingredients:'))
    document.querySelector('#moreInfoContainer').appendChild(ingredientHeading)

    let ingredientList = [];
    let current;
    let index = 0;
    let amount;

    while (true) {
        current = currentDrink[`strIngredient${index+1}`]
        if (current === null || current === ""){break}
        if (currentDrink[`strMeasure${index+1}`] === "" || currentDrink[`strMeasure${index+1}`] === null) {amount = ""}
        else {amount = currentDrink[`strMeasure${index+1}`]}
        ingredientList[index] = amount + currentDrink[`strIngredient${index+1}`].toLowerCase();
        console.log(current, index)
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
    


}

function clearMoreInfo(){
    const content = document.querySelector("#moreInfoContainer");
    content.innerHTML = '';
}

/////////////////////////////////////////////////////////////////////////////////////////
//Adding event listeners once page has loaded
/////////////////////////////////////////////////////////////////////////////////////////

function eventListeners() {
    //Random Cocktail
    document.querySelector("#randomSearch").addEventListener('click', function(){cockFetch('random')})
}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})