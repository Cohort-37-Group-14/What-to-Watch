const app = {};

app.randomUrl = new URL('https://imdb-api.com/en/API/Top250Movies/');
app.randomUrl.search = new URLSearchParams({
// API keys for web establishments and tests:
    // apiKey: 'k_xpdojdru'
    // apiKey: 'k_jsfbzbhz'
    // apiKey: 'k_4eg4wtys'
    // apiKey: 'k_3349nupk'
    // apiKey:  'k_ya5sqa8y'
    // apiKey:  'k_0dsq0v17'
// For netlify domain:
    // apiKey: 'pk_4j91s9gyunrj9i09j'
// For GitHub domain: 
    apiKey: 'pk_oaozdiutd9sm2x6x6'
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
        if (response.ok) {
            return response.json();
          } else {
            alert("Something went wrong in API call!");
          }
    }).then(function (data) {
        for (let i = 0; i < 6; i++) {
            let order = app.randomMovieOrder[i]
            app.randomMovie[i] = data.items[order - 1];
            app.displayRandomMovies(app.randomMovie[i]);
        }
        app.dragAndDrop();
        app.specificPopup();
        app.plusButtonOnMovieCard();
    }).catch(function () {
            alert('We met the maximum usage of the movie API (100 calls per day)!');
    })
}
// Function to display movies
app.displayRandomMovies = function (movieDataFromApi) {
    //  create variables for the pieces in the DOM that will be created/used
    const movieContainer = document.querySelector('#randonMovieContainer');
    const movieCard = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const rating = document.createElement('p');
    const id = document.createElement('span');
    const plusButton = document.createElement('button');
    const removeButton = document.createElement('button');

    // Set the values/content/attribute for the variables
    img.src = movieDataFromApi.image;
    img.alt = `Poster for: ${movieDataFromApi.title} movie`;
    title.textContent = movieDataFromApi.fullTitle.length < 25 ? `${movieDataFromApi.fullTitle} ` : `${movieDataFromApi.fullTitle.slice(0, 23)}...`;
    rating.textContent = `Rating: ${movieDataFromApi.imDbRating}/10`
    movieCard.setAttribute('draggable', true); // Set this div can be draggable
    img.setAttribute('draggable', false);  //Set this img cannot be draggable and only can drag the whole div
    id.textContent = movieDataFromApi.id;
    plusButton.innerHTML = '<i class="fas fa-folder-plus"></i>';
    plusButton.setAttribute('draggable', false);
    plusButton.setAttribute('aria-label', 'Add this movie to your watch list');
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeButton.setAttribute('draggable', false);
    removeButton.setAttribute('aria-label', 'Remove this movie from your watch list');
    // Append the elements to the right part of the DOM
    movieCard.appendChild(img);
    movieCard.appendChild(title);
    movieCard.appendChild(rating);
    movieCard.appendChild(id);
    movieCard.appendChild(plusButton);
    movieCard.appendChild(removeButton);
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
    removeButton.classList.add('buttonRemoveFromWatchList');
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
            setTimeout(() => {
                this.style.opacity = '0';
            }, 0);
            dropped = 1; //Opacity reset listener is on fire
        })
        draggables[i].addEventListener('dragend', function () {
            if (dropped === 1) { // If not dropped into the correct space, the movie card is appearing again
                this.style.opacity = '1';
                dropped = 0;
                plusButtons[i].style.display = 'block';
                plusButtons[i].style.opacity = '1';
            }
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
        const movieInWatchList = document.querySelectorAll('#watchListContainer div');
        for (let i = 0; i < movieInWatchList.length; i++) {
            movieInWatchList[i].classList.remove('cardStyling');
            movieInWatchList[i].classList.remove('draggingContainer');
            movieInWatchList[i].classList.add('cardInWatchList');
            app.removeButtonOnMovieCard();
        }
    })
}
//Getting specific movie info when users click
app.specificPopup = function () {
    const popups = document.querySelectorAll('.draggingContainer');
    for (let i = 0; i < popups.length; i++) {
        popups[i].addEventListener('click', function () {
            document.querySelector('#specificMovieInfo').style.display = 'block';
            const id = this.childNodes[3].innerText;
        // API keys for web establishments and tests:
            // app.specificApiKey = 'k_xpdojdru';
            // app.specificApiKey = 'k_jsfbzbhz';
            // app.specificApiKey = 'k_4eg4wtys';
            // app.specificApiKey =  'k_ya5sqa8y';
            // app.specificApiKey =  'k_0dsq0v17';
            // app.specificApiKey = 'k_3349nupk';
        // For netlify domain:
            // app.specificApiKey =  'pk_4j91s9gyunrj9i09j'; 
        // For GitHub domain:
            app.specificApiKey =  'pk_oaozdiutd9sm2x6x6';  
            app.specificUrl = `https://imdb-api.com/en/API/Title/?apiKey=${app.specificApiKey}&id=${id}&options=FullCast%Posters%Trailer%Ratings`;
            fetch(app.specificUrl).then(function (response) {
                if (response.ok) {
                    return response.json();
                  } else {
                    alert("Something went wrong in API call!");
                  }
            }).then(function (data) {
                document.querySelector('button').remove();
                const titleSelected = document.querySelector('#selectedMovieTittle');
                const selectedMovieImg= document.querySelector('#selectedMovieImg');
                const descriptionSelected = document.querySelector('#selectedMovieDescription');
                const popUpCard = document.querySelector('.popUpCard');
                const closeButton = document.querySelector('#selectedCloseButton');

                titleSelected.textContent = data.fullTitle;
                selectedMovieImg.src = data.posters.posters[0].link;
                descriptionSelected.textContent = data.plot;
                closeButton.classList.remove('hidden');
                closeButton.classList.add('visible');
                selectedMovieImg.classList.add('imagePopUpCard');
                popUpCard.classList.add("visible");

                popUpCard.appendChild(selectedMovieImg);
                popUpCard.appendChild(titleSelected);
                popUpCard.appendChild(descriptionSelected);
                popUpCard.appendChild(closeButton);

                closeButton.addEventListener('click', function () {
                    closeButton.classList.remove('visible');
                    closeButton.classList.add('hidden');
                    popUpCard.classList.add("hidden");
                    popUpCard.classList.remove("visible");
                });
            }).catch(function () {
                alert('We met the maximum usage of the movie API (100 calls per day)!');
            })
        })
    }
}
//Plus button shows when movie cards are hovered or focused
app.plusButtonOnMovieCard = function() {
    const movieCards = document.querySelectorAll('.draggingContainer');
    const plusButtons = document.querySelectorAll('.buttonAddToWatchList');
    for (let i = 0; i < plusButtons.length; i++) {
        ['mouseenter', 'focusin', 'touchstart'].forEach((e) => {
            movieCards[i].addEventListener(e, function () {
                plusButtons[i].style.display = 'block';
            })
            plusButtons[i].addEventListener('click', (event) => {
                event.stopPropagation();
                plusButtons[i].style.display = 'none';
                plusButtons[i].style.opacity = '0';
                movieCards[i].classList.remove('draggingContainer');
                movieCards[i].classList.remove('cardStyling');
                movieCards[i].classList.add('cardInWatchList');
                document.querySelector('#watchListContainer').appendChild(movieCards[i]);
                app.removeButtonOnMovieCard();
            })
        })
    }
    for (let i = 0; i < plusButtons.length; i++) {
        ['mouseleave', 'focusout', 'touchmove'].forEach((e) => {
            movieCards[i].addEventListener(e, function () {
                plusButtons[i].style.display = 'none';
            })
        })
    }
}
//Remove button shows movie cards are hovered or focused
app.removeButtonOnMovieCard = function() {
    const moviesInWatchList = document.querySelectorAll('.cardInWatchList');
    const removeButtons = document.querySelectorAll('.cardInWatchList .buttonRemoveFromWatchList');
    for (let i = 0; i < moviesInWatchList.length; i++) {
        ['mouseenter', 'focusin', 'touchstart'].forEach((e) => {
            moviesInWatchList[i].addEventListener(e, function () {
                removeButtons[i].style.display = 'block';
            })
            removeButtons[i].addEventListener('click', (event) => {
                event.stopPropagation();
                moviesInWatchList[i].style.display = 'none';
            })
        })
    }
    for (let i = 0; i < moviesInWatchList.length; i++) {
        ['mouseleave', 'focusout', 'touchmove'].forEach((e) => {
            moviesInWatchList[i].addEventListener(e, function () {
                removeButtons[i].style.display = 'none';
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
        document.querySelector('#leftCurtain').classList.add('leftCurtainTransition');
        document.querySelector('#rightCurtain').classList.add('rightCurtainTransition');

        app.getRandomSixMovies();

        const movieContainer = document.querySelector('#randomMovieDisplay');
        const moreMoviesButton = document.createElement('button');
        moreMoviesButton.textContent = 'More Movies!'
        moreMoviesButton.classList.add('buttonStyling');
        movieContainer.appendChild(moreMoviesButton);

        document.querySelector('.buttonStyling').addEventListener('click', function () {
            document.querySelector('#randonMovieContainer').innerHTML = '';

            app.getRandomSixMovies();
        })
    });
};

app.init();