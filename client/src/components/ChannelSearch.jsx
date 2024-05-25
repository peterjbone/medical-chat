import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets";

import { ResultsDropdown } from "./";

const ChannelSearch = ({ setToggleContainer }) => {
	const { client, setActiveChannel } = useChatContext();
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [teamChannels, setTeamChannels] = useState([]);
	const [directChannels, setDirectChannels] = useState([]);

	useEffect(() => {
		if (!query) {
			setTeamChannels([]);
			setDirectChannels([]);
		}
	}, [query]);

	async function getChannels(text) {
		try {
			const channelResponse = client.queryChannels({
				type: "team",
				name: { $autocomplete: text },
				members: { $in: [client.userID] }
			});
			const userResponse = client.queryUsers({
				id: { $ne: client.userID },
				name: { $autocomplete: text }
			});

			const [channels, { users }] = await Promise.all([
				channelResponse,
				userResponse
			]);

			if (channels.length) setTeamChannels(channels);
			if (users.length) setDirectChannels(users);
		} catch (error) {
			setQuery("");
		}
	}

	function onSearch(e) {
		e.preventDefault();

		setLoading(true);
		setQuery(e.target.value);
		getChannels(e.target.value);
	}

	function setChannel(channel) {
		setQuery(" ");
		setActiveChannel(channel);
	}

	//prettier-ignore
	return (
		<div className="channel-search__container">
			<div className="channel-search__wrapper">
				<div className="channel-search__icon">
					<SearchIcon />
				</div>
        <input
          className="channel-search__input__text"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
		</div>
	);
};

export default ChannelSearch;
