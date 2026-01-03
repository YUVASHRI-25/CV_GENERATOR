import { useResume } from '../context/ResumeContext'
import './ResumePreview.css'

function ResumePreview() {
  const { resumeData } = useResume()
  const { contact, summary, skills, education, internship, certificates } = resumeData

  return (
    <div className="resume-preview">
      <div className="resume-paper">
        {/* Contact / Header Section */}
        <header className="resume-header">
          <h1 className="resume-name">{contact.name || 'Your Name'}</h1>
          <div className="contact-info">
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.linkedin && <span>LinkedIn</span>}
            {contact.github && <span>GitHub</span>}
            {contact.location && <span>{contact.location}</span>}
          </div>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="resume-section">
            <h2 className="section-title">Professional Summary</h2>
            <p className="summary-text">{summary}</p>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Technical Skills</h2>
            <p className="skills-list">{skills.join(', ')}</p>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="item-header">
                  <strong>{edu.degree}</strong>
                  <span className="item-date">{edu.year}</span>
                </div>
                <div className="item-subtitle">{edu.college}</div>
                {edu.gpa && <div className="item-detail">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </section>
        )}

        {/* Internship Section */}
        {internship.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Internship Experience</h2>
            {internship.map((intern, index) => (
              <div key={index} className="experience-item">
                <div className="item-header">
                  <strong>{intern.title || intern.role}</strong>
                  <span className="item-date">{intern.duration}</span>
                </div>
                <div className="item-subtitle">{intern.company}</div>
                {intern.description && (
                  <p className="item-description">{intern.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Certifications</h2>
            {certificates.map((cert, index) => (
              <div key={index} className="certificate-item">
                <div className="item-header">
                  <strong>{cert.name}</strong>
                  <span className="item-date">{cert.date}</span>
                </div>
                <div className="item-subtitle">{cert.issuer}</div>
              </div>
            ))}
          </section>
        )}

        {/* Empty State */}
        {!summary && skills.length === 0 && education.length === 0 && (
          <div className="empty-preview">
            <p>Start filling in your details to see the preview</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumePreview
