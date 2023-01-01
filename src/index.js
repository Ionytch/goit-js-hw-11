// const { Notify } = require("notiflix");

// import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '32152184-2ad461e647b19751df8bc3af5';

let currentPage = 1;
let totalPages = undefined;
const perPage = 4;

const searchField = document.getElementById('search-form'); 
const baseURL = 'https://pixabay.com/api/?key=';
const searchParameters = 'image_type=photo&orientation=horizontal&safesearch=true';
const loadMoreBtn = document.querySelector('.load-more');

// const articlesContainer = document.getElementById('articles'); // контейнер для статей
// const paginationContainer = document.getElementById('pagination'); // контейнер для пагінації
// const loadMoreBtnRef = document.getElementById('loadMore'); // кнопка підгрузки іще
let keyWord = '';
let currentHits = 0;

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


function getImages({keyWord, currentPage}) {
  fetch(`${baseURL}${API_KEY}&q=${keyWord}&${searchParameters}&per_page=${perPage}&page=${currentPage}`)
    .then(res => {
    if (res.status !== 200){
    throw new Error(res.message)
    }
    return res.json(); 
    })   
    .then(({ hits, totalHits }) => {
      if (totalHits === 0) {
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
      }
      currentHits += hits.length;
      console.log(hits);
      console.log(totalHits);
      render(hits);
      calculatePagination(totalHits)
    })
        
}

function calculatePagination(totalHits) { 
  totalPages = Math.ceil(totalHits / perPage);
  console.log(totalPages);
  if (totalHits > perPage) {
    loadMoreBtn.classList.remove('is-hidden');
    // loadMoreBtn.classList.add('is-hidden');
  }
  
  
  
    
}



loadMoreBtn.addEventListener("click", e => {
  currentPage += 1;
  const responce=getImages({ keyWord, currentPage });
  

  if (currentHits === responce.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    console.log(currentPage);
    console.log(totalPages);
    Notify.info("We're sorry, but you've reached the end of search results.");
    
  }
  
})

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

