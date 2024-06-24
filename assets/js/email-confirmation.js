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

    if (isValidEmail(emailValue) && emailValue === confirmEmailValue) {
      submitButton.removeAttribute("disabled")
    } else {
      submitButton.disabled = true;
      submitButton.setAttribute("disabled", "disabled")
    }
  }

  // Add event listeners to both input fields
  email.addEventListener('input', verifyEmail);
  confirmEmail.addEventListener('input', verifyEmail);
});