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

let timeout = null;
function searchRecipes() {

    // delay one sec before search such that wont have to make autocomplete every key stroke
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        let inputValue = document.getElementById("autocomplete-input").value;
        var searchTerm = inputValue;
        console.log(inputValue);
        let matchedTerms = [];
        searchTerm = searchTerm.toLowerCase();
        console.log("recipes", recipes)
        matchedTerms = recipes.filter(function (i) {
            return (i.name.toLowerCase().indexOf(searchTerm) > -1) ;
        });
        createRecipesList(matchedTerms);
    }, 1000);
}

function searchByCategory(categoryName) {

    // delay one sec before search such that wont have to make autocomplete every key stroke
    clearTimeout(timeout);
    timeout = setTimeout(function () {
       // 
        var searchTerm = categoryName;
        console.log(categoryName);
        let matchedTerms = [];
        searchTerm = searchTerm.toLowerCase();
        console.log("recipes", recipes)
        matchedTerms = recipes.filter(function (i) {
           // return ((i.name.toLowerCase()) && (i.category.toLowerCase()).indexOf(searchTerm) > -1) ;
           return (i.name.toLowerCase().indexOf(searchTerm) > -1) ;
        });
        createRecipesList(matchedTerms);
    }, 1000);
}

function createCategory(categoriesList) {
    console.log(categoriesList);
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

function createFavorites(recipesList) {
    let favRecipeList = recipesList.filter((recipe) => recipe.isFavourite);
    let recipesListElement = createRecipeCard(favRecipeList, "favourite");
    const recipesListDiv = document.getElementById("FavRecipesList");
    recipesListDiv.appendChild(recipesListElement);
}

function createRecipesList(recipesList) {
    // remove old cards in the dom
    console.log(recipesList);
    document.getElementById("recipesList").innerHTML = "";
    const recipesListDiv = document.getElementById("recipesList");
    let recipesListElement;
    let recipesDescriptionElement;
    if (recipesList.length <= 0) {
        recipesListElement = document.createElement("div");
        recipesListElement.className = "no-dish";
        recipesListElement.innerHTML = "NO DISH";
    } else {
       recipesListElement = createRecipeCard(recipesList, "category");
        recipesDescriptionElement = createRecipeCardDescription(recipesList, "category");
    }
    recipesListDiv.appendChild(recipesListElement);
    recipesListDiv.appendChild(recipesDescriptionElement);
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

function createRecipeCardDescription(recipesList, recipeType) {
    console.log("here",recipesList);
    let ulElement = document.createElement("ul");
    ulElement.className = "recipesDescriptionUl"
    for (let i = 0; i < 1; i++) {
        let liElement = document.createElement("li");
        let imageNode = document.createElement("img");
        imageNode.src = recipesList[i].image;
        imageNode.id = "recipesImage";
        imageNode.className = recipesList[i].category;
        liElement.appendChild(imageNode);
        let descriptionNode = document.createElement("div");
        descriptionNode.className = "description";

        let ratingNode = document.createElement("div");
        ratingNode.className = "rating";
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
      
            addToCart.innerHTML = "ADD TO BAG";
          
        
        descriptionLeftNode.appendChild(addToCart);

        let recipesDivNode = document.createElement("div");
        let recipesTitleNode = document.createElement("h4");
        recipesTitleNode.innerHTML = "Category:" + " " +recipesList[i].category;
        recipesTitleNode.className = "category-name";
        recipesDivNode.appendChild(recipesTitleNode);
        
        let descriptionRatingNode = document.createElement("div");
        let titleRatingNode = document.createElement("h4");
       
        titleRatingNode.innerHTML = "&#11088;" + recipesList[i].rating+".0" + " Ratings,"+ "  " + "("+recipesList[i].reviews  + "" + "Reviews)";

        descriptionRatingNode.appendChild(titleRatingNode);

        let detailsDivNode = document.createElement("div");
        detailsDivNode.className = "details";
        let detailsTitleNode = document.createElement("h4");
        let detailsContentNode = document.createElement("h4");
        detailsTitleNode.innerHTML = "DETAILS"
        detailsContentNode.innerHTML = recipesList[i].details;

        detailsDivNode.appendChild(detailsTitleNode);
        detailsDivNode.appendChild(detailsContentNode);
       
        descriptionLeftNode.appendChild(addToCart);
        
        descriptionNode.appendChild(descriptionRightNode);
        descriptionNode.appendChild(descriptionLeftNode);
        
        ratingNode.appendChild(recipesDivNode);
        ratingNode.appendChild(descriptionRatingNode);

        liElement.appendChild(descriptionNode);
        liElement.appendChild(ratingNode);
        liElement.appendChild(detailsDivNode);
        
        ulElement.appendChild(liElement);
    }
    return ulElement;
};

