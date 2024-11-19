// document.getElementById('convertBtn').addEventListener('click', function() {
//     const amount = document.getElementById('amount').value;
//     const currencyFrom = document.getElementById('currencyFrom').value;
//     const currencyTo = document.getElementById('currencyTo').value;
//     const resultField = document.getElementById('result');
//     const errorField = document.getElementById('error');

//     if (currencyFrom === currencyTo) {
//         resultField.value = amount;
//         errorField.textContent = '';
//         return;
//     }

//     const url = `https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}`;

//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('API əlçatmazdır');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const rate = data.rates[currencyTo];
//             const convertedAmount = (amount * rate).toFixed(2);
//             resultField.value = convertedAmount;
//             errorField.textContent = '';
//         })
//         .catch(error => {
//             resultField.value = '';
//             errorField.textContent = 'Nəyinsə səhv getdiyi barədə mesaj: ' + error.message;
//         });
// });

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

let left = "RUB";
let right = "USD";

//1 point
function singlePoint(text) { 
    let value = text.value; 
    let parts = text.split('.'); 
    if (parts.length > 2) { 
        value = parts[0] + '.' + parts.slice(1).join(''); 
    } 
    text.value = value;
}
inp1.addEventListener("input",() => {
    inp1.value = inp1.value.replace(/[^0-9.,]/g, '');
    inp1.value =   inp1.value.replace(",", ".");  
    singlePoint(inp1);
})



//only number , .
inp2.addEventListener("input",() => {
    inp2.value = inp2.value.replace(/[^0-9.,]/g, '');
    inp2.value =   inp2.value.replace(",", ".");
    singlePoint(inp2);
})
//click buttons
btnleft.forEach(button => {
    button.addEventListener("click", () => {
      btnleft.forEach(btn => btn.classList.remove("btn1"));
  
      button.classList.add("btn1");
      left = button.textContent;
      connectCurrency(left,right); 
    });
  });
  
  btnright.forEach(button => {
    button.addEventListener("click", () => {
      btnright.forEach(btn => btn.classList.remove("btn2"));
  
      button.classList.add("btn2");
      right = button.textContent;
      connectCurrency(left,right); 
    });
  });
//connect currency
  function connectCurrency(a,b) {
    fetch(`https://v6.exchangerate-api.com/v6/765192b8cac08627c70fec94/latest/${a}`)
    .then(res => res.json())
    .then(response => {
        rate1.textContent = '1 ' + a + ' = ' + response.conversion_rates[b] + ' ' + b ;
      console.log(response.base_code);
      console.log(response.conversion_rates[b]);
    } )
    fetch(`https://v6.exchangerate-api.com/v6/765192b8cac08627c70fec94/latest/${b}`)
    .then(res => res.json())
    .then(response => {
        rate2.textContent = '1 ' + b + ' = ' + response.conversion_rates[a] + ' ' + a ;
      console.log(response.base_code);
      console.log(response.conversion_rates[a]);
    } )
    
    console.log(a);
    console.log(b);
  }

  connectCurrency(left,right);



// // Function to handle button clicks
// function buttonClick(event) {
//     const clickedButton = event.target;
  
//     // Clear the background color of all buttons in both converter sections
//     const allButtons = document.querySelectorAll("button");
//     allButtons.forEach(button => button.style.backgroundColor = "");
  
//     // Set the background color of the clicked button
//     clickedButton.style.backgroundColor = "#a032b3";
//     clickedButton.style.color = "white";
  
//     // ... (rest of the code for API call and result update)
//   }
  
//   // Add event listeners to all buttons
//   document.querySelectorAll("button").forEach(button => {
//     button.addEventListener("click", handleButtonClick);
//   });



// async function fetchExchangeRates() {
//     const response = await fetch(' https://app.exchangerate-api.com/activate/3da245dcac307d6206aad45003/USD/RUB'); // Replace with your API endpoint
//     const data = await response.json();
//     return data.rates;
// }

// async function convert() {
//     const amount = parseFloat(document.getElementById('amount').value.replace(',', '.'));
//     const fromCurrency = document.getElementById('fromCurrency').value;
//     const toCurrency = document.getElementById('toCurrency').value;

//     if (!isNaN(amount)) {
//         const rates = await fetchExchangeRates();
//         const rate = rates[toCurrency] / rates[fromCurrency];
//         const result = amount * rate;
//         document.getElementById('result').value = result.toFixed(2);
//     } else {
//         alert("Please enter a valid number.");
//     }
// }

// // Optional: Handle comma input
// document.getElementById('amount').addEventListener('input', function() {
//     this.value = this.value.replace(/,/g, '.');
// });