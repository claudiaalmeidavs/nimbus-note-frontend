
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


    const fetchProjects = () => {
        axios.get("http://localhost:5000/projects")
        .then((response) => {
            setProjects(response.data);
        })
        .catch((error) => {
            console.error("Error fetching projects: ", error);
        })
    }

    useEffect(() => {
        fetchProjects();
        console.log("Infinite fetch?")
      }, []);

    // Filter the projects based on search input and set error message if no projects match search    
    const [searchErrorMessage, setSearchErrorMessage] = useState(false);

    const handleSearch = (searchTerm) => {
        if (searchTerm !== "") {
            const projectSearchMatch = projects.filter((project) => project.project_title.toLowerCase().includes(searchTerm.toLowerCase()));
            if (projectSearchMatch.length > 0) {
                setFilteredProjects(projectSearchMatch);
            } else {
                setSearchErrorMessage(true);
                setTimeout(() => {
                    setSearchErrorMessage(false);
                }, 4000);
                
            }
        } else {
            setFilteredProjects([]);
        }
    }

    // Filter the projects based on status input and set error message in case no projects match
    
    const handleStatusChange = (selectedStatus) => {
        setFilteredProjectsStatus(projects.filter((project) => project.status === selectedStatus))
    }

    useEffect(() => {
        console.log("These are the projects filtered by status", filteredProjectsStatus);
        console.log("These are the projects filtered by search", filteredProjects);
    }, [filteredProjectsStatus, filteredProjects])

    return (
        <div className="project-list-outer-container">
            <h2 className="regular-h2">Project list</h2>
            <div className="search-filter-section">
                <SearchInput projects={projects} onSearch={handleSearch} searchErrorMessage={searchErrorMessage} />
                <StatusFilter projects={projects} onChange={handleStatusChange}/>
            </div>
            <ProjectList projects={projects} setProjects={setProjects} filteredProjects={filteredProjects} filteredProjectsStatus={filteredProjectsStatus}/>
        </div>
    )
}