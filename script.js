const result = document.querySelector("#result");
const searchBtn = document.querySelector("#search-btn");
const userInput = document.querySelector("#user-choice");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
    let userInp = document.querySelector("#user-choice").value;
    if (userInp.length === 0) {
        result.innerHTML = "<h3>Input Field Cannot Be Empty</h3>";
    } else {
        fetch(url + userInp)
            .then((res) => res.json())
            .then((data) => {
                let meal = data.meals[0];
                let count = 1;
                let ingredients = [];
                for (let i in meal) {
                    let ingredient = "";
                    let measure = "";
                    if (i.startsWith("strIngredient") && meal[i]) {
                        ingredient = meal[i];
                        measure = meal[`strMeasure` + count];
                        count++;
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }
                result.innerHTML = `
                    <img src=${meal.strMealThumb}>
                    <div class="details">
                        <h2>${meal.strMeal}</h2>
                        <h4>${meal.strArea}</h4>
                    </div>
                    <div id="ingredients-container"></div>
                    <div id="recipe">
                        <button id=hide-recipe>X</button>
                        <pre id="instructions">${meal.strInstructions}</pre>
                    </div>
                    <button id="show-recipe">View Recipe</button>
                `;
                let ingredientCon = document.querySelector(
                    "#ingredients-container"
                );
                let parent = document.createElement("ul");
                let recipe = document.querySelector("#recipe");
                let hideRecipe = document.querySelector("#hide-recipe");
                let showRecipe = document.querySelector("#show-recipe");

                hideRecipe.addEventListener("click", () => {
                    recipe.style.display = "none";
                });
                showRecipe.addEventListener("click", () => {
                    recipe.style.display = "block";
                });

                ingredients.forEach((i) => {
                    let child = document.createElement("li");
                    child.innerText = i;
                    parent.appendChild(child);
                    ingredientCon.appendChild(parent);
                });
            })
            .catch((err) => {
                result.innerHTML = "<h3>Not Found!</h3>";
                console.log("Not found", err);
            });
    }
});
