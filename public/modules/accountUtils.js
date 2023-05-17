export const withdraw = (id, amount) => {
	fetch(`/accounts/${id}/withdrawing`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ withdrawalAmount: amount }),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				window.location.reload();
			} else {
				alert("Insufficient funds");
			}
		});
};

export const deposit = (id, amount) => {
	fetch(`/accounts/${id}/deposit`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ depositAmount: amount }),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				window.location.reload();
			} else {
				alert("Something went wrong");
			}
		});
};

export const deleteAccount = (id) => {
	fetch(`/accounts/${id}`, {
		method: "DELETE",
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				window.location.href = "./accounts.html";
			} else {
				alert("Something went wrong");
			}
		});
};
