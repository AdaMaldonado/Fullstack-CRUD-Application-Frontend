import React, { useContext } from "react";
import StudentCard from "./StudentCard";
import { Link, useLocation } from "react-router-dom";
import { StudentsContext } from "../contexts/studentsContext";

/* StudentCard container */

export default function Students() {
    const location = useLocation();
    const studentsView = location.pathname === '/students';
    const students = useContext(StudentsContext).students;
    const loading = students[-1];

    return (
        <>
            {!loading && studentsView && <div className="students-view">
                {Object.keys(students).length === 0 && <h1>The are currently no students in the database :(</h1>}
                {Object.keys(students).length > 0 && <h1>Here are all the students!</h1>}
                <Link to={`/students/add`} className='button-link'>
                    <button type="button">
                        Add Student
                    </button>
                </Link>
                <div className="student-cards">
                    {students && Object.keys(students).map(key => <StudentCard className={'students-view-student-card'} key={students[key].id} student={students[key]} />)}
                </div>
            </div>}
        </>
    )
}