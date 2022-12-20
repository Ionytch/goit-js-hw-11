import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '32152184-2ad461e647b19751df8bc3af5';

let currentPage = 1;
let totalPages = undefined;
const PageSize = 40;

const searchBtn = document.getElementById('searchBtn');
const searchField = document.getElementById('search-images'); 
const baseURL = 'https://pixabay.com/api/?key=';
const searchParameters='image_type=photo&orientation=horizontal&safesearch=true'

const articlesContainer = document.getElementById('articles'); // контейнер для статей
const paginationContainer = document.getElementById('pagination'); // контейнер для пагінації
const loadMoreBtnRef = document.getElementById('loadMore'); // кнопка підгрузки іще

const imagesContainer = document.querySelector('.gallery');

searchBtn.addEventListener("click", e => {
  e.preventDefault();
  console.log(searchField.value);
  getImages({ query: searchField.value })
});


function getImages() {
  fetch(`${baseURL}${API_KEY}&q=${searchField.value}${searchParameters}`)
    .then(res => {
    // if (res !== "ok"){
    //   throw new Error(res.status)
    // }
    return res.json(); 
    })   
    .then(({ hits }) => {
      console.log(hits);
    render(hits)
  })
    
}


function render(hits) {
  imagesContainer.innerHTML = '';
  hits.forEach(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    const imagesEl = `<div class="photo-card">
  <a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a > <div class="info">
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
</div>
`).join('');
   imagesContainer.insertAdjacentHTML('beforeend',imagesEl) 
  }
//   )
// }

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



// let gallery = new SimpleLightbox('.gallery a');
// gallery.on('show.simplelightbox', function (e) {
// console.log(e);  });

// gallery.on('error.simplelightbox', function (e) {
// console.log(e);  });