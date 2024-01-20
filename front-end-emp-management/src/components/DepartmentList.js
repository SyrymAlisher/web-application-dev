import React, { useEffect, useState } from 'react';
import { getAllDepartments } from '../services/apiService';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments()
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map(department => <li key={department.id}>{department.name}</li>)}
      </ul>
    </div>
  );
}

export default DepartmentList;
