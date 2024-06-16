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

  searchInput.addEventListener('input', function() {
      const query = searchInput.value.trim().toLowerCase();
      clearHighlights();
      if (query !== '') {
          highlightMatches(query);
      }
  });

  function highlightMatches(query) {
      const content = articleContent.innerHTML;
      const regex = new RegExp(`(${query})`, 'gi');
      const highlightedContent = content.replace(regex, '<span class="highlight">$1</span>');
      articleContent.innerHTML = highlightedContent;
  }

  function clearHighlights() {
      const content = articleContent.innerHTML;
      articleContent.innerHTML = content.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
  }
})