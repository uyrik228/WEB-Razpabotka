export const addEmployee = (employee) => ({
    type: 'ADD_EMPLOYEE',
    payload: employee,
  });
  
  export const removeEmployee = (id) => ({
    type: 'REMOVE_EMPLOYEE',
    payload: id,
  });
  
  export const updateEmployee = (employee) => ({
    type: 'UPDATE_EMPLOYEE',
    payload: employee,
  });
  
  export const setEmployees = (employees) => ({
    type: 'SET_EMPLOYEES',
    payload: employees,
  });
  