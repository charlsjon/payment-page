const scrollableElement = document.getElementById('scrollable');

scrollableElement.addEventListener('scroll', () => {
    scrollableElement.classList.add('scroll-active');
    clearTimeout(scrollableElement.scrollTimeout);
    scrollableElement.scrollTimeout = setTimeout(() => {
        scrollableElement.classList.remove('scroll-active');
    }, 300); // Time in ms after scrolling stops to remove the class
});