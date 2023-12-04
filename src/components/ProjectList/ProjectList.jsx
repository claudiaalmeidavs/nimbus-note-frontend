import "./ProjectList.css";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect} from "react";


export default function ProjectList({ projects, setProjects, filteredProjects, filteredProjectsStatus }) {

  // useEffect(() => {
  //   fetchProjects();
  //   console.log("Fetched projects", projects)
  // }, [])

  // To delete entry
  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/projects/${id}`)
      .then(() => {
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
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

    // To filter both with the search input and the status
    const [combinedFilteredProjects, setCombinedFilteredProjects] = useState([]);

    useEffect(() => {
        if (projects.length > 0 && filteredProjects !== undefined && filteredProjectsStatus !== undefined) {
          let filtered;
          if (filteredProjects.length === 0 && filteredProjectsStatus.length === 0) {
            // Both arrays are empty, include all projects
            filtered = projects;
            console.log("Infinite?")
          } else if (filteredProjects.length > 0 && filteredProjectsStatus.length === 0) {
            // Only filteredProjects is not empty
            filtered = filteredProjects;
            console.log("Infinite?")
          } else if (filteredProjects.length === 0 && filteredProjectsStatus.length > 0) {
            // Only filteredProjectsStatus is not empty
            filtered = filteredProjectsStatus;
            console.log("Infinite?")
          } else {
            // Both filteredProjects and filteredProjectsStatus are not empty. Includes only projects on both.
            filtered = filteredProjects.filter((project) =>
            filteredProjectsStatus.some((statusProject) => statusProject.id === project.id)
            );
            console.log("Infinite?")
          }
          setCombinedFilteredProjects(prevFilteredProjects => {
            // Use the functional form to avoid dependency on projects
            return filtered.length > 0 ? filtered : prevFilteredProjects;
          });
        } else {
          // If either of the conditions is not met, set it to the original projects
          setCombinedFilteredProjects(projects);
          // console.log("Infinite?")
        }
      }, [filteredProjects, filteredProjectsStatus, projects]);

      useEffect(() => {
        console.log("These are the combined filters", combinedFilteredProjects);
      }, [filteredProjects, filteredProjectsStatus]);

      // To alert when projects are overdue
      const [overdueMessage, setOverdueMessage] = useState([]);

      function findOverdueProjects() {
        const currentDate = new Date();
        const overdueProjects = projects.filter((project) => (
          ["Not started", "In progress"].includes(project.status) &&
          new Date(project.deadline) < currentDate
        ));
        console.log("Overdue projects", overdueProjects);
        setOverdueMessage(overdueProjects);
      }

      useEffect(() => {
          findOverdueProjects();
          console.log("infinite overdue?")
      }, [combinedFilteredProjects])

      return (
        <div className="project-list-container">
          <div className="projects-accordion">
            {projects.length > 0 ? (
              combinedFilteredProjects.length > 0 ? (
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
                            {overdueMessage && overdueMessage.some((overdueProject) => overdueProject.id === project.id) ? (
                              <li className="header-title overdue-message">OVERDUE</li>
                            ) : null}
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
              ) : <div>Loading...</div>
            ) : <div>Loading</div>}
          </div>
        </div>
      );
    }