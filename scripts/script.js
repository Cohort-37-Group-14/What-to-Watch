const app = {};

app.url = new URL('https://imdb-api.com/en/API/Top250Movies/');
app.url.search = new URLSearchParams({
    apiKey: 'k_xpdojdru'
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
            console.log(result);
        } while (variableArray.indexOf(result) !== -1) //Will check the number, if the number is equal to any variables in the array, the method will redo again until getting an unique number
        console.log(variableArray);
        app.randomMovieOrder[i] = result;
        console.log(app.randomMovieOrder[i]);
    }
}

app.getSixMovies = () => {
    app.getRandomNumber(0, 249, app.randomMovieOrder);
    fetch(app.url).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < 6; i ++) {
            let order = app.randomMovieOrder[i]
            app.randomMovie[i] = data.items[order - 1];
        }               
    })
    console.log(app.randomMovie);
}

app.getSixMovies();






app.init = function () {
    document.querySelector('#randomMovieButton').addEventListener('click', function () {
        const h2El = document.querySelector('h2');
        const randomMovieButton = document.querySelector('#randomMovieButton');

        document.querySelector('#leftCurtain').style.left = '-30vw';
        document.querySelector('#leftCurtain').style.transition = 'left 3s';
        document.querySelector('#rightCurtain').style.right = '-30vw';
        document.querySelector('#rightCurtain').style.transition = 'right 3s';
        document.querySelector('#rightCurtain').style.border = '#fad947 4px solid';
        document.querySelector('#rightCurtain').style.boxShadow = '-10px 10px 15px #fad947';
        document.querySelector('#leftCurtain').style.border = '#fad947 4px solid';
        document.querySelector('#leftCurtain').style.boxShadow = '10px 10px 15px #fad947';
        // Black box shadow:
        // document.querySelector('#rightCurtain').style.border = 'black 4px solid';
        // document.querySelector('#rightCurtain').style.boxShadow = '-40px 40px 55px black';
        // document.querySelector('#leftCurtain').style.border = 'black 4px solid';
        // document.querySelector('#leftCurtain').style.boxShadow = '40px 40px 55px black';

        h2El.classList.add("fadeOut");
        randomMovieButton.classList.add("fadeOut");

    });
};

app.init();
