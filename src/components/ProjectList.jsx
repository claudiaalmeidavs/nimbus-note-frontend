export default function ProjectList ({projects}) {
    return (
        <div className="project-list-container">
            {projects.map((project) => (
                <li>{project.project_title}</li>
            ))}
        </div>
    )
}