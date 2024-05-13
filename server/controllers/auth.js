const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat");
const crypto = require("crypto");

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
	const { fullname, username, password, phoneNumber } = req.body;

	try {
		const userId = crypto.randomBytes(16).toString("hex");
		const serverClient = connect(api_key, api_secret, app_id);
		const hashedPassword = await bcrypt.hash(password, 10);
		const token = serverClient.createUserToken(userId);
		return res
			.status(200)
			.json({ token, fullname, username, userId, hashedPassword, phoneNumber });
	} catch (error) {
		console.error(error);

		return res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	const serverClient = connect(api_key, api_secret, app_id);
	const client = StreamChat.getInstance(api_key, api_secret);

	const users = await client.queryUsers({ name: username });

	if (!users.length) return res.status(400).json({ message: "User not found" });
	const success = await bcrypt.compare(password, users[0].hashedPassword);
	const token = serverClient.createUserToken(users[0].id);
	if (success) {
		return res.status(200).json({
			token,
			fullname: users[0].fullname,
			username,
			userId: users[0].id
		});
	} else {
		return res.status(500).json({ message: "Incorrect password" });
	}
	try {
	} catch (error) {
		console.error(error);

		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	signup,
	login
};