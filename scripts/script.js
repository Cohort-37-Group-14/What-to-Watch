const app = {};

app.randomUrl = new URL('https://imdb-api.com/en/API/Top250Movies/');
app.randomUrl.search = new URLSearchParams({
    // apiKey: 'k_xpdojdru'
    apiKey: 'k_jsfbzbhz'
    // apiKey: 'k_4eg4wtys'
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
    fetch(app.randomUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        for (let i = 0; i < 6; i++) {
            let order = app.randomMovieOrder[i]
            app.randomMovie[i] = data.items[order - 1];
            app.displayRandomMovies(app.randomMovie[i]);
        }
        app.dragAndDrop();
        app.specificPopup();
        app.plusButtonOnMovieCard();
    }).catch(function () {
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
    const id = document.createElement('span');
    const plusButton = document.createElement('button');

    // Set the values/content/attribute for the variables
    img.src = movieDataFromApi.image;
    img.alt = `Poster for: ${movieDataFromApi.title} movie`;
    title.textContent = movieDataFromApi.fullTitle.length < 25 ? `${movieDataFromApi.fullTitle} ` : `${movieDataFromApi.fullTitle.slice(0, 23)}...`;
    rating.textContent = `Rating: ${movieDataFromApi.imDbRating}/10`
    movieCard.setAttribute('draggable', true); // Set this div can be draggable
    img.setAttribute('draggable', false);  //Set this img cannot be draggable and only can drag the whole div
    id.textContent = movieDataFromApi.id;
    plusButton.innerHTML = '<i class="fas fa-plus-circle"></i>';
    plusButton.setAttribute('draggable', false);

    // Append the elements to the right part of the DOM
    movieCard.appendChild(img);
    movieCard.appendChild(title);
    movieCard.appendChild(rating);
    movieCard.appendChild(id);
    movieCard.appendChild(plusButton);
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
    id.classList.add('zeroOpacity');
    plusButton.classList.add('buttonAddToWatchList');
}


// Drag and drop function for letting users save their favorite movies into watch list
app.draggingData = '';
app.dragAndDrop = function () {
    const draggables = document.getElementsByClassName('draggingContainer');
    const droppable = document.querySelector('#watchList');
    const plusButtons = document.querySelectorAll('.buttonAddToWatchList');
    let dropped = 0; // A listener to check the element is dropped into the correct area
    droppable.classList.remove('hidden');
    for (let i = 0; i < draggables.length; i++) {
        draggables[i].addEventListener('dragstart', function () {
            plusButtons[i].style.display = 'none';
            plusButtons[i].style.opacity = '0';
            app.draggingData = this;
            console.log(this);
            setTimeout(() => {
                this.style.opacity = '0';
            }, 0);
            dropped = 1; //Listener is on fire
        })
        draggables[i].addEventListener('dragend', function () {
            if (dropped === 1) { // If not dropped into the correct space, the movie card is appearing again
                this.style.opacity = '1';
                dropped = 0;
            }
            // app.draggingData = '';
        })
    }
    droppable.addEventListener('dragenter', function (e) {
        e.preventDefault();
    })
    droppable.addEventListener('dragover', function (e) {
        e.preventDefault();
    }, false)
    droppable.addEventListener('drop', function (e) {
        e.preventDefault();
        app.draggingData.style.opacity = '1';
        document.querySelector('#watchListContainer').appendChild(app.draggingData);
        dropped = 0; // Dropped into the correct space, reset value
    })
}
//Getting specific movie info when users click
app.specificPopup = function () {
    const popups = document.querySelectorAll('.draggingContainer');
    for (let i = 0; i < popups.length; i++) {
        popups[i].addEventListener('click', function () {
            document.querySelector('#specificMovieInfo').style.display = 'block';
            const id = this.childNodes[3].innerText;
            // app.specificApiKey = 'k_xpdojdru';
            app.specificApiKey = 'k_jsfbzbhz';
            // app.specificApiKey = 'k_4eg4wtys';
            // app.specificApiKey = 'k_3349nupk';
            app.specificUrl = `https://imdb-api.com/en/API/Title/?apiKey=${app.specificApiKey}&id=${id}&options=FullCast%Posters%Trailer%Ratings`;
            fetch(app.specificUrl).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                const titleSelected = document.querySelector('#selectedMovieTittle');
                const selectedMovieImg= document.querySelector('#selectedMovieImg');
                const descriptionSelected = document.querySelector('#selectedMovieDescription');
                const popUpCard = document.querySelector('.popUpCard');
                const closeButton = document.createElement('button')

                titleSelected.textContent = data.fullTitle;
                selectedMovieImg.src = data.posters.posters[0].link;
                descriptionSelected.textContent = data.plot;
                closeButton.textContent = 'Close';
                closeButton.classList.add('buttonStyling');
                selectedMovieImg.classList.add('imagePopUpCard');
                popUpCard.classList.add("visible");

                popUpCard.appendChild(selectedMovieImg);
                popUpCard.appendChild(titleSelected);
                popUpCard.appendChild(descriptionSelected);
                popUpCard.appendChild(closeButton);

                closeButton.addEventListener('click', function () {
                    popUpCard.classList.add("hidden");
                    popUpCard.classList.remove("visible");
                    closeButton.remove();
                });

            }).catch(function () {
                // If error, =>
            })
        })
    }
}
//Plus button shows when movie cards are hovered or focused
app.plusButtonOnMovieCard = function() {
    console.log('test start!');
    const movieCards = document.querySelectorAll('.draggingContainer');
    const plusButtons = document.querySelectorAll('.buttonAddToWatchList');
    for (let i = 0; i < plusButtons.length; i++) {
        ['mouseenter', 'focusein', 'touchstart'].forEach((e) => {
            movieCards[i].addEventListener(e, function () {
                plusButtons[i].style.display = 'block';
                console.log('show out!', i);
            })
            plusButtons[i].addEventListener('click', (event) => {
                event.stopPropagation();
                plusButtons[i].style.display = 'none';
                plusButtons[i].style.opacity = '0';
                document.querySelector('#watchListContainer').appendChild(movieCards[i]);
                console.log('click!');
            })
        })
    }
    for (let i = 0; i < plusButtons.length; i++) {
        ['mouseleave', 'focusein', 'touchmove'].forEach((e) => {
            movieCards[i].addEventListener(e, function () {
                plusButtons[i].style.display = 'none';
                console.log('disappear!', i);
            })
        })
    }
}

