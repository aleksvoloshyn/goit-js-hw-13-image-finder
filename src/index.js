import './sass/main.scss';

import ImageApiService from './js/apiService';
import imagesTemplate from './js/templates/imagesTemplate.hbs';
// import onSearch from './js/on-search';

// const MY_KEY = '22398165-fb0cc592f6e3d650fc4eef6c6';
// const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=alex&page=номер_страницы&per_page=12&key=${MY_KEY}`;

const refs = {
  searchForm: document.getElementById('search-form'),
  gallerySection: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('[data-action="load-more"]'),
};

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  imageApiService.query = e.currentTarget.elements.query.value;
  imageApiService.resetPage();
  imageApiService.fetchImages().then(appendPicturesMarkup);
}

function onLoadMore() {
  imageApiService.fetchImages().then(appendPicturesMarkup);
}

function appendPicturesMarkup(hits) {
  refs.gallerySection.insertAdjacentHTML('beforeend', imagesTemplate(hits));
}
