import { useState, useEffect } from "react";
import "./SearchInput.css";

export default function SearchInput ({onSearch, searchErrorMessage}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());        
    };
    
    useEffect(() => {
        if (searchTerm !== "") {
            onSearch(searchTerm)
            console.log("infinite search")
        } else {
            onSearch("");
            console.log("infinite search")
        }
    }, [searchTerm]);
   
    return (
        <div className="search-projects-input-container">
            <label className="search-projects-label" htmlFor="search">Browse projects</label>
            <input className="search-projects-input" type="search" placeholder="Project name" value={searchTerm} onChange={handleInputChange} />
            <div className="search-error-message">{ searchErrorMessage ? <div>No projects match search</div> : null }</div>
        </div>
    )
} 