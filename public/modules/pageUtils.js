export const addHeader = () => {
	const user = Cookies.get("user");
	const header = document.createElement("header");
	header.innerHTML = `
	    <header class="header">
	    <a href="./" class="logo">THE BANK</a>
	    <ul class="navlist">
	        <li><a href="./">HOME</a></li>

	     ${
					user
						? `<li><a href="./accounts.html">ACCOUNTS</a></li>
	        <li><a href="./accounts-create.html">CREATE ACCOUNT</a></li>
			<li><button class="logout-button">LOGOUT</button></li>`
						: `<li><a href="./login.html">LOGIN</a></li>
						<li><a href="./create-user.html">CREATE USER</a></li>`
				}

			
	    </ul>
	</header>`;

	const logoutButton = header.querySelector("button");
	if (logoutButton) {
		logoutButton.addEventListener("click", () => {
			Cookies.remove("user");
			fetch("/logout", {
				method: "POST",
			}).then(() => {
				window.location.href = "/";
			});
		});
	}

	document.body.prepend(header);
};
