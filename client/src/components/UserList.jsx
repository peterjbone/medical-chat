import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../assets";

const ListContainer = ({ children }) => {
	//prettier-ignore
	return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
	const [selected, setSelected] = useState(false);

	function handleSelect() {
		if (selected) {
			setSelectedUsers((prevUsers) =>
				prevUsers.filter((prevUser) => prevUser !== user.id)
			);
		} else {
			setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
		}

		setSelected((prevSelected) => !prevSelected);
	}

	//prettier-ignore
	return (
    <div className="user-item__wrapper" onClick={handleSelect}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{ user.fullName || user.id}</p>
      </div>
      {selected ? (
        <InviteIcon/>
      ) : (
        <div className="user-item__invite-empty"/>
      )}
    </div>
  );
};

//* -------------------- USER LIST COMPONENT -----------------------
const UserList = ({ setSelectedUsers }) => {
	const { client } = useChatContext();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [listEmpty, setListEmpty] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function getUsers() {
			if (loading) return;

			setLoading(true);

			try {
				const res = await client.queryUsers(
					{ id: { $ne: client.userID } },
					{ id: 1 },
					{ limit: 8 }
				);

				if (res.users.length) {
					setUsers(res.users);
				} else {
					setListEmpty(true);
				}
			} catch (error) {
				console.log(error);
				setError(true);
			}

			setLoading(false);
		}
		if (client) getUsers();
	}, []);

	//prettier-ignore
	if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    )
  }

	//prettier-ignore
	if (listEmpty) {
		return (
			<ListContainer>
				<div className="user-list__message">
					No users found.
				</div>
			</ListContainer>
		);
	}

	//prettier-ignore
	return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">
          Loading users...
        </div> 
      ) : (
          users?.map((user, i) => (
            <UserItem
              index={i}
              key={user.id}
              user={user}
              setSelectedUsers={setSelectedUsers}
            />
          ))
      )}
    </ListContainer>
  )
};

export default UserList;
