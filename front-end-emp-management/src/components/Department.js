import React, { useState, useEffect } from 'react';
import { getAllDepartments, addDepartment, editDepartment, deleteDepartment } from '../services/apiService';

function Department() {
    const [departments, setDepartments] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [departmentId, setDepartmentId] = useState(0);

    const refreshList = () => {
        getAllDepartments()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    };

    useEffect(() => {
        refreshList();
    }, []);

    const addClick = () => {
        setModalTitle("Add Department");
        setDepartmentId(0);
        setDepartmentName("");
    };

    const editClick = (dep) => {
        setModalTitle("Edit Department");
        setDepartmentId(dep.DepartmentId);
        setDepartmentName(dep.DepartmentName);
    };

    const createClick = () => {
        addDepartment({ DepartmentName: departmentName })
            .then((result) => {
                alert('Department added');
                refreshList();
            })
            .catch((error) => {
                alert('Failed');
                console.error('Create error:', error);
            });
    };

    const updateClick = () => {
        editDepartment(departmentId, { DepartmentName: departmentName })
            .then((result) => {
                alert('Department updated');
                refreshList();
            })
            .catch((error) => {
                alert('Failed');
                console.error('Update error:', error);
            });
    };

    const deleteClick = (id) => {
        if (window.confirm('Are you sure?')) {
            deleteDepartment(id)
                .then((result) => {
                    alert('Department deleted');
                    refreshList();
                })
                .catch((error) => {
                    alert('Failed');
                    console.error('Delete error:', error);
                });
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary m-2" onClick={() => addClick()}>
                Add Department
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(dep => (
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>
                                <button type="button" className="btn btn-light mr-1" onClick={() => editClick(dep)}>
                                    Edit
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => deleteClick(dep.DepartmentId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal code for Add/Edit Department */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Department Name</span>
                                <input type="text" className="form-control" value={departmentName} onChange={e => setDepartmentName(e.target.value)} />
                            </div>

                            {departmentId === 0 ?
                                <button type="button" className="btn btn-primary float-start" onClick={() => createClick()}>
                                    Create
                                </button>
                                : null}

                            {departmentId !== 0 ?
                                <button type="button" className="btn btn-primary float-start" onClick={() => updateClick()}>
                                    Update
                                </button>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Department;
