import React, { useContext } from 'react';
import {  useParams, useNavigate, Link } from 'react-router-dom';
import StudentCard from './StudentCard';
import { CampusesContext } from '../contexts/campusesContext';
import { StudentsContext } from '../contexts/studentsContext';

/* Individual Campus profile component. I (Marcin) decided to write some hacky logic here to make sure that the app doesn't break.
The API data is fetched only by the context managers and that state is what the user sees at all times. Since a fetch call is wrapped in useEffect(),
 it will not run immediately when the App is rendered, but with a slight delay. As such, I ran into some problems where
  - if entered directly via /campuses/:id or /students/:id - the profile pages would try to grab
data from the respective context that *wasn't there yet*, since the context manager did not yet establish its state. 

So what's the hacky part? Lines 19-27 define a procedure that initially loads a placeholder student (with id -1 that can not exist in the database).
While that dummy profile is in play, nothing is rendered (loading boolean that effectively blocks any rendering). Once the context manager settles in,
it will rerender the Campus component, now with a working set of campuses to work with. */

export default function Campus() {
    const params = useParams();
    const navigate = useNavigate();
    const id = Number(params.id);
    const placeholderImage = 'https://commonlook.com/wp-content/uploads/2019/05/placeholder.jpg'
    const placeholderCampus = useContext(CampusesContext)?.campuses[-1];
    const campusesContext = useContext(CampusesContext)?.campuses[id];
    
    const campus = campusesContext ? campusesContext : placeholderCampus; 
    const dCampus = useContext(CampusesContext).deleteCampus;
    const cStudents = useContext(StudentsContext).getByCampus;
    const campusStudents = getStudents();
    const loading = campus.id === -1
    const noStudentsOnCampus = Object.keys(campusStudents).length === 0

    function deleteCampus() {
        dCampus(id);
    }
    
    function getStudents() {
        return cStudents(id);
    }
    
    function link(to, contents) {
        return (<Link to={to} className='button-link'>{contents}</Link>)
    }

    return (
        <>
            {!loading && 
                <div className="campus-view">
                    <div className='campus-view-main'>
                        <div className='campus-view-left'>
                            <img src={campus.imageUrl ? campus.imageUrl : placeholderImage} alt={`${campus.name}`} />
                            <div className='campus-buttons'>
                                {link(`/campuses/${campus.id}/edit`, <button type="button">Edit Campus</button>)}
                                <button name="delete" value="delete" onClick={() => {
                                    navigate('/campuses'); 
                                    deleteCampus();
                                }}>Delete Campus</button>
                                {link(`/campuses`, <button type="button">Return to Campuses</button>)}
                            </div>
                        </div>
                        <div className='campus-info'>
                            <h1>{campus.name}</h1>
                            <h3>{campus.address}</h3>
                            <p>{campus.description}</p>
                        </div>
                    </div>
                    <div className='campus-students'>
                        <div className='campus-students-text'>
                            {noStudentsOnCampus && <h1>No students are associated with this campus.</h1>}
                            {!noStudentsOnCampus && <h1>Students associated with this campus:</h1>}
                        </div>
                        <div className='campus-students-cards'>
                            {campusStudents && Object.keys(campusStudents).map(key => <StudentCard className={'campus-students-card'} key={campusStudents[key].id} student={campusStudents[key]} />)}
                        </div>
                    </div>
                </div>}
        </>
    )
}