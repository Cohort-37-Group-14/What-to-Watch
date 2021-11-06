const app = {};

app.init = function() {

    document.querySelector('#randomMovieButton').addEventListener('click', function() {
        document.querySelector('#leftCurtain').style.left = '-30vw';
        document.querySelector('#leftCurtain').style.transition = 'left 3s';
        document.querySelector('#rightCurtain').style.right = '-30vw';
        document.querySelector('#rightCurtain').style.transition = 'right 3s';
        document.querySelector('#rightCurtain').style.border = '#fad947 4px solid';
        document.querySelector('#rightCurtain').style.boxShadow = '-10px 2px 15px #fad947';
        document.querySelector('#leftCurtain').style.border = '#fad947 4px solid';
        document.querySelector('#leftCurtain').style.boxShadow = '10px 2px 15px #fad947';
    });
};

app.init();
