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

const input = document.getElementById("credit-card-input");

// Function to format number
const formatNumber = (number) => number.split("").reduce((acc, char, index) => {
    if (index !== 0 && index % 4 === 0) acc += " ";
    return acc + char;
}, "");

// Function to handle input and format number
input.addEventListener("input", () => {
    input.value = formatNumber(input.value.replace(/\D/g, "")); // Replace non-numeric characters
});

// Prevent non-numeric input
input.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!/^\d$/.test(key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(key)) {
        event.preventDefault(); // Prevent non-numeric input
    }
});

// Handle paste event to allow only numbers
input.addEventListener("paste", (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").replace(/\D/g, ""); // Get only numbers from paste
    document.execCommand("insertText", false, pastedData); // Insert only numeric data
});