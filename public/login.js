import { addHeader } from "./modules/pageUtils.js";

addHeader();

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	fetch("./login", {
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
				const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
				Cookies.set("user", data.user, {
					expires: inFiveMinutes,
				});
				window.location.href = "./accounts.html";
			}
		});
});
