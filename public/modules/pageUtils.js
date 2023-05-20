export const addHeader = () => {
	const user = localStorage.getItem("user");
	const header = document.createElement("header");
	header.innerHTML = `
	    <header class="header">
	    <a href="./" class="logo">Banken</a>
	    <ul class="navlist">
	        <li><a href="./">Home</a></li>

	     ${
					user
						? `<li><a href="./accounts.html">Accounts</a></li>
	        <li><a href="./accounts-create.html">Create Account</a></li>
			<button>Logout</button>`
						: `<li><a href="./login.html">Login</a></li>
						<li><a href="./create-user.html">Create User</a></li>`
				}

			
	    </ul>
	</header>`;

	const logoutButton = header.querySelector("button");
	if (logoutButton) {
		logoutButton.addEventListener("click", () => {
			localStorage.removeItem("user");
			fetch("/logout", {
				method: "POST",
			}).then(() => {
				window.location.href = "/";
			});
		});
	}

	document.body.prepend(header);
};
