import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import session from "express-session";

const port = 3000;
const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: "shhhh, very secret",
		cookie: {
			maxAge: 5 * 60 * 1000, // 5 minutes
		},
	})
);

const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
const db = client.db("bank");
const accountCollection = db.collection("accounts");
const userCollection = db.collection("users");

// POST User

app.post("/create-user", async (req, res) => {
	const { name, password } = req.body;
	const hash = await bcrypt.hash(password, 10);

	const user = await userCollection.insertOne({ name, password: hash });
	res.json({
		success: true,
		user,
	});
});

// POST Login

app.post("/login", async (req, res) => {
	const { name, password } = req.body;

	const user = await userCollection.findOne({ name });
	if (user && (await bcrypt.compare(password, user.password))) {
		req.session.user = user.name;
		res.json({
			success: true,
			user: user.name,
		});
	} else {
		res.status(401).json({ error: "Unauthorized" });
	}
});

app.use((req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.status(401).send({ error: "Unauthorized" });
	}
});

// POST Logout

app.post("/logout", async (req, res) => {
	req.session.destroy();
	res.json({
		success: true,
	});
});

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
