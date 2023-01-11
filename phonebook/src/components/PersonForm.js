import React from "react";

const PersonForm = ({ onAddPerson }) => {
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");

  const handleSubmit = event => {
    event.preventDefault();
    onAddPerson(name, number);
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input value={number} onChange={e => setNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
