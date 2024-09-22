const EmployeeAPI = {
    employees: [
      { id: 1, name: "Владислав", surname: "Барило", age: "20" },
      { id: 2, name: "Ксения", surname: "Волосач", age: "19" },
      { id: 3, name: "Екатерина", surname: "Гришанкова", age: "18" },
      { id: 4, name: "Владимир", surname: "Орловский", age: "19" },
      { id: 5, name: "Илья", surname: "Доропейко", age: "20" },
      { id: 6, name: "Татьяна", surname:"Дроздовская", age: "20" },
    ],
    all: function () {
      return this.employees;
    },
    get: function (id) {
      const isEmployee = (p) => p.id === id;
      return this.employees.find(isEmployee);
    },
    delete: function (id) {
      const isNotDelEmployee = (p) => p.id !== id;
      this.employees = this.employees.filter(isNotDelEmployee);
      return true;
    },
    add: function (employee) {
      if (!employee.id)
        employee = {
          ...employee,
          id:
            this.employees.reduce((prev, current) => {
              return prev.id > current.id ? prev : current;
            }, 0).id + 1,
        };
      this.employees = [...this.employees, employee];
      return employee;
    },
    update: function (employee) {
      this.get();
      this.employees.shift(employee);
      return employee;
    },
  };
  export default EmployeeAPI;