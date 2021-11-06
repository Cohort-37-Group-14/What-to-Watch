const app = {};

app.url = new URL('https://imdb-api.com/en/API/Top250Movies/');
app.url.search = new URLSearchParams({
    apiKey: 'k_xpdojdru'
});

//Variables to storing the random numbers for getting random movies
app.movieOrder = [movie1 = null, movie2 = null, movie3 = null, movie4 = null, movie5 = null, movie6 = null]
// Generate 6 different random numbers for getting random movies
app.getRandomNumber = function(min, max, variableArray) {
    let result
    for(let i = 0; i < 6; i ++) {
        do {
            result = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log(result);
        } while (variableArray.indexOf(result) !== -1) //if the number is equal to any variables in the array, the method will redo again until getting an unique number
        console.log(variableArray);
        app.movieOrder[i] = result;
        console.log(app.movieOrder[i]);
   }
}
app.getRandomNumber(0, 249, app.movieOrder);




fetch(app.url).then(function(response) {
        return response.json();
    }).then(function(data){
        const img = data.items[0].image
        const movieData = data.items[0]

        console.log(data);

        console.log(img);
    })





app.init = function() {
    document.querySelector('#randomMovieButton').addEventListener('click', function() {
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
