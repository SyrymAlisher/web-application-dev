import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/'; // Replace with your actual API URL

export const getAllDepartments = () => axios.get(`${API_BASE_URL}departments/`);

export const getAllRoles = () => axios.get(`${API_BASE_URL}roles/`);

export const getEmployeesByDepartment = (deptId) => axios.get(`${API_BASE_URL}employees/department/${deptId}/`);

export const addDepartment = (departmentData) => axios.post(`${API_BASE_URL}adddepartment/`, departmentData, {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken() // Assuming CSRF token is needed
    }
});

export const addRole = (roleData) => axios.post(`${API_BASE_URL}addrole/`, roleData, {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken() // Assuming CSRF token is needed
    }
});

export const addEmployee = (employeeData) => axios.post(`${API_BASE_URL}addemploye/`, employeeData, {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken() // Assuming CSRF token is needed
    }
});

export const deleteDepartment = (deptId) => axios.delete(`${API_BASE_URL}ddelete/${deptId}/`, {
    headers: {
        'X-CSRFToken': getCsrfToken() // Assuming CSRF token is needed
    }
});

export const editDepartment = (deptId, departmentData) => axios.put(`${API_BASE_URL}dedit/${deptId}/`, departmentData, {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken() // Assuming CSRF token is needed
    }
});

const getCsrfToken = () => {
  let csrfToken = '';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
      const [key, value] = cookie.split('=').map(c => c.trim());
      if (key === 'csrftoken') {
          csrfToken = value;
          break;
      }
  }
  return csrfToken;
};
