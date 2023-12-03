
import axios from "axios";
import { useState, useEffect } from "react";
import "./ProjectListPage.css";
import ProjectList from "../../components/ProjectList/ProjectList";
import SearchInput from "../../components/SearchInput/SearchInput";
import StatusFilter from "../../components/StatusFilter/StatusFilter";

export default function ProjectListPage () {

    // fetch projects from database
    const [ projects, setProjects ] = useState([]);
    
    //filtered projects from the search input
    const [filteredProjects, setFilteredProjects] = useState([]);

    // Filtered projects from the status filter
    const [filteredProjectsStatus, setFilteredProjectsStatus ] = useState([]);

    // // Combined projects from both filters
    // const [combinedFilteredProjects, setCombinedFilteredProjects ] = useState([])

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
    const handleSearch = (searchTerm) => {
        if (searchTerm !== "") {
            setFilteredProjects(projects.filter((project) => project.project_title.toLowerCase().includes(searchTerm.toLowerCase())));
            console.log("Search term", searchTerm);
        } else {
            setFilteredProjects([]);
            console.log("Search term", searchTerm);
        }
    }

    // Filter the projects based on status input 
    const handleStatusChange = (selectedStatus) => {
        setFilteredProjectsStatus(projects.filter((project) => project.status === selectedStatus))
    }

    // useEffect(() => {
    //     console.log("These are the projects filtered by status", filteredProjectsStatus);
    //     console.log("These are the projects filtered by search", filteredProjects);
    // }, [filteredProjectsStatus])

    return (
        <div className="project-list-outer-container">
            <h2 className="regular-h2">Project list</h2>
            <SearchInput projects={projects} onSearch={handleSearch}/>
            <StatusFilter projects={projects} onChange={handleStatusChange}/>
            <ProjectList projects={projects} filteredProjects={filteredProjects} filteredProjectsStatus={filteredProjectsStatus}/>
        </div>
    )
}