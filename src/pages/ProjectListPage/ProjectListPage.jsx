
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

    // Combined projects from both filters
    const [combinedFilteredProjects, setCombinedFilteredProjects ] = useState([])

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
        setFilteredProjects(projects.filter((project) => project.project_title.toLowerCase().includes(searchTerm.toLowerCase())));
        console.log("These are the projects filtered by search", filteredProjects)
    }

    // Filter the projects based on status input 
    const handleStatusChange = (selectedStatus) => {
        setFilteredProjectsStatus(projects.filter((project) => project.status === selectedStatus))
    }

    useEffect(() => {
        console.log("These are the projects filtered by status", filteredProjectsStatus);
        console.log("These are the projects filtered by search", filteredProjects);
    }, [filteredProjectsStatus])

    
    // // Filter the projects based on status input
    // const handleStatusChange = (filteredProjectsStatus) => {
    //     setFilteredProjectsStatus(filteredProjectsStatus)
    // }
//     useEffect(() => {
//     // Fetch projects only when there is no active filtering
//     if (filteredProjects.length === 0 && filteredProjectsStatus.length === 0) {
//       fetchProjects();
//     } else {
//       // Use filter to find projects that are both in filteredProjects and filteredProjectsStatus
//       const combinedFilteredProjects = projects.filter(
//         (project) =>
//           (filteredProjects.length === 0 || filteredProjects.includes(project)) &&
//           (filteredProjectsStatus.length === 0 || filteredProjectsStatus.includes(project.status))
//       );
//       setCombinedFilteredProjects(combinedFilteredProjects);
//     }
//   }, [filteredProjects, filteredProjectsStatus, projects]);

    return (
        <div className="project-list-outer-container">
            <h2 className="regular-h2">Project list</h2>
            <SearchInput projects={projects} onSearch={handleSearch}/>
            <StatusFilter projects={projects} onChange={handleStatusChange}/>
            <ProjectList projects={projects} combinedFilteredProjects={combinedFilteredProjects}/>
        </div>
    )
}