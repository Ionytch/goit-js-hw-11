// const { Notify } = require("notiflix");

import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '32152184-2ad461e647b19751df8bc3af5';

let currentPage;
let totalPages = undefined;
const perPage = 40;

const searchField = document.getElementById('search-form'); 
const baseURL = 'https://pixabay.com/api/?key=';
const searchParameters = 'image_type=photo&orientation=horizontal&safesearch=true';
const loadMoreBtn = document.querySelector('.load-more');

let keyWord = '';

const imagesContainer = document.querySelector('.gallery');

searchField.addEventListener("submit", e => {
  e.preventDefault();
  currentPage = 1;
   keyWord = e.currentTarget.searchQuery.value;
  console.log(keyWord);
  if (keyWord === '') {
    Notify.warning("Enter the keyword");
    return;
  }
  getImages({keyWord})
  })





async function getImages() {
  try {
    const response = await axios.get(`${baseURL}${API_KEY}&q=${keyWord}&${searchParameters}&per_page=${perPage}&page=${currentPage}`);
    console.log(response.data);
     console.log(response.data.hits);
    console.log(response.data.totalHits);
        console.log(response.data.hits.length);
          if (response.data.totalHits === 0) {
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }
    render(response.data.hits);
    calculatePagination(response.data.totalHits);
    onSimpleLightBox();
  } catch (error) {
    console.error(error);
  }
}

function calculatePagination(totalHits) { 
  totalPages = Math.ceil(totalHits / perPage);
  console.log(totalPages);
  if (totalHits > perPage) {
    loadMoreBtn.classList.remove('is-hidden');    
  }
      
}

loadMoreBtn.addEventListener("click", e => {
  currentPage += 1;
    console.log(currentPage);
    console.log(totalPages);
  if (currentPage >= totalPages) {
    loadMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
    return
  }
  getImages({ currentPage });
})

function render(hits) {
  imagesContainer.innerHTML = '';
  hits.forEach(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    const imagesEl = `<div class="photo-card"><a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      Likes:<b>${likes}</b>
    </p>
    <p class="info-item">
      Views:<b>${views}</b>
    </p>
    <p class="info-item">
      Comments:<b>${comments}</b>
    </p>
    <p class="info-item">
      Downloads:<b>${downloads}</b>
    </p>
  </div>
  </div>
  `;
    imagesContainer.insertAdjacentHTML('beforeend', imagesEl)
  });
}
  
function onSimpleLightBox() {
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
