function offLoader() {
  closeLoader = setTimeout(showPage, 3000)
}

const loader = document.getElementById('loader')
function showPage() {
  loader.style.display = "none"
}

document.addEventListener('DOMContentLoaded', (event) => {
  const email = document.getElementById('email');
  const confirmEmail = document.getElementById('confirmEmail');
  const submitButton = document.getElementById('submitButton');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(email) {
    return emailRegex.test(email);
  }

  function verifyEmail() {
    const emailValue = email.value;
    const confirmEmailValue = confirmEmail.value;

    if (!isValidEmail(emailValue) || !isValidEmail(confirmEmailValue) || emailValue !== confirmEmailValue) {
      submitButton.disabled = true;
      submitButton.setAttribute("disabled", true)
      return
    }
    submitButton.removeAttribute("disabled")
  }

  email.addEventListener('input', verifyEmail);
  confirmEmail.addEventListener('input', verifyEmail);
});