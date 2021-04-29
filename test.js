function getPrev() {
    fetch("https://www.thecocktaildb.com/images/ingredients/gin-Medium.png")
    .then(resp => {return resp.json()})
    .then(json => {
        console.log(json)
        //this[searchType](json.drinks);
    })

}

getPrev()