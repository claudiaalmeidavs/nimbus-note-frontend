import "./ProjectList.css";
import Accordion from "react-bootstrap/Accordion";


export default function ProjectList ({projects}) {
    return (
        <div className="project-list-container">
            <h2 className="regular-h2">Project list</h2>
            <div className="projects-accordion">
            {projects ? (
                <Accordion alwaysOpen className="accordion">
                {projects.map((project) => (
                    <Accordion.Item id="accordion-item" key={project.id} eventKey={project.id}>
                        <Accordion.Header>
                            <div>
                                <ul className="accordion-header">
                                    <li className="header-id-date">Project #{project.id} {project.creation_date.substring(0,10)}</li>
                                    <li className="header-title">{project.project_title}</li>
                                </ul>
                            </div>
                        </Accordion.Header> 
                        <Accordion.Body>
                            <div className="accordion-body">
                                <p>Requested by <strong>{project.user_name}{project.company ? ` (${project.company})` : null}</strong></p>
                                <p>Category: {project.category}</p>
                                <p>Priority: {project.priority}</p>
                                <p>Deadline: {project.deadline.substring(0,10)}</p>
                                {project.description ? (<p><strong>Task details</strong>: {project.description}</p>) : null}
                                <button className="accordion-edit-button">✎ Edit details</button>
                                <button className="accordion-delete-button">🗑️ Delete entry</button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
                </Accordion> 
            ) : null}
            </div>
        </div>
    )
}