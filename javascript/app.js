/*Test data(want to use an API for the actual data)
----------
Pizza

Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (such as anchovies, mushrooms, onions, olives, pineapple, meat, etc.), which is then baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta. A person who makes pizza is known as a pizzaiolo.
----------
Cake

Cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate, and that share features with other desserts such as pastries, meringues, custards, and pies.
----------
Sushi

Sushi (すし, 寿司, 鮨, pronounced [sɯɕiꜜ] or [sɯꜜɕi]) is a traditional Japanese dish of prepared vinegared rice (鮨飯, sushi-meshi), usually with some sugar and salt, accompanying a variety of ingredients (ネタ, neta), such as seafood, often raw, and vegetables. Styles of sushi and its presentation vary widely, but the one key ingredient is "sushi rice", also referred to as shari (しゃり), or sumeshi (酢飯).
----------
----------
----------
the description are from
the first paragraph of the
wikipedia article of the given food.
*/


/*TODO
4. create the results tab / get it working
- create the HTML / CSS [X]

- get the tabs working
    - when you click on the swipe tab shows the food profile
    - when you click on the results tab  shows what food you liked

- show all the (saved) food that they liked

- Click on the recipe btn(book icon) & get linked to
https://www.allrecipes.com/search/results/?search=food
(of the current food)

- Click on the direction btn(book icon) & get linked to
https://www.google.com/maps/search/food/@Xlocation,yLocation
(of the current food)

Additional notes / features
    - when you have swiped through all the food,
    show a no more food left to show screen

    - filter your result(eg: only see drinks, no vegetables, ect..)

    - https://rapidapi.com/blog/we-love-these-restaurant-apis/

Do all the oop stuff then stop. when we get to the ajax / api section
then finish that section

// directions

// https://www.google.com/maps/search/food/@Xlocation,yLocation
// EG:
https://www.google.com/maps/search/cake/@45.0910692,-93.3317112



// recipes

// https://www.allrecipes.com/search/results/?search=food
// EG:
// // https://www.allrecipes.com/search/results/?search=cake
*/











// App

// cached variables
let profilesEl = document.querySelector(".profile-section__profiles")
let profileEl = document.querySelector(".profile__info")
let likeBtnEl = document.querySelector(".button-choice-like")
let dislikeBtnEl = document.querySelector(".button-choice-dislike")
let profileChoiceBtnContainer = document.querySelector(".button-choice-section")
let appMenuSwipeBtnEl = document.querySelector(".app__menu__swipe")
let appMenuResultEl = document.querySelector(".app__menu__result")
let savedFoodEl = document.querySelector(".profile-section__saved-food")
let likedFoodProfiles = ["chicken", "noodles"]




function Food(type, image, nearestLocation, description) {
    this.type = type;
    this.image = image;
    this.nearestLocation = nearestLocation;
    this.description = description;
}


const food1 = new Food("pizza","./images/food-images/pizza-0.jpg", 7, `Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (such as anchovies, mushrooms, onions, olives, pineapple, meat, etc.), which is then baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta. A person who makes pizza is known as a pizzaiolo.`)
const food2 = new Food("cake", "./images/food-images/cake-0.jpg", 43, `Cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate, and that share features with other desserts such as pastries, meringues, custards, and pies.`)
const food3 = new Food("sushi", "./images/food-images/sushi-0.jpg", 163, `Sushi (すし, 寿司, 鮨, pronounced [sɯɕiꜜ] or [sɯꜜɕi]) is a traditional Japanese dish of prepared vinegared rice (鮨飯, sushi-meshi), usually with some sugar and salt, accompanying a variety of ingredients (ネタ, neta), such as seafood, often raw, and vegetables. Styles of sushi and its presentation vary widely, but the one key ingredient is "sushi rice", also referred to as shari (しゃり), or sumeshi (酢飯).`)

let foodArr = [food1, food2, food3];
// console.log(foodArr)




/*swipe tab*/
const renderFoodProfile = _ => {
    /*get the food data into the DOM*/
    foodArr.forEach(element => {
        let title = Object.values(element)[0];
        let image = Object.values(element)[1];
        let location = Object.values(element)[2];
        let description = Object.values(element)[3];

        /*makes the description max of 182 character
        (182 characters because this look best w/ the current UI)*/
        let descriptionTrimmedArr = [];
        let descriptionCharCounter = 0;
        for(let i = 0; i < description.length; i++) {
            if(descriptionCharCounter !== 182) {
                descriptionTrimmedArr.push(description[i])
                descriptionCharCounter++;
            }
        }

        // ul === profilesEl
        /*document fragment*/
            let fragment = document.createDocumentFragment();
            // items
            let li = document.createElement("li");
            let img = document.createElement("img");
            let h2 = document.createElement("h2");
            let h3 = document.createElement("h3");
            let imgIcon = document.createElement("img");
            let span = document.createElement("span");
            let p = document.createElement("p");
            let button = document.createElement("button");
            let a = document.createElement("a");
            // classes
            li.classList.add("profile-section__profile");
            img.classList.add("image-container__img");
            h2.classList.add("profile__info__title");
            h3.classList.add("profile__info__location")
            imgIcon.classList.add("icon", "icon-location")
            p.classList.add("profile__info__description")
            button.classList.add("read-more-btn")
            a.classList.add("read-more-btn__link")
            // attributes
            img.src = `${image}`
            img.alt = "food image"
            imgIcon.src = "./images/icons/map-marker-alt-solid.svg"
            imgIcon.alt = "location icon"
            a.target = "_blank"
            a.href = `https://en.wikipedia.org/wiki/${title}`
            //  text / inner values
            h2.textContent = title;
            span.textContent = `nearest location ${location} miles away`
            p.textContent = descriptionTrimmedArr.join("") + "...";
            a.textContent = "Read more"
            // appending everything
            fragment.appendChild(li)
            li.appendChild(img)
            li.appendChild(h2)
            li.appendChild(h3)
            h3.appendChild(imgIcon)
            h3.appendChild(span)
            li.appendChild(p)
            li.appendChild(button)
            button.appendChild(a)
            // append the fragment to the DOM
            profilesEl.appendChild(fragment);
    });

    let ProfilesFirstChild = profilesEl.children[0];
    ProfilesFirstChild.classList.add("profile--current");
    /*when you click the heart or like button
    need to remove the profile--current class(from every element)
    then apply it to the next element*/
}

