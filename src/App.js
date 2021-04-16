import React, { useState, useEffect } from "react";
import "./App.css";
import SocialCard from "./components/SocialCard";

function App() {
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            let userData;
            try {
                const response = await fetch(
                    "https://randomuser.me/api/?results=100"
                );
                userData = await response.json();
            } catch (error) {
                console.log(error);
                userData = [];
            }
            setAllUsers(userData.results);
            setUsers(userData.results);
        })();
    }, []);

    const filterCards = (e) => {
        const value = e.target.value.toLowerCase();
        const filteredUsers = allUsers.filter((user) =>
            `${user.name.first} ${user.name.last}`.toLowerCase().includes(value)
        );
        setUsers(filteredUsers);
    };

    return (
        <div className="App">
            <h1>Social Cards</h1>
            <input
                type="text"
                className="search-box"
                onInput={filterCards}
                placeholder="Search..."
            />
            <div className="cards-container">
                {users.map((user, index) => (
                    <SocialCard key={index} userData={user} />
                ))}
            </div>
        </div>
    );
}

export default App;
