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
const food3 = new Food("Sushi", "./images/food-images/sushi-0.jpg", 163, `Sushi (すし, 寿司, 鮨, pronounced [sɯɕiꜜ] or [sɯꜜɕi]) is a traditional Japanese dish of prepared vinegared rice (鮨飯, sushi-meshi), usually with some sugar and salt, accompanying a variety of ingredients (ネタ, neta), such as seafood, often raw, and vegetables. Styles of sushi and its presentation vary widely, but the one key ingredient is "sushi rice", also referred to as shari (しゃり), or sumeshi (酢飯).`)

let foodArr = [food1, food2, food3];
// console.log(foodArr)



const renderFood = _ => {
    foodArr.forEach(element => {
        let title = Object.values(element)[0];
        let image = Object.values(element)[1];
        let location = Object.values(element)[2];
        let description = Object.values(element)[3];



        // ul --> profilesEl
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
            p.textContent = description;
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


            profilesEl.appendChild(fragment);
        /*
        <li class="profile-section__profile">
            <img class="image-container__img" src="./images/food-images/pizza-0.jpg" alt="food image">

            <h2 class="profile__info__title">Pizza</h2>

            <h3 class="profile__info__location">
                <img class="icon icon-location" src="./images/icons/map-marker-alt-solid.svg" alt="location icon">
                <span>nearest location 24 miles away</span>
            </h3>

            <p class="profile__info__description">
            Pizza is a savory dish of Italian origin
            consisting of a usually round,
            flattened base of leavened wheat-based
            dough topped with tomatoes,
            cheese, and often various other ingredients...
            <button class="read-more-btn"><a class="read-more-btn__link" target="_blank" href="https://en.wikipedia.org/wiki/Pizza">Read more</a></button>
            </p>
        </li>
        */
    });



}

renderFood()