require("dotenv").config(); //? for env variables

const express = require("express");
const app = express();
const cors = require("cors");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require("twilio")(accountSid, authToken);

//? Importing routers
const authRoutes = require("./routes/auth.js");

//? Middlewares
app.use(cors());
app.use(express.json());

//? Routes
// Test
app.get("/", (req, res) => {
	return res.status(200).send("Your app is in Production! :D");
});
// Autenticación
app.use("/auth", authRoutes);
// SMS
app.post("/", (req, res) => {
	const { message, user: sender, type, members } = req.body;

	if (type === "message.new") {
		members
			.filter((member) => member.user_id !== sender.id)
			.forEach(({ user }) => {
				if (!user.online) {
					twilioClient.messages
						.create({
							body: `You have a new message from ${message.user.fullName} - ${message.text}`,
							messagingServiceSid: messagingServiceSid,
							to: user.phoneNumber
						})
						.then(() => console.log("The message was sent!"))
						.catch((error) => console.log(error));
				}
			});

		return res.status(200).send("Message sent!");
	}

	return res.status(200).send("Not a new message request");
});

module.exports = app;
