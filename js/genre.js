import {paintMovies} from './movie.js';

const genreList = document.querySelector('.genre-list');
const cover = document.createElement('div');
cover.classList.add('cover');

const ACTIVE_CLASSNAME = 'active';

const cacheMovie = new Map();

async function loadMovies(genre) {
    if (!cacheMovie.has(genre)) {
        const response = await fetch(`https://yts-proxy.now.sh/list_movies.json?genre=${genre}&limit=15&sort_by=rating`);
        const {data:{movies}} = await response.json();

        cacheMovie.set(genre,movies);
    }

    return cacheMovie.get(genre);
}

async function onGenreClick(e) {
    const genre = e.target.textContent;

    for (const li of genreList.children) {
        li.classList.remove(ACTIVE_CLASSNAME);
    }
    e.target.classList.add(ACTIVE_CLASSNAME);

    document.body.append(cover);

    const movies = await loadMovies(genre);
    paintMovies({movies});

    cover.remove();
}

function paintGenre(genre) {
    const li = document.createElement('li');
    li.textContent = genre;
    li.addEventListener('click', onGenreClick);
    
    genreList.append(li);
}

export function paintGenres({genres}) {
    genres.forEach(paintGenre);
}