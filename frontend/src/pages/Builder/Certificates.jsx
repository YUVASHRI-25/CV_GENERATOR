import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

function Certificates() {
  const { resumeData, addCertificate, removeCertificate } = useResume()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: ''
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
      addCertificate(formData)
      setFormData({ name: '', issuer: '', date: '' })
      setShowForm(false)
    }
  }

  const handleCancel = () => {
    setFormData({ name: '', issuer: '', date: '' })
    setShowForm(false)
  }

  // Popular certificate suggestions
  const suggestions = [
    { name: 'Python for Beginners', issuer: 'Coursera' },
    { name: 'Web Development Bootcamp', issuer: 'Udemy' },
    { name: 'Introduction to Programming', issuer: 'edX' },
    { name: 'SQL Fundamentals', issuer: 'HackerRank' },
    { name: 'Git & GitHub', issuer: 'Codecademy' }
  ]

  return (
    <div className="tab-section">
      <h2>📜 Certifications</h2>
      <p>Add any online courses, certifications, or achievements</p>

      {/* Existing Certificate Entries */}
      {resumeData.certificates.length > 0 && (
        <div className="entries-list">
          {resumeData.certificates.map((cert, index) => (
            <div key={index} className="entry-card">
              <button 
                className="remove-btn"
                onClick={() => removeCertificate(index)}
              >
                ×
              </button>
              <div className="entry-header">
                <span className="entry-title">{cert.name}</span>
                <span className="entry-date">{cert.date}</span>
              </div>
              {cert.issuer && <div className="entry-subtitle">{cert.issuer}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Add Certificate Button/Form */}
      {!showForm ? (
        <button 
          className="add-entry-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Certificate
        </button>
      ) : (
        <form className="entry-form" onSubmit={handleSubmit}>
          <h4>Add Certificate</h4>
          
          <div className="form-group">
            <label htmlFor="name">Certificate Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Python for Everybody"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="issuer">Issuing Organization</label>
              <input
                type="text"
                id="issuer"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="e.g., Coursera, Udemy, NPTEL"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date Completed</label>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g., January 2025"
              />
            </div>
          </div>

          <div className="entry-form-buttons">
            <button type="submit" className="add-btn">Save Certificate</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      {/* Suggestions */}
      {resumeData.certificates.length === 0 && !showForm && (
        <div className="suggestions-section">
          <h4>💡 Popular Free Certifications for Students:</h4>
          <div className="cert-suggestions">
            {suggestions.map((cert, index) => (
              <button
                key={index}
                className="cert-suggestion-btn"
                onClick={() => {
                  addCertificate({ ...cert, date: '' })
                }}
              >
                <span className="cert-name">+ {cert.name}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="tip-box">
        <strong>💡 Tip:</strong> Even free online certificates add value! 
        Platforms like Coursera, NPTEL, HackerRank, and Codecademy offer great beginner courses.
      </div>

      <style>{`
        .entries-list {
          margin-bottom: 20px;
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
        
        .suggestions-section {
          margin-top: 24px;
          padding: 20px;
          background: #f8f9fb;
          border-radius: 12px;
        }
        
        .suggestions-section h4 {
          margin-bottom: 16px;
          color: #666;
          font-size: 14px;
        }
        
        .cert-suggestions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .cert-suggestion-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: white;
          border: 1px solid #e1e5eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }
        
        .cert-suggestion-btn:hover {
          border-color: #667eea;
          background: #667eea08;
        }
        
        .cert-name {
          color: #333;
          font-weight: 500;
        }
        
        .cert-issuer {
          color: #999;
          font-size: 13px;
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

export default Certificates
