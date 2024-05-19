import { useEffect, useState } from "react";
import axios from "axios";
import  "./Home.css";

export default function Home(){

    const[employeeData, setEmployeeData] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const maxRecords = 10;

    const lastIndexOfEmployee = currentPage * maxRecords;
    const firstIndexOfEmployee = lastIndexOfEmployee - maxRecords;
    const filteredEmployees = employeeData.slice(firstIndexOfEmployee, lastIndexOfEmployee);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(employeeData.length / maxRecords); i++) {
        pageNumbers.push(i);
    }




    const apiUrl = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    useEffect(() => {
        axios.get(apiUrl).then((response) => setEmployeeData(response.data)).catch((error) => alert("failed to fetch data")); 
    }, []);

    const handleNext = () => {
        setCurrentPage((prev) => prev < pageNumbers.length ? prev + 1 : prev );
    };

    const handlePrevious = () => {
        setCurrentPage((prev) => prev > 1 ? prev - 1 : prev);
    }


    return(
        <div className="employeeTable">
            <h1>Employee Data Table</h1>
            <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => 
                        (
                            <tr>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                            </tr>
                        )  
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button className="button" onClick={handlePrevious}>
                    Previous
                </button>
                <div className="pageNumber">{currentPage}</div>
                <button className="button" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}