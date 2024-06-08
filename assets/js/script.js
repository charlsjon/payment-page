document.addEventListener("DOMContentLoaded", function () {
  let descriptionContainer = document.querySelectorAll(".description-container")
  descriptionContainer.forEach(description => {

    let readMore = description.querySelector(".read-more");
    let content = description.querySelector(".content");

    // Check if content exceeds 3 lines
    if (content.scrollHeight > content.clientHeight) {
      readMore.style.display = 'block';
    }

    readMore.addEventListener('click', function (e) {
      e.preventDefault();
      content.classList.toggle('expanded');
      if (content.classList.contains('expanded')) {
        readMore.textContent = 'Read Less';
      } else {
        readMore.textContent = 'Read More';
      }
    });
  })
});