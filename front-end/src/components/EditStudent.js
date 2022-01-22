import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "axios";

export default function EditStudent() {
    const location = useLocation();
    const { student, origin } = location.state;
    const [firstName, setFirstName] = useState(student.firstName);
    const [lastName, setLastName] = useState(student.lastName);
    const [imageUrl, setImageUrl] = useState(student.imageUrl);
    const [email, setEmail] = useState(student.email);
    const [gpa, setGpa] = useState(student.gpa);
    
    async function editStudent() {
        await axios.put('https://ttp-college-db.herokuapp.com/students', {
            id : student.id,
            firstName : firstName,
            lastName : lastName,
            imageUrl : imageUrl,
            email : email,
            gpa : gpa
        })
    }
    
    let navigate = useNavigate();
    return (
        <form className='add-student-form' 
            onSubmit={async e => {
                    e.preventDefault();
                    await editStudent();
                    navigate(origin);
                }
            }>
            <label>
                First Name: <br></br><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <br></br>
            <label>
                Last Name: <br></br><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <br></br>
            <label>
                Image URL (*.png,*.jpg,*.gif):
                <br></br>
                <input 
                    type="URL"
                    pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)"  
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                />
            </label>
            <br></br>
            <label>
                Email: <br></br><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br></br>
            <label>
                GPA: <br></br><input type="number" min="0" max="4" step="0.1" value={gpa} onChange={(e) => setGpa(Number(e.target.value))} />
            </label>
            <br></br>
            <input className = "submit-button" type="submit" value="Submit" />
        </form>
    )
}