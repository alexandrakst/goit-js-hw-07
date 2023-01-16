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
      return `<div class="gallery__item">
<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

function onGalleryItemsContainerClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  console.log(evt.target);
  onModal(evt);
}

function onModal(evt) {
  const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" />
`);
  onShow: instance => {
    galleryItemsContainer.addEventListener('keydown', onEscapeButton);
  };
  onClose: instance => {
    galleryItemsContainer.removeEventListener('keydown', onEscapeButton);
  };

  instance.show();
}

function onEscapeButton(evt) {
  if (evt.key === 'Escape') instance.close();
}
