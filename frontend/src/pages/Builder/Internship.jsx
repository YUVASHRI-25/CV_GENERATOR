import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

function Internship() {
  const { resumeData, addInternship, removeInternship } = useResume()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    duration: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.company) {
      addInternship(formData)
      setFormData({ title: '', company: '', duration: '', description: '' })
      setShowForm(false)
    }
  }

  const handleCancel = () => {
    setFormData({ title: '', company: '', duration: '', description: '' })
    setShowForm(false)
  }

  return (
    <div className="tab-section">
      <h2>💼 Internship / Experience</h2>
      <p>Add any internships, part-time work, or project experience</p>

      {/* Existing Internship Entries */}
      {resumeData.internship.length > 0 && (
        <div className="entries-list">
          {resumeData.internship.map((intern, index) => (
            <div key={index} className="entry-card">
              <button 
                className="remove-btn"
                onClick={() => removeInternship(index)}
              >
                ×
              </button>
              <div className="entry-header">
                <span className="entry-title">{intern.title}</span>
                <span className="entry-date">{intern.duration}</span>
              </div>
              <div className="entry-subtitle">{intern.company}</div>
              {intern.description && (
                <p className="entry-description">{intern.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Internship Button/Form */}
      {!showForm ? (
        <button 
          className="add-entry-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Internship / Experience
        </button>
      ) : (
        <form className="entry-form" onSubmit={handleSubmit}>
          <h4>Add Internship</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Role / Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Web Development Intern"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company / Organization *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., TechCorp India"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., June 2025 - August 2025"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (what you did)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and achievements...&#10;e.g., Built responsive web pages using HTML/CSS. Worked on a team project."
              rows={4}
            />
          </div>

          <div className="entry-form-buttons">
            <button type="submit" className="add-btn">Save Internship</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      {/* No Experience Message */}
      {resumeData.internship.length === 0 && !showForm && (
        <div className="no-experience-tip">
          <p><strong>🎓 No internship yet?</strong></p>
          <p>That's okay! As a first-year student, you can:</p>
          <ul>
            <li>Add academic projects as experience</li>
            <li>Include hackathons or coding competitions</li>
            <li>Mention volunteer work or club activities</li>
            <li>Skip this section and focus on skills</li>
          </ul>
        </div>
      )}

      <style>{`
        .entries-list {
          margin-bottom: 20px;
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
        
        .no-experience-tip {
          margin-top: 24px;
          padding: 20px;
          background: #fff8e6;
          border-radius: 12px;
          border-left: 4px solid #ffc107;
        }
        
        .no-experience-tip p {
          margin-bottom: 8px;
          color: #666;
        }
        
        .no-experience-tip ul {
          margin-left: 20px;
          color: #666;
        }
        
        .no-experience-tip li {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  )
}

export default Internship