renderFoodProfile();












let getCurrentFoodProfile = _ => {
    let currentProfileSection = Array.from(event.target.parentElement.parentElement.previousElementSibling.children[0].children);
    let currentFood = "";

    currentProfileSection.forEach(element => {
        if(element.classList.contains("profile--current")) {
         currentFood = element;
        }
    });

    return currentFood;
}



let removeCurrentFoodProfile = _ => {
    let currentProfileSection = Array.from(event.target.parentElement.parentElement.previousElementSibling.children[0].children);
    let currentFood = getCurrentFoodProfile();
    /*if nothing next will return null*/
    let nextFood = currentFood.nextElementSibling;

    currentFood.remove();
    /* remove the profile--current class
    from every food profile*/
    currentProfileSection.forEach(element =>
     element.classList.remove("profile--current"));

    nextFood.classList.add("profile--current");
}

let getlikedFoodProfile = _ => {
    let currentFood = getCurrentFoodProfile();
    let currentFoodTitle = currentFood.children[1].textContent.toLowerCase();
    likedFoodProfiles.push(currentFoodTitle)
}




// like / dislike button
const dislikeButton = (event) => {
    // next food profile
    removeCurrentFoodProfile()
    // do nothing
}

const likeButton = (event) => {
    /*add the liked food to an array*/
    getlikedFoodProfile()
    // next food profile
    removeCurrentFoodProfile()
}


dislikeBtnEl.addEventListener("click", dislikeButton);
likeBtnEl.addEventListener("click", likeButton);















/*results tab*/
// SWIPE
//appMenuSwipeBtnEl

    // profilesEl
    // profileChoiceBtnContainer
// RESULT
// appMenuResultEl
    // savedFoodEl



appMenuSwipeBtnEl.addEventListener("click", function() {
    //
    appMenuResultEl.classList.remove("app__menu__choice--active")
    appMenuSwipeBtnEl.classList.add("app__menu__choice--active")
    //
    profilesEl.classList.remove("deactive")
    profileChoiceBtnContainer.classList.remove("deactive")
    savedFoodEl.classList.add("deactive")
});

appMenuResultEl.addEventListener("click", function() {
    //
    appMenuSwipeBtnEl.classList.remove("app__menu__choice--active")
    appMenuResultEl.classList.add("app__menu__choice--active")
    //
    savedFoodEl.classList.remove("deactive")
    profilesEl.classList.add("deactive")
    profileChoiceBtnContainer.classList.add("deactive")
})




const renderResults = _ => {
    /*get the food data into the DOM*/
    likedFoodProfiles.forEach(likedFood => {

        // ul === profilesEl
        /*document fragment*/
            let fragment = document.createDocumentFragment();
            // items
            let li = document.createElement("li");
            let p = document.createElement("p");
            let div = document.createElement("div");
            let buttonRecipe  = document.createElement("button");
                let aRecipe = document.createElement("a");
                let imgRecipe = document.createElement("img");
            let buttonDirections  = document.createElement("button");
                let aDirections = document.createElement("a");
                let imgDirections = document.createElement("img");
            let buttonDelete  = document.createElement("button");
                let imgDelete = document.createElement("img");
            // classes
            li.classList.add("saved-food__item")
            p.classList.add("saved-food__item__food")
            div.classList.add("save-food__item__btns")
            buttonRecipe.classList.add("save-food-item-btn", "saved-food__item__recipe-btn")
            aRecipe.classList.add("save-food-item-btn__link")
            imgRecipe.classList.add("icon", "icon--save-food")
            buttonDirections.classList.add("save-food-item-btn", "saved-food__item__directions-btn")
            imgDirections.classList.add("icon", "icon--save-food")
            buttonDelete.classList.add("save-food-item-btn", "saved-food__item__delete-btn")
            imgDelete.classList.add("icon", "icon--save-food", "delete-btn-icon")
            // attributes
            aRecipe.href = `https://www.allrecipes.com/search/results/?search=${likedFood}`;
            aRecipe.target = "_blank";
            imgRecipe.src = "./images/icons/book-reader-solid-white.svg";
            imgRecipe.alt = "recipe icon";
            aDirections.href = `https://www.google.com/maps/search/${likedFood}`;
            aDirections.target = "_blank";
            imgDirections.src = "./images/icons/compass-solid-white.svg";
            imgDirections.alt = "directions icon";
            imgDelete.src = "./images/icons/times-solid-white.svg";
            imgDelete.alt = "delete icon";
            //  text / inner values
            p.innerHTML = likedFood;
            // appending everything
            fragment.appendChild(li);
            li.appendChild(p);
            li.appendChild(div);
            div.appendChild(buttonRecipe);
            buttonRecipe.appendChild(aRecipe);
            aRecipe.appendChild(imgRecipe);
            div.appendChild(buttonDirections);
            buttonDirections.appendChild(aDirections);
            aDirections.appendChild(imgDirections);
            div.appendChild(buttonDelete);
            buttonDelete.appendChild(imgDelete);
            // append the fragment to the DOM
            savedFoodEl.appendChild(fragment);
    });
}


renderResults()