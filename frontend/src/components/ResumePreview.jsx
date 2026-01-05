import { useResume } from '../context/ResumeContext'
import './ResumePreview.css'

function ResumePreview({ zoomLevel = 1 }) {
  const { resumeData } = useResume()
  const { contact, summary, skills, education, projects, internship, certificates, languages, customSections } = resumeData
  
  const zoomStyle = {
    transform: `scale(${zoomLevel})`,
    transformOrigin: 'top center',
    transition: 'transform 0.2s ease-in-out',
    width: `${100 / zoomLevel}%`,
    margin: '0 auto',
    height: 'fit-content',
    padding: '20px 0'
  }

  return (
    <div className="resume-preview" style={zoomLevel !== 1 ? { overflow: 'auto', maxHeight: '90vh' } : {}}>
      <div style={zoomLevel !== 1 ? zoomStyle : {}}>
        <div className="resume-paper" id="resume-to-print">
        {/* Contact / Header Section */}
        <header className="resume-header">
          <h1 className="resume-name">{contact.name || 'Your Name'}</h1>
          {contact.jobTitle && (
            <div className="resume-job-title">{contact.jobTitle}</div>
          )}
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
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  {skill.level && skill.level !== 'None' && (
                    <span className="skill-level">({skill.level})</span>
                  )}
                </div>
              ))}
            </div>
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

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="item-header">
                  <strong>{project.name}</strong>
                  <span className="item-date">{project.duration}</span>
                </div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="item-tech">
                    Technologies: {Array.isArray(project.technologies) 
                      ? project.technologies.join(', ')
                      : project.technologies
                    }
                  </div>
                )}
                {project.description && (
                  <p className="item-description">{project.description}</p>
                )}
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

        {/* Languages Section */}
        {languages.length > 0 && (
          <section className="resume-section">
            <h2 className="section-title">Languages</h2>
            <div className="languages-list">
              {languages.map((lang, index) => (
                <span key={index} className="language-item-preview">
                  {lang.name} ({lang.proficiency})
                  {index < languages.length - 1 && ', '}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 && customSections.map((section, index) => (
          <section key={index} className="resume-section">
            <h2 className="section-title">{section.title}</h2>
            <p className="custom-content">{section.content}</p>
          </section>
        ))}

        {/* Empty State */}
        {!summary && skills.length === 0 && education.length === 0 && projects.length === 0 && (
          <div className="empty-preview">
            <p>Start filling in your details to see the preview</p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
