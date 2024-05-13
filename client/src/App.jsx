//? styles
import "./App.css";
import Cookies from "universal-cookie";
import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

const cookies = new Cookies();

//? Components
import { ChannelContainer, ChannelListContainer, Auth } from "./components";

//? Constants
const { VITE_STREAM_API_KEY } = import.meta.env;
const client = StreamChat.getInstance(VITE_STREAM_API_KEY);
const authToken = cookies.get("token");

if (authToken) {
	client.connectUser(
		{
			id: cookies.get("userId"),
			name: cookies.get("username"),
			fullname: cookies.get("fullname"),
			image: cookies.get("avatarURL"),
			hashedPassword: cookies.get("hashedPassword"),
			phoneNumber: cookies.get("phoneNumbe")
		},
		authToken
	);
}

const App = () => {
	if (!authToken) return <Auth />;

	//prettier-ignore
	return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer/>
      </Chat>
    </div>
  )
};

export default App;
