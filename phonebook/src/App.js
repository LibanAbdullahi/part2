import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
import Notification from "./components/Notification";

import { getPersons, addPerson, deletePerson, updatePerson } from "./api";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const messageType = "success";

  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage({ message: "Success", type: messageType });
    getPersons()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    return () => setMessage(null);
  }, []);

  // filter function
  const handleSearchTermChange = value => {
    setSearchTerm(value);
  };

  const filteredPersons = searchTerm
    ? persons.filter(
        person =>
          person &&
          person.name &&
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  // const handleAddPerson = (name, number) => {
  //   const existingPerson = persons.find(person => person.name === name);
  //   if (existingPerson) {
  //     if (
  //       window.confirm(
  //         `${existingPerson.name} is already in the phonebook, replace the old number with new number?`
  //       )
  //     ) {
  //       updatePerson(existingPerson.id, { number: number })
  //         .then(response => {
  //           setPersons(
  //             persons.map(p =>
  //               p.id === existingPerson.id ? { ...p, number: number } : p
  //             )
  //           );
  //           setMessage(`${existingPerson.name} phone number updated`);
  //         })
  //         .catch(error => {
  //           console.error(error);
  //           setMessage(`Updating ${existingPerson.name} phone number failed`);
  //         });
  //     }
  //     return;
  //   }
  //   addPerson({ id: uuidv4(), name, number })
  //     .then(response => {
  //       setPersons([...persons, { id: response.data.id, name, number }]);
  //       setMessage(`${name} is added to the phonebook`);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage(`Adding ${name} failed`);
  //     });
  // };

  const handleAddPerson = (name, number) => {
    const existingPerson = persons.find(person => person.name === name);
    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already in the phonebook, replace the old number with new number?`
        )
      ) {
        updatePerson(existingPerson.id, { number: number })
          .then(response => {
            setPersons(
              persons.map(p =>
                p.id === existingPerson.id ? { ...p, number: number } : p
              )
            );
            setMessage({
              message: `${existingPerson.name} phone number updated`,
              type: "success",
            });
          })
          .catch(error => {
            console.error(error);
            setMessage({
              message: `Updating ${existingPerson.name} phone number failed`,
              type: "error",
            });
          });
      }
      return;
    }
    addPerson({ id: uuidv4(), name, number })
      .then(response => {
        setPersons([...persons, { id: response.data.id, name, number }]);
        setMessage({
          message: `Added ${name} `,
          type: "success",
        });
      })
      .catch(error => {
        console.error(error);
        setMessage({ message: `Adding ${name} failed`, type: "error" });
      });
  };

  const handleDelete = id => {
    if (window.confirm(`Delete ?`)) {
      const deletedPerson = persons.find(p => p.id === id);
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setMessage({
            message: `Information of ${deletedPerson.name} has been removed from server`,
            type: "error",
          });
        })
        .catch(error => {
          console.error(error);
          setMessage({ message: `Deleting failed`, type: "error" });
        });
    }
  };

  const Persons = ({ persons, handleDelete }) => {
    return (
      <div>
        {persons.map(person => (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {message && (
        <Notification message={message.message} type={message.type} />
      )}

      <h2>Phonebook</h2>
      {/* <Filter
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      /> */}

      <Filter
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />

      <h3>Add a new</h3>
      <PersonForm onAddPerson={handleAddPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
