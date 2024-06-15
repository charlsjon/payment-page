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

document.addEventListener('DOMContentLoaded', ()=> {
  termsCondition.addEventListener('change', ()=> {
    if(termsCondition.checked != true) {
      continueBtn.setAttribute("disabled", "disabled")
    } else {
      continueBtn.removeAttribute("disabled")
    }
  })
})