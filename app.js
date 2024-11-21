let rub1 = document.querySelector(".rub1");
let usd1 = document.querySelector(".usd1");
let eur1 = document.querySelector(".eur1");
let gbp1 = document.querySelector(".gbp1");
let rub2 = document.querySelector(".rub2");
let usd2 = document.querySelector(".usd2");
let eur2 = document.querySelector(".eur2");
let gbp2 = document.querySelector(".gbp2");
let btnleft = document.querySelectorAll(".btnleft");
let btnright = document.querySelectorAll(".btnright ");
let inp1 = document.querySelector(".amount-input");
let inp2 = document.querySelector(".result-input");
let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let error = document.querySelector(".error-message");
let menuToggle = document.querySelector('.menu-toggle');
let navMenu = document.querySelector('.nav-menu');

let left = "RUB";
let right = "USD";

let c;

//1 point
function singlePoint(text) {
  let value = text.value;
  let parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');

  }
  text.value = value;
}
//only number
inp1.addEventListener("input", () => {
  c = 1;
  inp1.value = inp1.value.replace(/[^0-9.,]/g, '');
  inp1.value = inp1.value.replace(",", ".");
  if (inp1.value === ".") {
    inp1.value = "0.";
  }
  // 0 problem
  if ((/^0+/.test(inp1.value)) && (inp1.value.length > 1)) {
    inp1.value = inp1.value.replace(/^0+/, '');
  }
  if (inp1.value.startsWith(".")) {
    inp1.value = "0" + inp1.value;
  }
  singlePoint(inp1);
  connectCurrency(left, right);
})



//only number , .
inp2.addEventListener("input", () => {
  c = 2;
  inp2.value = inp2.value.replace(/[^0-9.,]/g, '');
  inp2.value = inp2.value.replace(",", ".");
  if (inp2.value === ".") {
    inp2.value = "0.";
  }
  // 0 problem
  if ((/^0+/.test(inp2.value)) && (inp2.value.length > 1)) {
    inp2.value = inp2.value.replace(/^0+/, '');
  }

  if (inp2.value.startsWith(".")) {
    inp2.value = "0" + inp2.value;
  }
  singlePoint(inp2);
  connectCurrency(left, right);
})

//click buttons
btnleft.forEach(button => {
  button.addEventListener("click", () => {
    btnleft.forEach(btn => btn.classList.remove("btn1"));

    button.classList.add("btn1");
    left = button.textContent;
    connectCurrency(left, right);
  });
});

btnright.forEach(button => {
  button.addEventListener("click", () => {
    btnright.forEach(btn => btn.classList.remove("btn2"));

    button.classList.add("btn2");
    right = button.textContent;
    connectCurrency(left, right);
  });
});
//connect currency 
function connectCurrency(a, b) {
  fetch(`https://v6.exchangerate-api.com/v6/765192b8cac08627c70fec94/latest/${a}`)
    .then(res => res.json())
    .then(response => {
      let amount1 = response.conversion_rates[b]
      rate1.textContent = '1 ' + a + ' = ' + response.conversion_rates[b] + ' ' + b;
      console.log(response.base_code);
      console.log(response.conversion_rates[b]);
      if (c == 1) {
        inp2.value = (inp1.value * amount1).toFixed(5);
      }
    })
  fetch(`https://v6.exchangerate-api.com/v6/765192b8cac08627c70fec94/latest/${b}`)
    .then(res => res.json())
    .then(response => {
      let amount2 = response.conversion_rates[a]
      rate2.textContent = '1 ' + b + ' = ' + response.conversion_rates[a] + ' ' + a;
      console.log(response.base_code);
      console.log(response.conversion_rates[a]);
      if (c == 2) {
        inp1.value = (inp2.value * amount2).toFixed(5);
      }
    })

  console.log(a);
  console.log(b);
}

// error
function showError(message) {
  error.textContent = message;
  error.style.display = "block";
}

// error gizlet(hide error)
function hideError() {
  error.style.display = "none";
  connectCurrency(left, right);
}
// show error
window.addEventListener("offline", () => {
  error.style.display != "none";
  showError("Нет интернета! ");

});

window.addEventListener("online", hideError);

// navbar
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

connectCurrency(left, right);




