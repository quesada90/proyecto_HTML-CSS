// Import your Unsplash API key from another file
import { ACCESS_KEY } from "./config.js";

// Fetch images from Unsplash API
async function fetchImages() {
  const KEYWORD = "nature";
  const IMAGE_COUNT = 10;

  const url = `https://api.unsplash.com/photos/random?query=${KEYWORD}&count=${IMAGE_COUNT}&fit=clip&crop=focalpoint
&client_id=${ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    const images = await response.json();
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

// Populate Swiper carousel with images
async function initializeGallery() {
  const imageContainer = document.querySelector(".swiper-wrapper");
  const images = await fetchImages();

  images.forEach((image) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `<img src="${image.urls.regular}" alt="${image.alt_description}" />`;
    imageContainer.appendChild(slide);
  });

  // Initialize Swiper
  new Swiper(".swiper-container", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
      stretch: 10,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// Load images when the page is ready
document.addEventListener("DOMContentLoaded", initializeGallery);
