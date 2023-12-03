import { useState } from "react";
import "./SearchInput.css";

export default function SearchInput ({projects, onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        const filteredProjects = projects.filter((project) =>
        project.project_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
        console.log("These are the filtered projects", filteredProjects)
        onSearch(filteredProjects);
    };
    
    return (
        <div className="search-projects-input">
            <label className="search-projects-label" htmlFor="search">Browse projects</label>
            <input className="search-projects-input" type="search" placeholder="Project name" value={searchTerm} onChange={handleInputChange} />
        </div>
    )
} 