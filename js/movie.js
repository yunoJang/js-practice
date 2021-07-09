import Modal from './movieDetailModal.js';
import {createDetail} from './movieDetail.js';
import {createSuggestion} from './suggest.js';

const movieList = document.querySelector('.movie-container ul');

export async function onMovieClick(movie) {
    console.log(movie);
    const modal = new Modal();

    modal.append(createDetail(movie));
    modal.float();
    const suggestion = await createSuggestion(movie.id);
    modal.append(suggestion);
}

function paintMovie(movie) {
    const li = document.createElement('li');
    li.classList.add('movie');
    li.addEventListener('click', onMovieClick.bind(null,movie));

    const src = movie.medium_cover_image;
    const img = new Image();
    img.src = src;

    const title = document.createElement('h1');
    title.textContent = movie.title.length > 20 ?`${movie.title.slice(0,20)}...`:movie.title;

    li.append(img,title);
    movieList.append(li);
}

export function paintMovies({movies}) {
    movieList.innerHTML = '';
    movies.forEach(paintMovie);
}