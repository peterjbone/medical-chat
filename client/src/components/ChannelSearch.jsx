import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets";

const ChannelSearch = () => {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);

	async function getChannels(text) {
		try {
			//todo: fetch channels
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
		</div>
	);
};

export default ChannelSearch;
