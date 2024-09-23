import React from "react";
import "./Form.css";
import { useState } from "react";

const Form = ({ handleSubmit, inEmployee }) => {
  const [employee, setEmployee] = useState(inEmployee);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(employee);
    setEmployee(inEmployee);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
      />
      <label htmlFor="surname">Surname</label>
      <input
        type="text"
        name="surname"
        value={employee.surname}
        onChange={handleChange}
      />
      <label htmlFor="age">Age</label>
      <input
        type="number"
        name="age"
        value={employee.age}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;