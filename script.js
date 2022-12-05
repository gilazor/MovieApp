const API_KEY = 'e3a4cd970b8b6c386e977b8ba628e7d0';
const API_URL_PM = 'https://api.themoviedb.org/3/movie/popular?api_key=e3a4cd970b8b6c386e977b8ba628e7d0&language=en-US&page=1'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const search_URL = 'https://api.themoviedb.org/3/search/movie?api_key=e3a4cd970b8b6c386e977b8ba628e7d0&language=en-US&page=1&query=string'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const container = document.querySelector(".container")

getMovies(API_URL_PM);

function getMovies(url) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            showMovies(data.results);
        })

}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
          <img src="${IMG_URL + poster_path}"
                 alt="${title}" >
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
        
                </div>
                <div class="overview">
                    
                <h3>Overview</h3>
                    ${overview}
                </div>
        `
        main.appendChild(movieEl);


    })
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    }
    else if (vote >= 5) {
        return 'orange'
    }
    else {
        return 'red'
    }
}

form.addEventListener('keyup', (e) => {
    e.preventDefault();

    const searchBar = search.value;

    if (searchBar) {
        getMovies(search_URL + '&query=' + searchBar);

    } else {
        getMovies(API_URL_PM);
    }


})





























