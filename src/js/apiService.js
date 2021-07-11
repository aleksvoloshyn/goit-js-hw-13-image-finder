export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this);
    const MY_KEY = '22398165-fb0cc592f6e3d650fc4eef6c6';
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=номер_страницы&page=${this.page}&per_page=12&key=${MY_KEY}`;

    return fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
