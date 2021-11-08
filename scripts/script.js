const app = {};

app.randomUrl = new URL('https://imdb-api.com/en/API/Top250Movies/');
app.randomUrl.search = new URLSearchParams({
    // apiKey: 'k_xpdojdru'
    // apiKey: 'k_jsfbzbhz'
    apiKey: 'k_4eg4wtys'
    // apiKey: 'k_3349nupk'
});

//Variables to storing the random numbers for getting random movies
app.randomMovieOrder = [movieOrder1 = null, movieOrder2 = null, movieOrder3 = null, movieOrder4 = null, movieOrder5 = null, movieOrder6 = null];
app.randomMovie = [];
// Generate 6 different random numbers for getting random movies
app.getRandomNumber = function (min, max, variableArray) {
    let result
    for (let i = 0; i < 6; i++) {
        do {
            result = Math.floor(Math.random() * (max - min + 1)) + min;//Generate a random number
        } while (variableArray.indexOf(result) !== -1) //Will check the number, if the number is equal to any variables in the array, the method will redo again until getting an unique number
        app.randomMovieOrder[i] = result;
    }
}

//Getting 6 different random movies and store data in app.randomMovie 
app.getRandomSixMovies = () => {
    app.getRandomNumber(0, 249, app.randomMovieOrder);
    fetch(app.randomUrl).then(function(response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < 6; i ++) {
            let order = app.randomMovieOrder[i]
            app.randomMovie[i] = data.items[order - 1];
            app.displayRandomMovies(app.randomMovie[i]);
            app.moreRandomMovies(app.randomMovie[i]);
        }   
        app.dragAndDrop();
    }).catch(function(){
        // If error, =>
    })
}

//Getting specific movie info when users click 
app.getSpecificMovie = function() {
    app.specificMovieId =  app.randomMovie[0].id; //Temperary using '0', we will use listener to get the selected movie id
    app.specificApiKey = 'k_xpdojdru';
    // app.specificApiKey = 'k_jsfbzbhz';
    app.specificUrl = `https://imdb-api.com/en/API/Title/?apiKey=${app.specificApiKey}&id=${app.specificMovieId}&options=FullCast%Posters%Trailer%Ratings`;
    fetch(app.specificUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function(){
        // If error, =>
    })
}



// function to display movies
app.displayRandomMovies = function (movieDataFromApi) {
    //  create variables for the pieces in the DOM that will be created/used
    const movieContainer = document.querySelector('#randonMovieContainer');
    const movieCard = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const rating = document.createElement('p');
    
    // Set the values/content/attribute for the variables
    img.src = movieDataFromApi.image;
    img.alt = `Poster for: ${movieDataFromApi.title} movie`;
    title.textContent = movieDataFromApi.fullTitle.length < 30 ? `${movieDataFromApi.fullTitle} `: `${movieDataFromApi.fullTitle.slice(0, 27)}...` ;
    rating.textContent = `Rating: ${movieDataFromApi.imDbRating}/10`
    movieCard.setAttribute('draggable', true); // Set this div can be draggable
    img.setAttribute('draggable', false);  //Set this img cannot be draggable and only can drag the whole div

    // Append the elements to the right part of the DOM
    movieCard.appendChild(img);
    movieCard.appendChild(title);
    movieCard.appendChild(rating);
    movieContainer.appendChild(movieCard);

    // Attach the styling classes to each element
    movieCard.classList.add("flex");  
    movieCard.classList.add("flexColumn");
    movieCard.classList.add("alignItemsCenter");  
    movieCard.classList.add("cardStyling");
    img.classList.add("imageCardStyling");
    title.classList.add("movieTitle")
    rating.classList.add("movieRating")
    movieCard.classList.add('draggingContainer'); //Add a class name for this div for dragging function
}


// I want to select add event listener to the selected element but not working currently, still woring on it
app.dragAndDrop = function() {


    const draggables = document.getElementsByClassName('draggingContainer');
    const droppable = document.querySelector('#watchList');
    console.log(draggables.length);
    console.log(draggables);
    for (let i =0 ; i < draggables.length ; i ++) {
        draggables[i].addEventListener('click', function() {
        console.log(draggables[i]);
        })
    }
}

app.moreRandomMovies = function (movieDataFromApi) {
    const moreMoviesButton = document.querySelector('.buttonStyling');
    moreMoviesButton.addEventListener('click', function () {
        // query selector
        const img = document.querySelectorAll('.imageCardStyling');
        const title = document.querySelectorAll('.movieTitle');
        const rating = document.querySelectorAll('.movieRating');

        // Change textContent to put new data from API in the movie cards
        img.src = movieDataFromApi.image;
        img.alt = `Poster for: ${movieDataFromApi.title} movie`;
        title.textContent = movieDataFromApi.fullTitle.length < 30 ? `${movieDataFromApi.fullTitle} `: `${movieDataFromApi.fullTitle.slice(0, 27)}...` ;
        rating.textContent = `Rating: ${movieDataFromApi.imDbRating}/10`

        console.log('SOMETHINNNGGGGGGG')

    })
}



app.init = function () {
    
    
};

document.addEventListener("DOMContentLoaded", function(e) {
    app.init();

    document.querySelector('#randomMovieButton').addEventListener('click', function () {
        document.querySelector('h2').classList.add("fadeOut");
        document.querySelector('#randomMovieButton').classList.add("fadeOut");
        document.querySelector('h1').classList.add("fadeOut");
        document.querySelector('#watchList').classList.add('fadeIn');

        document.querySelector('#leftCurtain').style.left = '-30vw';
        document.querySelector('#leftCurtain').style.transition = 'left 3s';
        document.querySelector('#rightCurtain').style.right = '-30vw';
        document.querySelector('#rightCurtain').style.transition = 'right 3s';
        document.querySelector('#rightCurtain').style.border = 'black 4px solid';
        document.querySelector('#rightCurtain').style.boxShadow = '-40px 40px 55px black';
        document.querySelector('#leftCurtain').style.border = 'black 4px solid';
        document.querySelector('#leftCurtain').style.boxShadow = '40px 40px 55px black';

        document.querySelector('#randomMovieButton').style.display = 'none';
        document.querySelector('h1').style.display = 'none';

        app.getRandomSixMovies();

        const movieContainer = document.querySelector('#randomMovieDisplay');
        const moreMoviesButton = document.createElement('button');
        moreMoviesButton.textContent = 'More Movies!'
        moreMoviesButton.classList.add('buttonStyling');
        movieContainer.appendChild(moreMoviesButton);

    });

    
});

