import React, { useEffect, useState } from 'react';
import { getAllRoles } from '../services/apiService';

function RoleList() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getAllRoles()
      .then(response => setRoles(response.data))
      .catch(error => console.error('Error fetching roles:', error));
  }, []);

  return (
    <div>
      <h2>Roles</h2>
      <ul>
        {roles.map(role => <li key={role.id}>{role.r_name}</li>)}
      </ul>
    </div>
  );
}

export default RoleList;
