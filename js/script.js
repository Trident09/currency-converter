const dropList = document.querySelectorAll(".drop-list select"),
	fromCurrency = document.querySelector(".from select"),
	toCurrency = document.querySelector(".to select"),
	getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
	for (currency_code in country_code) {
		let selected =
			(i === 0 && currency_code === "USD") ||
			(i === 1 && currency_code === "GBP")
				? "selected"
				: "";
		let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
		dropList[i].insertAdjacentHTML("beforeend", optionTag);
	}
	dropList[i].addEventListener("change", (e) => {
		loadFlag(e.target);
	});
}

function loadFlag(element) {
	for (code in country_code) {
		if (code == element.value) {
			let imgTag = element.parentElement.querySelector("img");
			imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
		}
	}
}

window.addEventListener("load", (e) => {
	getExchangeRate();
});

getButton.addEventListener("click", (e) => {
	e.preventDefault();
	getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
	let tempCode = fromCurrency.value;
	fromCurrency.value = toCurrency.value;
	toCurrency.value = tempCode;
	loadFlag(fromCurrency);
	loadFlag(toCurrency);
	getExchangeRate();
});

function getExchangeRate() {
	const amount = document.querySelector(".amount input");
	const exchangeRateTxt = document.querySelector(".exchange-rate");
	let amountVal = amount.value;
	if (amountVal == "" || amountVal == "0") {
		amount.value = "1";
		amountVal = 1;
	}
	exchangeRateTxt.innerText = "Getting exchange rate...";
	let url = `https://v6.exchangerate-api.com/v6/53ebaa1e8f745f515cda6b2f/latest/${fromCurrency.value}`;
	fetch(url)
		.then((response) => response.json())
		.then((result) => {
			let exchangeRate = result.conversion_rates[toCurrency.value];
			let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
			exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
		})
		.catch(() => {
			exchangeRateTxt.innerText = "Something went wrong";
		});
}
