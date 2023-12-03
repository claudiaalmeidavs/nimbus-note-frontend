import "./StatusFilter.css";
import { useState, useEffect } from "react";

export default function StatusFilter ({onChange}) {
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleFilterChange = (event) => {
        setSelectedStatus(event.target.value);
    }

    useEffect(() => {
        if (selectedStatus !== "") {
            onChange(selectedStatus);
            console.log("This is the current status", selectedStatus)
        }
    }, [selectedStatus]);

    return (
        <div className="status-filter-container">
            <label className="filter-projects-label" htmlFor="search">Browse projects</label>
                <input type="radio" name="status" value="Not started" onChange={handleFilterChange}/>
                <label htmlFor="not-started" name="Not started">Not started</label>
                <input type="radio" name="status" value="In progress" onChange={handleFilterChange}/>
                <label htmlFor="in-progress" name="In progress">In progress</label>
                <input type="radio" name="status" value="Completed" onChange={handleFilterChange}/>
                <label htmlFor="completed" name="Completed">Completed</label>
        </div>
    )
}