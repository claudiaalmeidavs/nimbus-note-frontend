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
        } else {
            onChange(null);
            console.log("Filter cleared.")
        }
    }, [selectedStatus]);

    return (
        <div className="status-filter-container">
            <label className="filter-projects-heading-label" htmlFor="search">Filter by status</label>
                <input className="filter-radio not-started-radio" type="radio" name="status" value="Not started" onChange={handleFilterChange}/>
                <label className="filter-label" htmlFor="not-started" name="Not started">Not started</label>
                <input className="filter-radio in-progress-radio" type="radio" name="status" value="In progress" onChange={handleFilterChange}/>
                <label className="filter-label" htmlFor="in-progress" name="In progress">In progress</label>
                <input className="filter-radio completed-radio" type="radio" name="status" value="Completed" onChange={handleFilterChange}/>
                <label className="filter-label" htmlFor="completed" name="Completed">Completed</label>
                <input className="filter-radio clear-radio" type="radio" name="status" value="" onChange={handleFilterChange} checked={selectedStatus === ""} />
                <label className="filter-label" htmlFor="clear" name="Clear">Clear</label>
        </div>
    )
}