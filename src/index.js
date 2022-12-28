// const { Notify } = require("notiflix");

// import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '32152184-2ad461e647b19751df8bc3af5';

let currentPage = 1;
let totalPages = undefined;
const perPage = 40;

const searchField = document.getElementById('search-form'); 
const baseURL = 'https://pixabay.com/api/?key=';
const searchParameters='image_type=photo&orientation=horizontal&safesearch=true'

// const articlesContainer = document.getElementById('articles'); // контейнер для статей
// const paginationContainer = document.getElementById('pagination'); // контейнер для пагінації
// const loadMoreBtnRef = document.getElementById('loadMore'); // кнопка підгрузки іще
let keyWord = '';

const imagesContainer = document.querySelector('.gallery');

searchField.addEventListener("submit", e => {
  e.preventDefault();
   keyWord = e.currentTarget.searchQuery.value;
  console.log(keyWord);
  if (keyWord === '') {
    Notify.warning("Enter the keyword");
    return;
  }
  getImages({keyWord})
    // .then((hits) => render(hits))
    // .catch((error) => console.log(error));
  })


function getImages({keyWord}) {
  fetch(`${baseURL}${API_KEY}&q=${keyWord}&${searchParameters}&per_page=${perPage}&page=${currentPage}`)
    .then(res => {
    if (res.status !== 200){
    throw new Error(res.message)
    }
    return res.json(); 
    })   
    .then( ({hits, totalHits})  => {
      console.log(hits);
      console.log(totalHits);
      render(hits);
      calculatePagination(totalHits)
    })
        
}

function calculatePagination(totalHits) { 
  totalPages = Math.ceil(totalHits / perPage);
  console.log(totalPages);
  if (totalPages <= perPage) {
    loadMoreBtn.classList.add('is-hidden');
  }
  
}

function render(hits) {
  imagesContainer.innerHTML = '';
  hits.forEach(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    const imagesEl = `<div class="photo-card">
  <a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a> <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
    imagesContainer.insertAdjacentHTML('beforeend', imagesEl)
  });
}
  


// const galleryContainer = document.querySelector('.gallery');

// const markup=galleryItems.map((item)=>` <div class="gallery__item">
//   <a class="gallery__link" href="${item.original}">
//     <img
//       class="gallery__image"
//       src="${item.preview}"
//       data-source="${item.original}"
//       alt="${item.description}"
//     />
//   </a>
// </div> `).join("");
// console.log (markup);
// galleryContainer.insertAdjacentHTML("beforeend", markup);

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function (e) {
console.log(e);  });

gallery.on('error.simplelightbox', function (e) {
  console.log(e);
});

