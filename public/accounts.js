import { addHeader } from "./modules/pageUtils.js";

addHeader();

const table = document.querySelector("tbody");

fetch("/accounts")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		data.forEach((account) => {
			console.log(account);
			const tr = document.createElement("tr");
			tr.innerHTML = `

            <td>
                <a href="./account.html?id=${account._id}">
                    ${account.name}
                </a>
            </td>
            <td>${account._id}</td>
            <td>${account.balance}</td>
         
           
        `;
			table.append(tr);
		});
	});
