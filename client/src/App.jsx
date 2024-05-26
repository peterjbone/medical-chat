//? styles
import "stream-chat-react/dist/css/index.css";
import "./App.css";
import Cookies from "universal-cookie";
import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

const cookies = new Cookies();

//? Components
import { ChannelContainer, ChannelListContainer, Auth } from "./components";

//? Constants
const authToken = cookies.get("token");
//const { VITE_STREAM_API_KEY } = import.meta.env;
const client = StreamChat.getInstance("k2u73sqpcamb");

if (authToken) {
	client.connectUser(
		{
			id: cookies.get("userId"),
			name: cookies.get("username"),
			fullName: cookies.get("fullName"),
			image: cookies.get("avatarURL"),
			hashedPassword: cookies.get("hashedPassword"),
			phoneNumber: cookies.get("phoneNumber")
		},
		authToken
	);
}

const App = () => {
	const [createType, setCreateType] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	if (!authToken) return <Auth />;

	//prettier-ignore
	return (
		<div className="app__wrapper">
			<Chat client={client} theme="team light">
				<ChannelListContainer
					isCreating={isCreating}
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
				/>
				<ChannelContainer
					isCreating={isCreating}
					setIsCreating={setIsCreating}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
          createType={createType}
				/>
			</Chat>
		</div>
	);
};

export default App;
