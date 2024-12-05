// const apiKey = "7a2ffef96fb171981bc27644";
// const dropDownList = document.querySelectorAll(".droplist select");
// let fromList = document.querySelector(".from select");
// let toList = document.querySelector(".to select");
// const generateRateBtn = document.querySelector("form button");
// const amount = document.querySelector(".amount input");
// const exchangeRateMessage = document.querySelector(".exchange-rate-message");
// let exchangeIcon = document.querySelector(".fa-exchange-alt");
// let selected;
// const updateFlag = (event) => {
//   for (let currency_code in country_list) {
//     if (currency_code === event.value) {
//       let img = event.parentElement.querySelector("img");
//       img.src = `https://flagsapi.com/${country_list[currency_code]}/flat/64.png`;
//     }
//   }
// };

// const getExchangeRate = async () => {
//     generateRateBtn.innerText = "Getting Exchange Rate...";
//     generateRateBtn.classList.add("disabled");
//   const amountValue = amount.value;
//   if (amountValue < 0) {
//     exchangeRateMessage.innerText = "Please Enter Valid Amount...";
//   } else {
//     const res = await fetch(
//       `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromList.value}`
//     );
//     const data = await res.json();
//     const totalAmount = (
//       amountValue * data.conversion_rates[toList.value]
//     ).toFixed(2);
//     exchangeRateMessage.innerText = `${amountValue} ${fromList.value}  =  ${totalAmount} ${toList.value}`;
// }
// generateRateBtn.innerText = "Get Exchange Rate";
// generateRateBtn.classList.remove("disabled");
// };

// for (let i = 0; i < dropDownList.length; i++) {
//   for (let currency_code in country_list) {
//     if (i == 0) {
//       selected = currency_code === "USD" ? "selected" : "";
//     } else if (i == 1) {
//       selected = currency_code === "INR" ? "selected" : "";
//     }
//     let option = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
//     dropDownList[i].insertAdjacentHTML("beforeend", option);
//   }
//   dropDownList[i].addEventListener("change", (e) => {
//     updateFlag(e.target);
//   });
// }

// generateRateBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   getExchangeRate();
// });

// exchangeIcon.addEventListener("click",(e)=>{
//     let tempValue = fromList.value; //which becomes USD here
//     fromList.value = toList.value; // which becomes INR here
//     toList.value = tempValue; // which becomes USD here
//     getExchangeRate();
//     // updateFlag(e.target);
// });
// // updateFlag();
// // insertAdjacentHTML
// getExchangeRate();


const dropDowns = document.querySelectorAll(".droplist select");
const fromDropdown = document.querySelector(".from select");
const toDropdown = document.querySelector(".to select");
const getExchangeRateBtn = document.querySelector("form button");
const exchangeRateMessage = document.querySelector(".exchange-rate-message");
let amount = document.querySelector(".amount input");
const exchangeIcon = document.querySelector(".fa-exchange-alt");
let selected;

const apiKey = "7a2ffef96fb171981bc27644";

//to update the flag when options are selected
const updateFlag = (from, to) => {
  let fromValue = country_list[from];
  let toValue = country_list[to];

  let fromFlag = document.querySelector(".from img");
  let toFlag = document.querySelector(".to img");

  fromFlag.src = `https://flagsapi.com/${fromValue}/flat/64.png`;
  toFlag.src = `https://flagsapi.com/${toValue}/flat/64.png`;
};

// appending dropdowns to the UI

for (let i = 0; i < dropDowns.length; i++) {
  for (let currency_code in country_list) {
    if (i == 0) {
      selected = currency_code === "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code === "INR" ? "selected" : "";
    }
    let option = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
    dropDowns[i].insertAdjacentHTML("beforeend", option);
  }
  // selecting each dropdown and adding an event listener to each dropdown
  dropDowns.forEach((dropdown) => {
    dropdown.addEventListener("change", () => {
      const fromDropdownValue = fromDropdown.value;
      const toDropdownValue = toDropdown.value;
      updateFlag(fromDropdownValue, toDropdownValue);
    });
  });
}

const getExchangeRate = async () => {
  let amountValue = amount.value;
  getExchangeRateBtn.innerText = "Getting Exchange Rate...🫰";
  getExchangeRateBtn.classList.add("disabled");
  if (amountValue < 0) {
    exchangeRateMessage.innerText = "Getting Exchange Rate...🫰";
    exchangeRateMessage.innerText = "Please Enter Valid Amount...👍";
  } else {
    exchangeRateMessage.innerText = "Getting Exchange Rate...🫰";
    const fromDropdownValue = fromDropdown.value;
    const toDropdownValue = toDropdown.value;
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromDropdownValue}`
    );
    const data = await res.json();
    exchangeRateMessage.innerText = `${amountValue} ${fromDropdownValue} = ${(
      amountValue * data.conversion_rates[toDropdownValue]
    ).toFixed(2)} ${toDropdownValue}`;
    //   console.log(`${amountValue} ${fromDropdownValue} = 84.75 ${toDropdownValue}`);
  }
  getExchangeRateBtn.innerText = "Get Exchange Rate";
  getExchangeRateBtn.classList.remove("disabled");

};

getExchangeRateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

exchangeIcon.addEventListener("click",()=>{
    let tempValue = fromDropdown.value;
    fromDropdown.value = toDropdown.value;
    toDropdown.value = tempValue;
    getExchangeRate();
    updateFlag(fromDropdown.value,toDropdown.value);
})

getExchangeRate();
