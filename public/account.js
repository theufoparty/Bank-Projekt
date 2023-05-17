import { addHeader } from "./modules/pageUtils.js";
import { withdraw, deposit, deleteAccount } from "./modules/accountUtils.js";

addHeader();

const id = new URLSearchParams(window.location.search).get("id");

fetch(`/accounts/${id}`)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		document.getElementById("account-name").innerText = `Name: ${data.name}`;
		document.getElementById("account-balance").innerText = `Mängd pengar: ${data.balance}`;
	});

const withdrawalForm = document.getElementById("withdraw");
withdrawalForm.addEventListener("submit", (event) => {
	event.preventDefault();
	withdraw(id, withdrawalForm.withdraw.value);
});

const depositForm = document.getElementById("deposit");
depositForm.addEventListener("submit", (event) => {
	event.preventDefault();
	deposit(id, depositForm.deposit.value);
});

const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", () => {
	if (confirm("Are you sure you want to delete this account?")) {
		deleteAccount(id);
	}
});
