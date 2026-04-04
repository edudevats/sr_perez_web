// Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  
  const slides = Array.from(track.children);
  const slideCount = slides.length;
  // We want to move by 1 slide width at a time
  
  let currentIndex = 0;
  
  function moveToNextSlide() {
    currentIndex++;
    if (currentIndex >= slideCount) {
      currentIndex = 0;
    }
    // Move slightly for each item based on total track width
    track.style.transform = `translateX(-${(currentIndex * 100) / slideCount}%)`;
  }
  
  // Auto-scroll every 3 seconds
  setInterval(moveToNextSlide, 3000);
});
