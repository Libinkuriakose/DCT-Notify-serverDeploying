import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Employee extends React.Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            departments: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/employees').then((responseFromEmployees) => {
            axios.get('http://localhost:3001/departments').then((responseFromDepartments) => {
                this.setState({
                    employees: responseFromEmployees.data,
                    departments: responseFromDepartments.data
                })
            }) 
        })
    }

    render() {
        return (
            <div>{console.log(this.state.employees, "employee component")}
                {this.state.employees.map((employee, index) => (
                    <li key={index}>
                       <Link to={{pathname:`/employees/${employee._id}`, state: {details: employee, departments: this.state.departments}}}>{employee.bio.firstName}</Link>
                    </li>)
                )}
                <Link to={{pathname:"/employees/new", state:{departments: this.state.departments}}}>Add employee</Link>
            </div>
        )
    }
}

export default Employee;