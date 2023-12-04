
import axios from "axios";
import { useState, useEffect } from "react";
import "./ProjectListPage.css";
import ProjectList from "../../components/ProjectList/ProjectList";
import SearchInput from "../../components/SearchInput/SearchInput";
import StatusFilter from "../../components/StatusFilter/StatusFilter";

export default function ProjectListPage () {

    // fetch projects from database
    const [ projects, setProjects ] = useState([]);
    
    // filtered projects from the search input
    const [filteredProjects, setFilteredProjects] = useState([]);

    // filtered projects from the status filter
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

    // Filter the projects based on status input
    
    const handleStatusChange = (selectedStatus) => {
        setFilteredProjectsStatus(projects.filter((project) => project.status === selectedStatus))
    }

    return (
        <div className="project-list-outer-container">
            <h2 className="regular-h2">Project list</h2>
            <div className="search-filter-section">
                <SearchInput projects={projects} onSearch={handleSearch} searchErrorMessage={searchErrorMessage} />
                <StatusFilter projects={projects} onChange={handleStatusChange}/>
            </div>
            <p className="subheader">Sorted by deadline</p>
            <ProjectList projects={projects} setProjects={setProjects} filteredProjects={filteredProjects} filteredProjectsStatus={filteredProjectsStatus}/>
        </div>
    )
}