const apiKey = "7a2ffef96fb171981bc27644";
const dropDownList = document.querySelectorAll(".droplist select");
let fromList = document.querySelector(".from select");
let toList = document.querySelector(".to select");
const generateRateBtn = document.querySelector("form button");
const amount = document.querySelector(".amount input");
const exchangeRateMessage = document.querySelector(".exchange-rate-message");
let exchangeIcon = document.querySelector(".fa-exchange-alt");
let selected;
const updateFlag = (event) => {
  for (let currency_code in country_list) {
    if (currency_code === event.value) {
      let img = event.parentElement.querySelector("img");
      img.src = `https://flagsapi.com/${country_list[currency_code]}/flat/64.png`;
    }
  }
};

const getExchangeRate = async () => {
    generateRateBtn.innerText = "Getting Exchange Rate...";
    generateRateBtn.classList.add("disabled");
  const amountValue = amount.value;
  if (amountValue < 0) {
    exchangeRateMessage.innerText = "Please Enter Valid Amount...";
  } else {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromList.value}`
    );
    const data = await res.json();
    const totalAmount = (
      amountValue * data.conversion_rates[toList.value]
    ).toFixed(2);
    exchangeRateMessage.innerText = `${amountValue} ${fromList.value}  =  ${totalAmount} ${toList.value}`;
}
generateRateBtn.innerText = "Get Exchange Rate";
generateRateBtn.classList.remove("disabled");
};

for (let i = 0; i < dropDownList.length; i++) {
  for (let currency_code in country_list) {
    if (i == 0) {
      selected = currency_code === "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code === "INR" ? "selected" : "";
    }
    let option = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropDownList[i].insertAdjacentHTML("beforeend", option);
  }
  dropDownList[i].addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

generateRateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

exchangeIcon.addEventListener("click",(e)=>{
    let tempValue = fromList.value; //which becomes USD here
    fromList.value = toList.value; // which becomes INR here
    toList.value = tempValue; // which becomes USD here
    getExchangeRate();
    // updateFlag(e.target);
});
// updateFlag();
// insertAdjacentHTML
getExchangeRate();
