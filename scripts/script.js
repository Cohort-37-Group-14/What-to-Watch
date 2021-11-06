const app = {};

app.init = function() {
    const h2El = document.querySelector('h2');
    const randomMovieButton = document.querySelector('#randomMovieButton');
    document.querySelector('#randomMovieButton').addEventListener('click', function() {
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
