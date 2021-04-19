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
1. create the food data(that your going to swipe on)
- set up the food constructor
- create instances of that constructor(eg: pizza, sushi, ect...)
- put it into the DOM

2. create a working dislike button
- just move to the next food / slide
- remove it from the list of food your being shown

3. create a working like button
- store the food in a data structure,
  so you can use that food data later
  (to find location to eat that food at)

4. create the results tab / get it working
- create the HTML / CSS
- show the all the(saved) food that they liked,
and location where they can order that food at
AND a recipe(s) that they can use to make that food themselves.
    - recipe can either be from youtube or a recipe api

Additional notes / features
    - when you have swiped through all the food,
    show a no more food left to show screen

    - filter your result(eg: only see drinks, no vegetables, ect..)

    - https://rapidapi.com/blog/we-love-these-restaurant-apis/

Do all the oop stuff then stop. when we get to the ajax / api section
then finish that section

// https://www.google.com/maps/search/food/@Xlocation,yLocation
https://www.google.com/maps/search/cake/@45.0910692,-93.3317112
*/











// App

// cached variables
let profilesEl = document.querySelector(".profile-section__profiles")
let profileEl = document.querySelector(".profile__info")
let likeBtnEl = document.querySelector(".button-choice-like")
let dislikeBtnEl = document.querySelector(".button-choice-dislike")





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



// like / dislike button
const dislikeButton = (event) => {
    // next food profile
    removeCurrentFoodProfile()
    // do nothing
}

const likeButton = (event) => {
    // removeCurrentFoodProfile()
    /*add the title, eg: pizza, cake, sushi,eg to an array*/
    // let x = getCurrentFoodProfile();
    // console.log(x)

}


dislikeBtnEl.addEventListener("click", dislikeButton);
likeBtnEl.addEventListener("click", likeButton);


