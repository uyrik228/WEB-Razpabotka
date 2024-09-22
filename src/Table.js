import React from "react";
import './Table.css';

const Table = ({ employees, delEmployee }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Age</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => {
          return (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{employee.age}</td>
              <td>
                <button onClick={() => delEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;