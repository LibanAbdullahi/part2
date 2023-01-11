import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getPersons = () => axios.get(baseUrl);

export const addPerson = person =>
  axios.post(baseUrl, person, {
    headers: { "Content-Type": "application/json" },
  });

export const deletePerson = id => axios.delete(`${baseUrl}/${id}`);
export const updatePerson = (id, person) =>
  axios.put(`${baseUrl}/${id}`, person);
