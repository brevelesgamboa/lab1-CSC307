// src/MyApp.jsx
import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    // find the ID of the person we want to delete
    const personToDelete = characters[index];
    const idToDelete = personToDelete.id;

    // send the DELETE request to backend
    fetch(`http://localhost:8000/users/${idToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        // 204 successful
        if (response.status === 204) {
          const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
        } else {
          console.log("Failed to delete user on backend!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        // update the state if the response status is 201
        if (response.status === 201) {
          // parse JSON to get the object with the new ID
          response.json().then((newUser) => {
            setCharacters([...characters, newUser]);
          });
        } else {
          // do not update the state
          console.log("Error creating user!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;