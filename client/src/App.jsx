//? styles
import "./App.css";

import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

//? Components
import { ChannelContainer, ChannelListContainer, Auth } from "./components";

//? Constants
const apikey = "k2u73sqpcamb";
const client = StreamChat.getInstance(apikey);
const authToken = false;

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
