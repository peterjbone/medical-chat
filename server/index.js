require("dotenv").config(); //? for env variables

const app = require("./app.js");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server raised on port ${PORT}`);
});
