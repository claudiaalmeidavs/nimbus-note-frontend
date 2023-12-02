import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewProjectForm.css"

export default function NewProjectForm () {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        user_name: "",
        company: "",
        project_title: "",
        category: "",
        priority: "",
        deadline: "",
        description: "",
    });

    // Error messages in case required fields are not filled out
    const [formErrors, setFormErrors] = useState({});
     
    // Errors are displaying before submitting, revise this.

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
      
        // Perform form validation
        const requiredFields = ["user_name", "project_title", "category", "priority", "deadline"];
        const errors = {};
      
        requiredFields.forEach((field) => {
          if (!formData[field]) {
            errors[field] = `${field.replace("_", " ")} is required`;
          }
        });
      
        // If there are errors, update the formErrors state and stop form submission
        if (Object.keys(errors).length > 0) {
          setFormErrors(errors);
        //   console.log(formErrors);
          return;
        }
      
        // Reset formErrors and setIsSubmitting
        setFormErrors({});

       axios
         .post("http://localhost:5000/projects", formData)
         .then(() => {
           navigate("/");
         })
    
         .catch((error) => console.error(error))
     };
    return (
        <div className="new-project-form">
            <form className="register-project-form" onSubmit={handleSubmit}>
                <h1 className="h1-title">Register a new project</h1>
                <div className="form-section-title">
                    <label className="form-item form-section-heading" htmlFor="title">Project title</label>
                    <textarea type="text" className="txtarea-small" name="project_title" value={formData.project_title}
                    onChange={handleChange} />
                    {formErrors.project_title ? <p className="error-message">{formErrors.project_title}</p> : null}
                </div>
                <div className="form-first-section">
                    <label className="form-item form-section-heading" htmlFor="user-info">User name</label>
                        <textarea type="text" className="txtarea-small" name="user_name" value={formData.user_name}
                        onChange={handleChange}/>
                        {formErrors.user_name ? <p className="error-message">{formErrors.user_name}</p> : null}
                    <label className="form-item form-section-heading" htmlFor="company">Company name</label>
                        <textarea type="text" className="txtarea-small" name="company" value={formData.company}
                        onChange={handleChange}/>
                    <label className="form-item form-section-heading" htmlFor="deadline">Deadline</label>
                        <input className="project-deadline-input" type="date" name="deadline" onChange={handleChange} />
                        {formErrors.deadline ? <p className="error-message">{formErrors.deadline}</p> : null}
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
                        {formErrors.category ? <p className="error-message">{formErrors.category}</p> : null}
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
                        {formErrors.priority ? <p className="error-message">{formErrors.priority}</p> : null}
                    </div>
                </div>
                <div className="project-description-section">
                    <label className="form-section-heading" htmlFor="desc">Project notes</label>
                    <textarea type="text" className="txtarea-desc" name="description" value={formData.description}
                    onChange={handleChange} />
                </div>
                <button className="btn-submit">Submit</button>
            </form>
        </div>
    )
}