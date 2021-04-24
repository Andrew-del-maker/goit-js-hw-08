import resources from './gallery-items.js'


const galleryContainer = document.querySelector('.js-gallery');
const ligthbox = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('.lightbox__button');
const overlay = ligthbox.querySelector('.lightbox__overlay');
const necessaryImg = ligthbox.querySelector('.lightbox__image');

const cardsMarkup = createGalleryCardsMarkup(resources);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createGalleryCardsMarkup(resources) {
    return resources
        .map(res => {
            const { preview, original, description } = res;
            return `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}" onclick="event.preventDefault()" >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    data-index="${resources.indexOf(res)}" /> </a>
            </li>`;
            }).join('');
};

galleryContainer.addEventListener('click', onGalleryContainerClick);
let currentEl = 0;
let slides = document.querySelectorAll('.gallery__image');

function onGalleryContainerClick(e) {
    if (!e.target.classList.contains('gallery__image')) { return; };

    currentEl = e.target;
    console.log(currentEl);

    imgAttributesChanging(currentEl)
    
    if (!ligthbox.classList.contains('is-open')) {
        ligthbox.classList.add('is-open');
    }

    if (ligthbox.classList.contains('is-open')) {
        window.addEventListener('keydown', onChangingImgKeyPress);
    };

    closeModalBtn.addEventListener('click', onCloseModal);
    overlay.addEventListener('click', onCloseModal)
    window.addEventListener('keydown', onEscKeyPress);   
};

function imgAttributesChanging(currentEl) {
    necessaryImg.src = currentEl.dataset.source;
    necessaryImg.alt = currentEl.alt;
};

function onEscKeyPress(e) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = e.code === ESC_KEY_CODE;
    if (isEscKey) { onCloseModal() }   
};

function onCloseModal() {
    ligthbox.classList.remove('is-open');
    lightboxImageSrcCleaning();
    window.removeEventListener('keydown', onChangingImgKeyPress);
}

function lightboxImageSrcCleaning() {
    necessaryImg.src = '';
};

function onChangingImgKeyPress(e) {
    const PREV_IMG_KEY_CODE = 'ArrowLeft';
    const NEXT_IMG_KEY_CODE = 'ArrowRight';
    let isPrevImgKey = e.code === PREV_IMG_KEY_CODE;
    let isNextImgKey = e.code === NEXT_IMG_KEY_CODE;
    if (isPrevImgKey) {
        console.log('Pressed ArrowLeft');
        showPrevImg();
    } else if (isNextImgKey) {
        console.log('Pressed ArrowRight');
        showNextImg();
    }
};

function showPrevImg() {
    if (currentEl.dataset.index > 0) {
        currentEl = slides[Number(currentEl.dataset.index) - 1];
    } else { currentEl = slides[8];}
    necessaryImg.src = currentEl.dataset.source;
    necessaryImg.alt = currentEl.alt;
    console.log(currentEl);
    console.log(`Текущий слайд № ${currentEl.dataset.index}`);
};
function showNextImg() {
    if (currentEl.dataset.index < 8) {
        currentEl = slides[Number(currentEl.dataset.index) + 1];
    } else { currentEl = slides[0];}
    necessaryImg.src = currentEl.dataset.source;
    necessaryImg.alt = currentEl.alt;
    console.log(currentEl);
    console.log(`Текущий слайд № ${currentEl.dataset.index}`);
};