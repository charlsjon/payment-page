document.addEventListener("DOMContentLoaded", function () {
  let descriptionContainer = document.querySelectorAll(".description-container")
  descriptionContainer.forEach(description => {

    let readMore = description.querySelector(".read-more");
    let content = description.querySelector(".content");

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

const formatNumber = (number) => number.split("").reduce((acc, char, index) => {
    if (index !== 0 && index % 4 === 0) acc += " ";
    return acc + char;
}, "");

input.addEventListener("input", () => {
    input.value = formatNumber(input.value.replace(/\D/g, "")); // Replace non-numeric characters
});

input.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!/^\d$/.test(key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(key)) {
        event.preventDefault();
    }
});

input.addEventListener("paste", (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").replace(/\D/g, "");
    document.execCommand("insertText", false, pastedData);
});

const cvvInput = document.getElementById('cvv');

cvvInput.addEventListener('input', function (event) {
    const value = this.value.replace(/\D/g, ''); 
    if (value.length <= 4) {
        this.value = value;
    } else {
        this.value = value.slice(0, 4);
    }
});

cvvInput.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!/^\d$/.test(key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(key)) {
        event.preventDefault();
    }
});

cvvInput.addEventListener('paste', function (event) {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').replace(/\D/g, ''); // Get only numbers from paste
    document.execCommand('insertText', false, pastedData.slice(0, 4)); // Insert only numeric data up to 4 digits
});

let plans = document.getElementsByClassName('plan');

for (let i = 0; i < plans.length; i++) {
  const plan = plans[i];
  plan.addEventListener('click', handlePlanClick)
}

function handlePlanClick(event) {
  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    plan.classList.remove('select');
    plan.classList.remove('bg-tealgreen');

    event.currentTarget.classList.add('select');
    event.currentTarget.classList.add('bg-tealgreen');
    const paymentInfo = document.querySelector('.payment-info');
    const subscriptionPlan = document.getElementById('subscription-plan');

    if(plan.classList.contains('select')) {
      console.log(paymentInfo)
      paymentInfo.classList.add('add-width');
      subscriptionPlan.classList.remove('rounded-lg');
      subscriptionPlan.classList.add('rounded-l-lg');
    }
  }
}


