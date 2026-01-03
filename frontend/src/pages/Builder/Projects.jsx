import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

function Projects() {
  const { resumeData, addProject, removeProject } = useResume()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    technologies: '',
    duration: '',
    description: '',
    link: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name) {
      addProject({
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
      })
      setFormData({ name: '', technologies: '', duration: '', description: '', link: '' })
      setShowForm(false)
    }
  }

  const handleCancel = () => {
    setFormData({ name: '', technologies: '', duration: '', description: '', link: '' })
    setShowForm(false)
  }

  return (
    <div className="tab-section">
      <h2>🚀 Projects</h2>
      <p>Add your academic or personal projects to showcase your skills</p>

      {/* Existing Project Entries */}
      {resumeData.projects.length > 0 && (
        <div className="entries-list">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="entry-card">
              <button 
                className="remove-btn"
                onClick={() => removeProject(index)}
              >
                ×
              </button>
              <div className="entry-header">
                <span className="entry-title">{project.name}</span>
                <span className="entry-date">{project.duration}</span>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div className="project-tech">
                  {Array.isArray(project.technologies) 
                    ? project.technologies.join(', ')
                    : project.technologies
                  }
                </div>
              )}
              {project.description && (
                <p className="entry-description">{project.description}</p>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  🔗 View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Project Button/Form */}
      {!showForm ? (
        <button 
          className="add-entry-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Project
        </button>
      ) : (
        <form className="entry-form" onSubmit={handleSubmit}>
          <h4>Add Project</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Project Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., E-commerce Website"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., Jan 2025 - Mar 2025"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="technologies">Technologies Used (comma separated)</label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you built and what you learned...&#10;e.g., Built a full-stack e-commerce website with user authentication and payment integration."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">Project Link (optional)</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="e.g., https://github.com/username/project"
            />
          </div>

          <div className="entry-form-buttons">
            <button type="submit" className="add-btn">Save Project</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      {/* Project Ideas */}
      {resumeData.projects.length === 0 && !showForm && (
        <div className="project-ideas">
          <h4>💡 Project Ideas for First-Year Students:</h4>
          <ul>
            <li><strong>Calculator App</strong> - Simple UI with basic operations</li>
            <li><strong>To-Do List</strong> - CRUD operations, local storage</li>
            <li><strong>Portfolio Website</strong> - HTML, CSS, JavaScript</li>
            <li><strong>Weather App</strong> - API integration</li>
            <li><strong>Quiz Application</strong> - Multiple choice questions</li>
            <li><strong>Student Management System</strong> - Basic database operations</li>
          </ul>
        </div>
      )}

      <div className="tip-box">
        <strong>💡 Tip:</strong> Even small projects count! Class assignments, mini-projects, 
        or self-learning projects all demonstrate your practical skills.
      </div>

      <style>{`
        .entries-list {
          margin-bottom: 20px;
        }
        
        .project-tech {
          font-size: 13px;
          color: #667eea;
          margin-top: 4px;
          font-style: italic;
        }
        
        .project-link {
          display: inline-block;
          margin-top: 8px;
          font-size: 13px;
          color: #667eea;
          text-decoration: none;
        }
        
        .project-link:hover {
          text-decoration: underline;
        }
        
        .entry-description {
          margin-top: 8px;
          font-size: 14px;
          color: #555;
          line-height: 1.5;
        }
        
        .add-entry-btn {
          width: 100%;
          padding: 16px;
          background: #f8f9fb;
          border: 2px dashed #ccc;
          border-radius: 12px;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .add-entry-btn:hover {
          border-color: #667eea;
          color: #667eea;
          background: #667eea08;
        }
        
        .project-ideas {
          margin-top: 24px;
          padding: 20px;
          background: #e3f2fd;
          border-radius: 12px;
          border-left: 4px solid #2196f3;
        }
        
        .project-ideas h4 {
          margin-bottom: 12px;
          color: #1565c0;
        }
        
        .project-ideas ul {
          margin-left: 20px;
          color: #555;
        }
        
        .project-ideas li {
          margin-bottom: 8px;
        }
        
        .project-ideas strong {
          color: #1565c0;
        }
        
        .tip-box {
          margin-top: 24px;
          padding: 16px;
          background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
          border-radius: 8px;
          font-size: 14px;
          color: #555;
        }
        
        .tip-box strong {
          color: #667eea;
        }
      `}</style>
    </div>
  )
}

export default Projects
