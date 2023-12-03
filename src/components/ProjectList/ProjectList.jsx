import "./ProjectList.css";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from "react";


export default function ProjectList({ projects, filteredProjects, filteredProjectsStatus }) {

  // To delete entry
  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/projects/${id}`)
      .then(() => {
        // setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
      })
      .catch((error) => {
        console.error(`Error deleting project with id ${id}:`, error);
      });
  }

  // To determine formatting of status
  const getStatusFormatting = (status) => {
    switch (status) {
      case "Not started":
        return "not-started-status";
      case "In progress":
        return "in-progress-status";
      case "Completed":
        return "completed-status";
      default:
        return "";
    }
  };

    const [combinedFilteredProjects, setCombinedFilteredProjects] = useState([]);

    useEffect(() => {
        console.log("Before combining projects");
        if (filteredProjects !== undefined && filteredProjectsStatus !== undefined) {
          let filtered;
          if (filteredProjects.length === 0 && filteredProjectsStatus.length === 0) {
            // Both arrays are empty, include all projects
            filtered = projects;
          } else if (filteredProjects.length > 0 && filteredProjectsStatus.length === 0) {
            // Only filteredProjects is not empty
            filtered = filteredProjects;
          } else if (filteredProjects.length === 0 && filteredProjectsStatus.length > 0) {
            // Only filteredProjectsStatus is not empty
            filtered = filteredProjectsStatus;
          } else {
            // Both filteredProjects and filteredProjectsStatus are not empty
            filtered = filteredProjects.filter((project) => filteredProjectsStatus.includes(project))
          }
      
          setCombinedFilteredProjects(filtered);
          console.log("Combined projects", filtered);
          console.log("filteredProjects in ProjectList", filteredProjects);
          console.log("filteredProjectsStatus in ProjectList", filteredProjectsStatus);
        } else {
          // If either of the conditions is not met, set it to the original projects
          setCombinedFilteredProjects(projects);
        }
      }, [filteredProjects, filteredProjectsStatus, projects]);

  return (
    <div className="project-list-container">
      <div className="projects-accordion">
        {combinedFilteredProjects ? (
          <Accordion alwaysOpen className="accordion">
            {combinedFilteredProjects.map((project) => (
              <Accordion.Item
                id="accordion-item"
                key={project.id}
                eventKey={project.id}
              >
                <Accordion.Header>
                  <div>
                    <ul className="accordion-header">
                      <li className="header-id-date">
                        Project #{project.id} {project.creation_date.substring(0, 10)}
                      </li>
                      <li className="header-title">{project.project_title}</li>
                    </ul>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="accordion-body">
                    <p
                      className={`project-status-p ${getStatusFormatting(
                        project.status
                      )}`}
                    >
                      <strong>{project.status}</strong>
                    </p>
                    <p>
                      Requested by{" "}
                      <strong>
                        {project.user_name}
                        {project.company ? ` (${project.company})` : null}
                      </strong>
                    </p>
                    <p>Category: {project.category}</p>
                    <p>Priority: {project.priority}</p>
                    <p>Deadline: {project.deadline.substring(0, 10)}</p>
                    {project.description ? (
                      <p>
                        <strong>Task details</strong>: {project.description}
                      </p>
                    ) : null}
                    <div className="buttons-accordion">
                      <Link to={`/edit/${project.id}`}>
                        <button className="accordion-edit-button">✎ Edit details</button>
                      </Link>
                      <button
                        className="accordion-delete-button"
                        onClick={() => handleDelete(project.id)}
                      >
                        🗑️ Delete entry
                      </button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : <div>No projects found</div>
        }
      </div>
    </div>
  );
}