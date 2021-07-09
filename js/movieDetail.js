function createElement({className,tagName,text}) {
    const tag = document.createElement(`${tagName}`);
    tag.classList.add(className);
    tag.textContent = text;

    return tag;
}

export function createDetail(movie) {
    const {title,year,rating,genres,summary,medium_cover_image : imageSrc} = movie;
    const container = document.createElement('div');
    container.classList.add('movie-detail');

    const ratingText = String(rating).length>2?rating:`${rating}.0`;
    const genresText = genres.reduce((text,now)=> text+=`, ${now}`);

    const image = new Image();
    image.src = imageSrc;
    container.append(image);

    const data = document.createElement('div');
    data.classList.add('data');

    data.append(createElement({className:'title',tagName:'h1',text:title}));
    data.append(createElement({className:'year',tagName:'div',text:year}));
    data.append(createElement({className:'rating',tagName:'div',text:ratingText}));
    data.append(createElement({className:'genres',tagName:'div',text:genresText}));
    data.append(createElement({className:'summary',tagName:'div',text:summary}));
    container.append(data);

    return container;
}