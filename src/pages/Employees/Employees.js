import React, { useState } from "react";
import Form from "./components/Form";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeAPI from "../../api/service";

const initialEmployees = EmployeeAPI.all();

const Employees = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const initialEmployee = { name: '', surname: '', age: '' };

    const handleSubmit = (newEmployee) => {
        setEmployees([...employees, { ...newEmployee, id: employees.length }]);
    };

    const delEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    return (
        <div>
            <Form handleSubmit={handleSubmit} inEmployee={initialEmployee} />
            <EmployeeTable employees={employees} delEmployee={delEmployee} />
        </div>
    );
};

export default Employees;
