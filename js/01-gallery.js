import { galleryItems } from './gallery-items.js';
// Change code below this line

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
  onModal(evt);
}

let instance;
function onModal(evt) {
  instance = basicLightbox.create(
    `
    <img src="${evt.target.dataset.source}" />
    `,
    {
      onShow: instance => {
        document.addEventListener('keydown', onEscapeButton);
      },
      onClose: instance => {
        document.removeEventListener('keydown', onEscapeButton);
      },
    }
  );
  instance.show();
}

function onEscapeButton(event) {
  if (event.key === 'Escape') instance.close();
}
