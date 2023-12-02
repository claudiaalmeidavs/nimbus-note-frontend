
import axios from "axios";
import { useState, useEffect } from "react";
import "./ProjectListPage.css";
import ProjectList from "../../components/ProjectList/ProjectList";

export default function ProjectListPage () {

    // fetch projects from database

    const [ projects, setProjects ] = useState([]);

    const fetchProjects = () => {
        axios.get("http://localhost:5000/projects")
        .then((response) => {
            console.log(response.data);
            setProjects(response.data)
        })
        .catch((error) => {
            console.error("Error fetching projects: ", error);
        })
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="project-list-outer-container">
            {projects ? (<div><ProjectList projects={projects}/> </div>) : <div>No projects detected</div>}
        </div>
    )
}