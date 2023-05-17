import express from "express";
import { MongoClient, ObjectId } from "mongodb";
const port = 3000;
const app = express();

app.use(express.json());

app.use(express.static("public"));

const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
const db = client.db("bank");
const accountCollection = db.collection("accounts");

// GET accounts
app.get("/accounts", async (req, res) => {
	let accounts = await accountCollection.find({}).toArray();
	res.json(accounts);
});

// GET account:id
app.get("/accounts/:id", async (req, res) => {
	const account = await accountCollection.findOne({ _id: new ObjectId(req.params.id) });
	res.json(account);
});

// PUT withdrawel
app.put("/accounts/:id/withdrawing", async (req, res) => {
	let account = await accountCollection.findOne({ _id: new ObjectId(req.params.id) });

	const withdrawalAmount = req.body.withdrawalAmount;

	if (withdrawalAmount > account.balance) {
		res.json({
			success: false,
			account,
		});
	} else {
		account = {
			...account,
			balance: account.balance - withdrawalAmount,
		};
		await accountCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: account });
		res.json({
			success: true,
			account,
		});
	}
});

// PUT deposit
app.put("/accounts/:id/deposit", async (req, res) => {
	let account = await accountCollection.findOne({ _id: new ObjectId(req.params.id) });

	const depositAmount = req.body.depositAmount;

	account = {
		...account,
		balance: Number(account.balance) + Number(depositAmount),
	};
	await accountCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: account });
	res.json({
		success: true,
		account,
	});
});

// DELETE account

app.delete("/accounts/:id", async (req, res) => {
	await accountCollection.deleteOne({ _id: new ObjectId(req.params.id) });
	res.json({
		success: true,
	});
});

// POST account

app.post("/accounts", async (req, res) => {
	const account = await accountCollection.insertOne(req.body);
	res.json({
		success: true,
		account,
	});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
