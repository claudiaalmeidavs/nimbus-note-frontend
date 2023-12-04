import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./EditProject.css"
import EditProjectForm from "../../components/EditProjectForm/EditProjectForm";

export default function EditProject () {

    // fetch projects from database

    const [ project, setProject ] = useState([]);
    const {id} = useParams();

    const fetchProjects = () => {
        axios.get(`http://localhost:5000/projects/${id}`)
        .then((response) => {
            console.log(response.data[0]);
            setProject(response.data[0])
        })
        .catch((error) => {
            console.error("Error fetching project: ", error);
        })
    }

    useEffect(() => {
        fetchProjects();
        console.log("Infinite edit")
    }, []);

    return (
        <div className="project-list-outer-container">
            {project ? (<div><EditProjectForm id={id} project={project}/> </div>) : <div>No projects detected</div>}
        </div>
    )
}