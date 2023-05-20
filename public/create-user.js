import { addHeader } from "./modules/pageUtils.js";

addHeader();

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	fetch("./create-user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: form.name.value,
			password: form.password.value,
		}),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				window.location.href = "./login.html";
			}
		});
});
