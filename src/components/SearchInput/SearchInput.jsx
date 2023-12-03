import { useState, useEffect } from "react";
import "./SearchInput.css";

export default function SearchInput ({onSearch}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());        
    };
    
    useEffect(() => {
        if (searchTerm !== "") {
            onSearch(searchTerm)
        } else {
            onSearch("");
            // setSearchTerm("");
            // console.log("Search term has been initialized")
        }
    }, [searchTerm]);
   
    return (
        <div className="search-projects-input-container">
            <label className="search-projects-label" htmlFor="search">Browse projects</label>
            <input className="search-projects-input" type="search" placeholder="Project name" value={searchTerm} onChange={handleInputChange} />
        </div>
    )
} 