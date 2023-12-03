
import axios from "axios";
import { useState, useEffect } from "react";
import "./ProjectListPage.css";
import ProjectList from "../../components/ProjectList/ProjectList";
import SearchInput from "../../components/SearchInput/SearchInput";

export default function ProjectListPage () {

    // fetch projects from database
    const [ projects, setProjects ] = useState([]);
    
    //filtered projects from the search input
    const [filteredProjects, setFilteredProjects] = useState([]);

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

    // Filter the projects based on search input
    const handleSearch = (filteredProjects) => {
        setFilteredProjects(filteredProjects);
    }

    return (
        <div className="project-list-outer-container">
            <h2 className="regular-h2">Project list</h2>
            <SearchInput projects={projects} onSearch={handleSearch}/>
            <ProjectList projects={projects} filteredProjects={filteredProjects}/>
        </div>
    )
}