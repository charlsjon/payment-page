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
  function expandSearchBar() {
    searchBar.classList.add('expanded');
    searchBar.classList.remove('search-bar');
    searchBar.focus();
  }
  function collapseSearchBar() {
    searchBar.classList.remove('expanded');
    searchBar.classList.add('search-bar');
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

  // Function to remove old highlights
  function removeHighlights() {
    const highlightedElements = articleContent.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
      const parent = element.parentNode;
      parent.replaceChild(document.createTextNode(element.textContent), element);
      parent.normalize(); // Combine adjacent text nodes
    });
  }

  // Function to add new highlights and return the first highlighted element
  function highlightText(text) {
    if (!text) return null;

    let firstHighlight = null;
    const regex = new RegExp(`(${text})`, 'gi');
    traverseDOM(articleContent, node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const matches = node.data.match(regex);
        if (matches) {
          const newNode = document.createElement('span');
          newNode.innerHTML = node.data.replace(regex, '<span class="highlight">$1</span>');
          const highlightNodes = Array.from(newNode.childNodes);
          node.replaceWith(...highlightNodes);
          
          if (!firstHighlight) {
            firstHighlight = highlightNodes.find(node => node.className === 'highlight');
          }
        }
      }
    });

    return firstHighlight;
  }

  // Function to traverse DOM and apply a callback to each text node
  function traverseDOM(node, callback) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;
    while (currentNode = walker.nextNode()) {
      callback(currentNode);
    }
  }

  // Search event listener
  searchInput.addEventListener('input', function () {
    const query = this.value.trim();
    removeHighlights();

    if (query.length > 0) {
      const firstHighlight = highlightText(query);
      if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
})