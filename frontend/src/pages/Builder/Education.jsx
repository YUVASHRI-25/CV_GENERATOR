import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

function Education() {
  const { resumeData, addEducation, removeEducation } = useResume()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    degree: '',
    college: '',
    year: '',
    gpa: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.degree && formData.college) {
      addEducation(formData)
      setFormData({ degree: '', college: '', year: '', gpa: '' })
      setShowForm(false)
    }
  }

  const handleCancel = () => {
    setFormData({ degree: '', college: '', year: '', gpa: '' })
    setShowForm(false)
  }

  return (
    <div className="tab-section">
      <h2>🎓 Education</h2>
      <p>Add your educational qualifications</p>

      {/* Existing Education Entries */}
      {resumeData.education.length > 0 && (
        <div className="entries-list">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="entry-card">
              <button 
                className="remove-btn"
                onClick={() => removeEducation(index)}
              >
                ×
              </button>
              <div className="entry-header">
                <span className="entry-title">{edu.degree}</span>
                <span className="entry-date">{edu.year}</span>
              </div>
              <div className="entry-subtitle">{edu.college}</div>
              {edu.gpa && <div className="entry-detail">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Add Education Button/Form */}
      {!showForm ? (
        <button 
          className="add-entry-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Education
        </button>
      ) : (
        <form className="entry-form" onSubmit={handleSubmit}>
          <h4>Add Education</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="degree">Degree *</label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g., B.E Computer Science"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="college">College/University *</label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="e.g., ABC Engineering College"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2024 - 2028"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gpa">GPA (optional)</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="e.g., 8.5/10"
              />
            </div>
          </div>

          <div className="entry-form-buttons">
            <button type="submit" className="add-btn">Save Education</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="tip-box">
        <strong>💡 Tip:</strong> Include your current degree first. 
        You can also add 12th/10th scores if your college marks aren't available yet.
      </div>

      <style>{`
        .entries-list {
          margin-bottom: 20px;
        }
        
        .entry-detail {
          font-size: 13px;
          color: #667eea;
          margin-top: 4px;
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

export default Education
