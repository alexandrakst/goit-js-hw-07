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
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  onModal(evt);
}

const galleryLightBox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function onModal(evt) {
  instance = SimpleLightbox.create(
    `
    <img src="${evt.target.dataset.source}" />
    `,
    {
      onShow: instance => {
        galleryItemsContainer.addEventListener('keydown', onEscapeButton);
      },
      onClose: instance => {
        galleryItemsContainer.removeEventListener('keydown', onEscapeButton);
      },
    }
  );
  instance.show();
}

function onEscapeButton(event) {
  if (event.key === 'Escape') instance.close();
}
