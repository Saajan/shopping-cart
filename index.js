var categories = [];
var recipes = [];

!async function () {
    let data = await fetch("http://temp.dash.zeta.in/food.php")
        .then((response) => response.json())
        .then(data => {
            categories = data.categories;
            recipes = data.recipes;
            createFavorites(recipes);
            createCategory(categories);
            createRecipesList(recipes);
            return categories, recipes;
        })
        .catch(error => {
            console.error(error);
        });
}();

function searchRecipes() {
    let inputValue = document.getElementById("autocomplete-input").value;
    var searchTerm = inputValue;
    console.log(inputValue);
    let matchedTerms = [];
    searchTerm = searchTerm.toLowerCase();
    // -----------------ans1--------------------
    matchedTerms = recipes.filter(function (i) {
        return i.name.toLowerCase().indexOf(searchTerm) > -1;
    });
    createRecipesList(matchedTerms);
}

function createFavorites(recipesList) {
    let favRecipeList = recipesList.filter((recipe) => recipe.isFavourite);
    let recipesListElement = createRecipeCard(favRecipeList, "favourite");
    const recipesListDiv = document.getElementById("FavRecipesList");
    recipesListDiv.appendChild(recipesListElement);
}

function createCategory(categoriesList) {
    const categoriesElement = document.getElementById("CategoriesDivId");
    // categories view
    for (let i = 0; i < categoriesList.length; i++) {
        let aElement = document.createElement("a");
        aElement.className = "categories-a";
        let categoryElement = document.createElement("div");
        categoryElement.className = "category";
        let imgElement = document.createElement("img");
        imgElement.src = categoriesList[i].image;
        let textElement = document.createElement("div");
        textElement.innerText = categoriesList[i].name;
        categoryElement.appendChild(imgElement);
        categoryElement.appendChild(textElement);
        aElement.appendChild(categoryElement);
        categoriesElement.appendChild(aElement);
    }
}

function createRecipesList(recipesList) {
    let recipesListElement = createRecipeCard(recipesList, "category");
    const recipesListDiv = document.getElementById("recipesList");
    recipesListDiv.appendChild(recipesListElement);
}

function createRecipeCard(recipesList, recipeType) {
    let ulElement = document.createElement("ul");
    ulElement.className = "recipesUl"
    for (let i = 0; i < recipesList.length; i++) {
        let liElement = document.createElement("li");
        let imageNode = document.createElement("img");
        imageNode.src = recipesList[i].image;
        imageNode.id = "recipesImage";
        imageNode.className = recipesList[i].category;
        liElement.appendChild(imageNode);
        let descriptionNode = document.createElement("div");
        descriptionNode.className = "description";

        let descriptionRightNode = document.createElement("div");
        let titleNode = document.createElement("h4");
        titleNode.innerHTML = recipesList[i].name;
        titleNode.className = "category-name";
        descriptionRightNode.appendChild(titleNode);
        let priceNode = document.createElement("div");
        priceNode.className = "price";
        priceNode.innerHTML = "&#x20b9;" + recipesList[i].price;
        descriptionRightNode.appendChild(priceNode);

        let descriptionLeftNode = document.createElement("div");
        let addToCart = document.createElement("button");
        addToCart.className = "add-to-cart";
        if (recipeType == "favourite") {
            addToCart.innerHTML = "REORDER";
        } else {
            addToCart.innerHTML = "ADD TO BAG";
        }
        descriptionLeftNode.appendChild(addToCart);

        descriptionNode.appendChild(descriptionRightNode);
        descriptionNode.appendChild(descriptionLeftNode);
        liElement.appendChild(descriptionNode);
        ulElement.appendChild(liElement);
    }
    return ulElement;
};
