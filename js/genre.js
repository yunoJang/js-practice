const genreList = document.querySelector('.genre-list');
const movieList = document.querySelector('.movie-list');

const genres = ['Comedy','Drama','Crime','Thriller','Horror','SCI-FI','Action','Romance','Animation'];

const ACTIVE_CLASSNAME = 'active';

const cover = document.createElement('div');
cover.classList.add('cover');

async function loadMovies(genre) {
    const response = await fetch(`https://yts-proxy.now.sh/list_movies.json?genre=${genre}&limit=10`);
    const {data:{movies}} = await response.json();

    return movies;
}

function paintMovie(movie) {
    const src = movie.medium_cover_image;
    const li = document.createElement('li');
    const img = new Image();
    img.src = src;

    li.append(img);
    movieList.append(li);
}

async function onGenreClick(e) {
    const genre = e.target.textContent;

    for (const li of genreList.children) li.classList.remove(ACTIVE_CLASSNAME);
    e.target.classList.add(ACTIVE_CLASSNAME);

    document.body.append(cover);

    const movies = await loadMovies(genre);
    movieList.innerHTML = '';
    movies.forEach(paintMovie);

    cover.remove();
}

function paintGenre(genre) {
    const li = document.createElement('li');
    li.textContent = genre;
    li.addEventListener('click', onGenreClick);
    
    genreList.append(li);
}

genres.forEach(paintGenre);