import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { addEmployee } from '../services/apiService';

function Add({ setEmployees, setIsAdding }) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [salary, setSalary] = useState('');
    const [bonus, setBonus] = useState('');
    const [dept, setDept] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [hiredDate, setHiredDate] = useState('');

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    const handleAdd = e => {
        e.preventDefault();
        if (!fname || !lname || !salary || !bonus || !dept || !phone || !role || !hiredDate) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const newEmployee = {
            fname, lname, salary, bonus, dept, phone, role, hired_date: hiredDate
        };

        addEmployee(newEmployee)
            .then(response => {
                setEmployees(prev => [...prev, response.data]);
                setIsAdding(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: `${fname} ${lname}'s data has been added.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Failed to add employee:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add employee.',
                    showConfirmButton: true
                });
            });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
                {/* fname */}
                <label htmlFor="fname">First Name</label>
                <input id="fname" type="text" ref={textInput} value={fname} onChange={e => setFname(e.target.value)} />
                {/* lname */}
                <label htmlFor="lname">Last Name</label>
                <input id="lname" type="text" value={lname} onChange={e => setLname(e.target.value)} />
                {/* salary */}
                <label htmlFor="salary">Salary</label>
                <input id="salary" type="number" value={salary} onChange={e => setSalary(e.target.value)} />
                {/* bonus */}
                <label htmlFor="bonus">Bonus</label>
                <input id="bonus" type="number" value={bonus} onChange={e => setBonus(e.target.value)} />
                {/* dept */}
                <label htmlFor="dept">Department</label>
                <input id="dept" type="number" value={dept} onChange={e => setDept(e.target.value)} />
                {/* phone */}
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                {/* role */}
                <label htmlFor="role">Role</label>
                <input id="role" type="number" value={role} onChange={e => setRole(e.target.value)} />
                {/* hiredDate */}
                <label htmlFor="hiredDate">Hired Date</label>
                <input id="hiredDate" type="date" value={hiredDate} onChange={e => setHiredDate(e.target.value)} />

                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" />
                    <input style={{ marginLeft: '12px' }} className="muted-button" type="button" value="Cancel" onClick={() => setIsAdding(false)} />
                </div>
            </form>
        </div>
    );
}

export default Add;
