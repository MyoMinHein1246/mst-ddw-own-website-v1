function setUp() {
  const slideshows = document.querySelectorAll(".slideshow");

  slideshows.forEach((slideshow, index) => {
    showSlide(0, `slideshow${index + 1}`);
  });
}

function showSlide(index, slideshowId) {
  const slideshow = document.getElementById(slideshowId);
  const slides = slideshow.querySelectorAll(".slide");

  let currentSlide = index % slides.length;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  slides.forEach((slide, i) => {
    if (i === currentSlide) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

function changeSlide(direction, slideshowId) {
  const slideshow = document.getElementById(slideshowId);
  const slides = slideshow.querySelectorAll(".slide");
  const currentSlideIndex = Array.from(slides).findIndex(
    (slide) => slide.style.display === "block"
  );

  showSlide(currentSlideIndex + direction, slideshowId);
}

setUp();
