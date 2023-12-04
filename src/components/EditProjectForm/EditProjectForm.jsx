import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import "./EditProjectForm.css";

export default function EditProjectForm ({project}) {
    const navigate = useNavigate();
    const { id } = useParams();

    // Initialize the form data with the project prop if available
    const initialFormData = project
        ? {
        user_name: project.user_name,
        company: project.company || "",
        project_title: project.project_title,
        category: project.category,
        status: project.status,
        priority: project.priority,
        deadline: project.deadline,
        description: project.description || "",
        }
    : {
        user_name: "",
        company: "",
        project_title: "",
        category: "",
        status: "",
        priority: "",
        deadline: "",
        description: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    
    // Update form data when the project prop changes
    useEffect(() => {
        if (project) {
            setFormData((prevData) => ({
                 ...prevData,
                user_name: project.user_name,
                company: project.company || "",
                project_title: project.project_title,
                category: project.category,
                status: project.status,
                priority: project.priority,
                deadline: project.deadline,
                description: project.description || "",
            }));
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
      
        // Update form data
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert the deadline to a format accepted by the database
        const formattedDeadline = formData.deadline
        ? new Date(formData.deadline).toISOString().replace("T", " ").slice(0, 19)
        : null;

        const updatedFormData = {
        ...formData,
        deadline: formattedDeadline,
        };

       axios
         .put(`http://localhost:5000/projects/${id}`, updatedFormData)
         .then(() => {
           navigate("/");
         })
         .catch((error) => console.error(error))
    };
    
    return (
        <div className="new-project-form">
            {project ? 
            <form className="register-project-form" onSubmit={handleSubmit}>
                <h1 className="h1-title">Edit project #{project.id}</h1>
                <div className="form-section-title">
                    <label className="form-item form-section-heading" htmlFor="title">Project title</label>
                    <textarea type="text" className="txtarea-small" name="project_title" value={formData.project_title}
                    onChange={handleChange} />
                </div>
                <div className="form-first-section">
                    <label className="form-item form-section-heading"><strong>
                        Change status</strong>:{" "}
                        <select className="status-select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}>
                            <option value="" disabled>
                                ▼ Select Status
                            </option>
                            <option value="Not started">Not started</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                      </select>
                    </label>
                    <label className="form-item form-section-heading" htmlFor="user-info">User name</label>
                        <textarea type="text" className="txtarea-small" name="user_name" value={formData.user_name}
                        onChange={handleChange}/>
                    <label className="form-item form-section-heading" htmlFor="company">Company name</label>
                        <textarea type="text" className="txtarea-small" name="company" value={formData.company}
                        onChange={handleChange}/>
                    <label className="form-item form-section-heading" htmlFor="deadline">Deadline</label>
                        <input className="project-deadline-input" type="date" name="deadline" onChange={handleChange} />
                </div>
                <div className="form-second-section">  
                    <div className="form-category-section">
                        <label className="form-item form-section-heading" htmlFor="category">Project category</label>
                        <label className="radio-option" htmlFor="data-entry">
                            <input className="radio-button" type="radio" name="category" value="Data Entry" checked={formData.category === "Data Entry"}
                            onChange={handleChange} />Data Entry
                        </label>
                        <label className="radio-option" htmlFor="lead-generation">
                            <input className="radio-button" type="radio" name="category" value="Lead Generation" checked={formData.category === "Lead Generation"}
                            onChange={handleChange} />Lead Generation
                        </label>
                        <label className="radio-option" htmlFor="data-labeling">
                            <input className="radio-button" type="radio" name="category" value="Data Labeling" checked={formData.category === "Data Labeling"}
                            onChange={handleChange}/>Data Labeling
                        </label>
                        <label className="radio-option" htmlFor="outreach">
                            <input className="radio-button" type="radio" name="category" value="Outreach" checked={formData.category === "Outreach"}
                            onChange={handleChange}/>Outreach
                        </label>
                        <label className="radio-option" htmlFor="market-research">
                            <input className="radio-button" type="radio" name="category" value="Market Research" checked={formData.category === "Market Research"}
                            onChange={handleChange}/>Market Research
                        </label>
                        <label className="radio-option" htmlFor="other">
                            <input className="radio-button" type="radio" name="category" value="Other" checked={formData.category === "Other"}
                            onChange={handleChange}/>Other
                        </label>
                    </div>
                    <div className="priority-section">
                        <label className="form-item form-section-heading" htmlFor="priority">Priority</label>
                        <label htmlFor="high" className="radio-option">
                            <input className="radio-button" type="radio" name="priority" value="High" checked={formData.priority === 'High'}
                            onChange={handleChange} />High priority
                        </label>
                        <label htmlFor="medium" className="radio-option">
                            <input className="radio-button" type="radio" name="priority" value="Medium" checked={formData.priority === 'Medium'}
                             onChange={handleChange}/>Medium priority
                        </label>
                        <label htmlFor="low" className="radio-option">
                            <input className="radio-button" type="radio" name="priority" value="Low" checked={formData.priority === 'Low'}
                            onChange={handleChange} />Low priority
                        </label> 
                    </div>
                </div>
                <div className="project-description-section">
                    <label className="form-section-heading" htmlFor="desc">Project notes</label>
                    <textarea type="text" className="txtarea-desc" name="description" value={formData.description}
                    onChange={handleChange} />
                </div>
                <button className="btn-submit">Submit</button>
            </form>
            : null }
        </div>
    )
}