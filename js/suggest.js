import {onMovieClick} from './movie.js';

async function loadMovies(id) {
    const response = await fetch(`https://yts-proxy.now.sh/movie_suggestions.json?movie_id=${id}`);
    const {data:{movies}} = await response.json();

    return movies;
}

function createList(movie) {
    const li = document.createElement('li');
    li.addEventListener('click',onMovieClick.bind(null,movie))
    const img = new Image();
    const h1 = document.createElement('h1');

    img.src = movie.medium_cover_image;
    h1.textContent = movie.title

    li.append(img,h1);
    return li;
}

export async function createSuggestion(id) {
    const div = document.createElement('div');
    div.classList.add('suggestion');
    const title = document.createElement('h1');
    const ul = document.createElement('ul');

    title.textContent = 'Suggestion';
    div.append(title);

    const movies = await loadMovies(id);

    ul.append(...movies.map(createList));
    div.append(ul);

    return div;
}