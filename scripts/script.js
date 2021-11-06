const app = {};

app.init = function() {

    document.querySelector('#randomMovieButton').addEventListener('click', function() {
        document.querySelector('#leftCurtain').style.left = '-30vw';
        document.querySelector('#leftCurtain').style.transition = 'left 3s';
        document.querySelector('#rightCurtain').style.right = '-30vw';
        document.querySelector('#rightCurtain').style.transition = 'right 3s';
    });
};

app.init();