app.init = function () {

    document.querySelector('#randomMovieButton').addEventListener('click', function () {
        document.querySelector('h2').classList.add("fadeOut");
        document.querySelector('#randomMovieButton').classList.add("fadeOut");
        document.querySelector('h1').classList.add("fadeOut");
        document.querySelector('header').classList.add("fadeOut");
        document.querySelector('#firstTextContainer').classList.add("fadeOut");
        document.querySelector('#watchList').classList.add('fadeIn');

        document.querySelector('#leftCurtain').style.left = '-30vw';
        document.querySelector('#leftCurtain').style.transition = 'left 3s';
        document.querySelector('#rightCurtain').style.right = '-30vw';
        document.querySelector('#rightCurtain').style.transition = 'right 3s';
        document.querySelector('#rightCurtain').style.border = 'black 4px solid';
        document.querySelector('#rightCurtain').style.boxShadow = '-40px 40px 55px black';
        document.querySelector('#leftCurtain').style.border = 'black 4px solid';
        document.querySelector('#leftCurtain').style.boxShadow = '40px 40px 55px black';

        app.getRandomSixMovies();

        const movieContainer = document.querySelector('#randomMovieDisplay');
        const moreMoviesButton = document.createElement('button');
        moreMoviesButton.textContent = 'More Movies!'
        moreMoviesButton.classList.add('buttonStyling');
        movieContainer.appendChild(moreMoviesButton);

        document.querySelector('.buttonStyling').addEventListener('click', function () {
            console.log(`CLICK!`);
            document.querySelector('#randonMovieContainer').innerHTML = '';
            app.getRandomSixMovies();
        })
    });
};

app.init();


