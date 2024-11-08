function offLoader() {
  closeLoader = setTimeout(showPage, 3000)
}

const loader = document.getElementById('loader')
function showPage() {
  loader.style.display = "none"
}

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
    searchBar.classList.add('extend');
    searchBar.classList.remove('search-bar');
    findCounter.classList.add('flex');
    findCounter.classList.remove('hidden');
    searchBar.focus();
  }
  function collapseSearchBar() {
    searchBar.classList.remove('extend');
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

  // Function to remove all highlights
  function removeHighlights() {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    highlights = [];
    currentIndex = -1;
  }

  // Function to highlight text
  function highlightText(text) {
    if (!text) return [];

    const regex = new RegExp(`(${text})`, 'gi');
    const nodes = Array.from(articleContent.childNodes);

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const matches = [...node.data.matchAll(regex)];
        if (matches.length > 0) {
          const parent = node.parentNode;
          const docFrag = document.createDocumentFragment();
          let lastIndex = 0;

          matches.forEach(match => {
            const span = document.createElement('span');
            span.classList.add('highlight');
            span.textContent = match[1];

            const textBefore = node.data.slice(lastIndex, match.index);
            docFrag.appendChild(document.createTextNode(textBefore));
            docFrag.appendChild(span);

            lastIndex = match.index + match[1].length;
            highlights.push(span);
          });

          const textAfter = node.data.slice(lastIndex);
          docFrag.appendChild(document.createTextNode(textAfter));
          parent.replaceChild(docFrag, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('highlight')) {
        highlightTextRecursive(node, regex);
      }
    });

    return highlights;
  }

  function highlightTextRecursive(element, regex) {
    const childNodes = Array.from(element.childNodes);

    childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const matches = [...child.data.matchAll(regex)];
        if (matches.length > 0) {
          const parent = child.parentNode;
          const docFrag = document.createDocumentFragment();
          let lastIndex = 0;

          matches.forEach(match => {
            const span = document.createElement('span');
            span.classList.add('highlight');
            span.textContent = match[1];

            const textBefore = child.data.slice(lastIndex, match.index);
            docFrag.appendChild(document.createTextNode(textBefore));
            docFrag.appendChild(span);

            lastIndex = match.index + match[1].length;
            highlights.push(span);
          });

          const textAfter = child.data.slice(lastIndex);
          docFrag.appendChild(document.createTextNode(textAfter));
          parent.replaceChild(docFrag, child);
        }
      } else if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains('highlight')) {
        highlightTextRecursive(child, regex);
      }
    });
  }

  // Function to scroll to a specific highlight
  function scrollToHighlight(index) {
    if (highlights.length === 0) return;

    currentIndex = (index + highlights.length) % highlights.length;

    highlights.forEach((highlight, i) => {
      if (i === currentIndex) {
        highlight.classList.add('focused');
      } else {
        highlight.classList.remove('focused');
      }
    });

    const highlightElement = highlights[currentIndex];
    highlightElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightCount.textContent = `${currentIndex + 1} of ${highlights.length}`;
  }

  // Search input event listener
  searchInput.addEventListener('input', function () {
    const query = this.value.trim();
    removeHighlights();

    if (query.length > 0) {
      highlightText(query);
      if (highlights.length > 0) {
        scrollToHighlight(0);
      }
      highlightCount.textContent = `${highlights.length > 0 ? 1 : 0} of ${highlights.length}`;
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