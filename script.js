const bg = document.getElementById("bgCarousel");
const title = document.getElementById("title");
const subTitle = document.getElementById("subTitle");


let array = [
  {
    image: "./images/3.jpeg",
    title: "Trending brush techniques 2023",
    subtitle: "By Nicholas",
  },
  {
    image: "./images/apparel-clothing-fashion-hangers-thumbnail.jpg",
    title: "Barcelona",
    subtitle: "Espanyol",
  },
  {
    image: "./images/best-football-boots-2022-2023-2.jpg",
    title: "Dot with Commas",
    subtitle: "Dotty Subtitles",
  },
];

let counter = 0

bg.style.backgroundImage = "url('"+array[counter].image+"')"
title.textContent = array[counter].title;
subTitle.textContent = array[counter].subtitle;

const changeImage =()=> {
    if (counter > array.length) {
        counter=0
    }else{
        counter++
    }
    bg.style.backgroundImage = "url('"+array[counter].image+"')";
    title.textContent = array[counter].title;
    subTitle.textContent = array[counter].subtitle;

} 

// setInterval(changeImage, 2000);

// imageSlider
// const sliderImage = document.getElementById("sliderImage");

// let images = [
//   "./images/alvarez.png",
//   "./images/dybala.png",
//   "./images/haaland.webp",
//   "./images/diMaria.webp",
//   "./images/kdb.webp",
//   "./images/mbappe.jpg",
//   "./images/MESSI.jpg",
//   "./images/ronaldo.webp",
//   "./images/pogba.webp",
//   "./images/neymar.webp"
// ]


// let currentIndex = 0;

// sliderImage.src = images[currentIndex];

// const prev = () =>{
//   currentIndex = (currentIndex - 1 + images.length) % images.length;
//   updateSlider();
// }

// const next = () =>{
//   currentIndex = (currentIndex + 1) % images.length;
//   updateSlider();
// }

// function updateSlider() {
//   sliderImage.style.left = "100%"; // Move image to the right
//   sliderImage.src = images[currentIndex];
//   setTimeout(() => {
//     sliderImage.style.left = "0"; // Slide image from right to left
//   }, 0);
// }

// WRAPPER CAROUSEL

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    // timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// testimonials slider

const slider = document.querySelector('.sliders');
const slides = document.querySelectorAll('.slide');
const slideWidth = slides[0].clientWidth;
let currentIndex = 0;

function slide() {
  currentIndex = (currentIndex + 1) % slides.length;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

setInterval(slide, 3000); // Change image every 3 seconds