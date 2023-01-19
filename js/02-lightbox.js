import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryItemsContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryItemsContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryItemsContainer.addEventListener('click', onGalleryItemsContainerClick);

function createGalleryMarkup(image) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li>
          <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
        </li>`;
    })
    .join('');
}

function onGalleryItemsContainerClick(evt) {
  evt.preventDefault();
}

const galleryLightBox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
