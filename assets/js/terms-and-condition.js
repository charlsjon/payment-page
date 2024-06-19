document.addEventListener('DOMContentLoaded', ()=> {

  const scrollableElement = document.getElementById('scrollable');
  scrollableElement.addEventListener('scroll', () => {
    scrollableElement.classList.add('scroll-active');
    clearTimeout(scrollableElement.scrollTimeout);
    scrollableElement.scrollTimeout = setTimeout(() => {
      scrollableElement.classList.remove('scroll-active');
    }, 300);
  });

  const termsCondition = document.getElementById('accept-terms-condition');
  const continueBtn = document.getElementById('continue-btn');
    termsCondition.addEventListener('change', ()=> {
      if(termsCondition.checked != true) {
        continueBtn.setAttribute("disabled", "disabled")
      } else {
        continueBtn.removeAttribute("disabled")
      }
    })

  const search = document.getElementById('search');
  const searchBar = document.getElementById('search-bar');
  const findCounter = document.getElementById('find-counter');
  function expandSearchBar() {
    searchBar.classList.add('expanded');
    searchBar.classList.remove('search-bar');
    findCounter.classList.add('flex');
    findCounter.classList.remove('hidden');
    searchBar.focus();
  }
  function collapseSearchBar() {
    searchBar.classList.remove('expanded');
    searchBar.classList.add('search-bar');
    findCounter.classList.remove('flex');
    findCounter.classList.add('hidden');
  }
  search.addEventListener('click', function(event) {
    event.stopPropagation();
    expandSearchBar();
  });
  document.addEventListener('click', function(event) {
    if (!searchBar.contains(event.target) && !search.contains(event.target)) {
      collapseSearchBar();
    }
  });
  searchBar.addEventListener('click', function(event) {
    event.stopPropagation();
  });

  const searchInput = document.getElementById('search-input');
  const articleContent = document.getElementById('article-content');
  const prevButton = document.getElementById('prev-highlight');
  const nextButton = document.getElementById('next-highlight');
  const highlightCount = document.getElementById('highlight-count');

  let highlights = [];
  let currentIndex = -1;

  // Function to remove old highlights
  function removeHighlights() {
      const highlightedElements = articleContent.querySelectorAll('.highlight');
      highlightedElements.forEach(element => {
          const parent = element.parentNode;
          parent.replaceChild(document.createTextNode(element.textContent), element);
          parent.normalize(); // Combine adjacent text nodes
      });
      highlights = [];
      currentIndex = -1;
  }

  // Function to add new highlights and return all highlighted elements
  function highlightText(text) {
      if (!text) return [];

      const regex = new RegExp(`(${text})`, 'gi');
      traverseDOM(articleContent, node => {
          if (node.nodeType === Node.TEXT_NODE) {
              const matches = node.data.match(regex);
              if (matches) {
                  const newNode = document.createElement('span');
                  newNode.innerHTML = node.data.replace(regex, '<span class="highlight">$1</span>');
                  const highlightNodes = Array.from(newNode.childNodes);
                  node.replaceWith(...highlightNodes);
                  highlights.push(...highlightNodes.filter(node => node.className === 'highlight'));
              }
          }
      });

      return highlights;
  }

  // Function to traverse DOM and apply a callback to each text node
  function traverseDOM(node, callback) {
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
      let currentNode;
      while (currentNode = walker.nextNode()) {
          callback(currentNode);
      }
  }

  // Function to scroll to a specific highlight
  function scrollToHighlight(index) {
      if (highlights.length === 0) return;

      currentIndex = (index + highlights.length) % highlights.length;
      highlights[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      highlightCount.textContent = `${currentIndex + 1} of ${highlights.length}`;
  }

  // Search event listener
  searchInput.addEventListener('input', function () {
      const query = this.value.trim();
      removeHighlights();

      if (query.length > 0) {
          highlightText(query);
          scrollToHighlight(0);
      } else {
          highlightCount.textContent = `0 of 0`;
      }
  });

  // Navigation buttons event listeners
  prevButton.addEventListener('click', function () {
      scrollToHighlight(currentIndex - 1);
  });

  nextButton.addEventListener('click', function () {
      scrollToHighlight(currentIndex + 1);
  });
})