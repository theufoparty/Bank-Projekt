export const addHeader = () => {
	const header = document.createElement("header");
	header.innerHTML = `
	    <header class="header">
	    <a href="./" class="logo">Banken</a>
	    <ul class="navlist">
	        <li><a href="./">Home</a></li>
	        <li><a href="./accounts.html">Accounts</a></li>
	        <li><a href="./accounts-create.html">Create Account</a></li>
	    </ul>
	</header>`;
	document.body.prepend(header);
};
