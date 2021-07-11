import './sass/main.scss';

import ImageApiService from './js/apiService';
import imagesTemplate from './js/templates/imagesTemplate.hbs';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  searchForm: document.getElementById('search-form'),
  gallerySection: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearPicturesContainer();

  imageApiService.query = e.currentTarget.elements.query.value;
  if (imageApiService.query === '') {
    return alert('Введите что-нибудь...!');
  }

  loadMoreBtn.show();
  imageApiService.resetPage();
  imageApiService.fetchImages().then(appendPicturesMarkup);
}

function onLoadMore() {
  loadMoreBtn.disable();
  imageApiService.fetchImages().then(appendPicturesMarkup);
  setTimeout(scrollPage, 500);
  loadMoreBtn.enable();
}

function appendPicturesMarkup(hits) {
  refs.gallerySection.insertAdjacentHTML('beforeend', imagesTemplate(hits));
}

function clearPicturesContainer() {
  refs.gallerySection.innerHTML = '';
}

function scrollPage() {
  const element = document.querySelector('.scroll');
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
