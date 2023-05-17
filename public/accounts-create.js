import { addHeader } from "./modules/pageUtils.js";

addHeader();

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	fetch("./accounts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: form.name.value,
			balance: form.amount.value,
		}),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				window.location.href = "./accounts.html";
			}
		});
});
