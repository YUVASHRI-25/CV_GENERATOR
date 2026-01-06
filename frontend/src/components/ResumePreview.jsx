import { useResume } from '../context/ResumeContext'
import './ResumePreview.css'

function ResumePreview({ zoomLevel = 1 }) {
  const { resumeData, currentTemplate, selectedTemplate } = useResume()
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

  // Dynamic styles based on template
  const templateStyles = {
    '--font-heading': currentTemplate.fonts.heading,
    '--font-body': currentTemplate.fonts.body,
    '--color-primary': currentTemplate.colors.primary,
    '--color-secondary': currentTemplate.colors.secondary,
    '--color-accent': currentTemplate.colors.accent,
    '--color-header-bg': currentTemplate.colors.headerBg,
    '--color-header-text': currentTemplate.colors.headerText,
    '--color-sidebar-bg': currentTemplate.colors.sidebarBg || currentTemplate.colors.headerBg,
    '--color-sidebar-text': currentTemplate.colors.sidebarText || currentTemplate.colors.headerText,
    '--name-size': currentTemplate.fonts.nameSize,
    '--section-title-size': currentTemplate.fonts.sectionTitleSize,
    '--body-size': currentTemplate.fonts.bodySize,
  }

  // Render section title based on template config
  const getSectionTitle = (section) => {
    return currentTemplate.sectionTitles[section] || section
  }

  // Check if section should show in sidebar (for two-column layout)
  const isSidebarSection = (section) => {
    return currentTemplate.sidebarSections?.includes(section)
  }

  // Render Contact Section
  const renderContact = () => (
    <header className={`resume-header ${currentTemplate.features.contactLayout}`}>
      <h1 className="resume-name">{contact.name || 'Your Name'}</h1>
      {contact.jobTitle && (
        <div className="resume-job-title">{contact.jobTitle}</div>
      )}
      <div className="contact-info">
        {contact.email && (
          <span className="contact-item">
            {currentTemplate.features.showIcons && <span className="contact-icon">✉️</span>}
            {contact.email}
          </span>
        )}
        {contact.phone && (
          <span className="contact-item">
            {currentTemplate.features.showIcons && <span className="contact-icon">📱</span>}
            {contact.phone}
          </span>
        )}
        {contact.linkedin && (
          <span className="contact-item">
            {currentTemplate.features.showIcons && <span className="contact-icon">💼</span>}
            LinkedIn
          </span>
        )}
        {contact.github && (
          <span className="contact-item">
            {currentTemplate.features.showIcons && <span className="contact-icon">💻</span>}
            GitHub
          </span>
        )}
        {contact.location && (
          <span className="contact-item">
            {currentTemplate.features.showIcons && <span className="contact-icon">📍</span>}
            {contact.location}
          </span>
        )}
      </div>
    </header>
  )

  // Render Summary Section
  const renderSummary = () => {
    if (!summary) return null
    return (
      <section className="resume-section">
        <h2 className="section-title">{getSectionTitle('summary')}</h2>
        <p className="summary-text">{summary}</p>
      </section>
    )
  }

  // Render Skills Section
  const renderSkills = () => {
    if (skills.length === 0) return null
    return (
      <section className="resume-section">
        <h2 className="section-title">{getSectionTitle('skills')}</h2>
        <div className={`skills-list ${currentTemplate.features.skillsDisplay}`}>
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <span className="skill-name">{skill.name}</span>
              {currentTemplate.features.showSkillLevel && skill.level && skill.level !== 'None' && (
                <span className="skill-level">({skill.level})</span>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Render Education Section
  const renderEducation = () => {
    if (education.length === 0) return null
    return (
      <section className="resume-section">
        <h2 className="section-title">{getSectionTitle('education')}</h2>
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
    )
  }

  // Render Projects Section
  const renderProjects = () => {
    if (projects.length === 0) return null
    return (
      <section className="resume-section">
        <h2 className="section-title">{getSectionTitle('projects')}</h2>
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
    )
  }

  // Render Internship Section
  const renderInternship = () => {
    if (internship.length === 0) return null
    return (
      <section className="resume-section">
        <h2 className="section-title">{getSectionTitle('internship')}</h2>
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
    )
  }

  // Render Certificates Section
  const renderCertificates = () => {
    if (certificates.length === 0) return null
    return (
      <section className="resume-section">
        <h2 className="section-title">{getSectionTitle('certificates')}</h2>
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
    )
  }

  // Render Languages Section
  const renderLanguages = () => {
    if (languages.length === 0) return null
    return (
      <section className="resume-section">
        <h2 className="section-title">{getSectionTitle('languages')}</h2>
        <div className={`languages-list ${currentTemplate.features.languageProgress ? 'with-progress' : ''}`}>
          {languages.map((lang, index) => (
            <div key={index} className="language-item-preview">
              <span className="language-name">{lang.name}</span>
              {currentTemplate.features.languageProgress ? (
                <div className="language-progress">
                  <div 
                    className="language-progress-bar" 
                    style={{ 
                      width: lang.proficiency === 'Native' ? '100%' 
                        : lang.proficiency === 'Fluent' ? '90%' 
                        : lang.proficiency === 'Advanced' ? '75%'
                        : lang.proficiency === 'Intermediate' ? '50%'
                        : '25%'
                    }}
                  ></div>
                </div>
              ) : (
                <span className="language-proficiency">({lang.proficiency})</span>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Render Custom Sections
  const renderCustomSections = () => {
    if (customSections.length === 0) return null
    return customSections.map((section, index) => (
      <section key={index} className="resume-section">
        <h2 className="section-title">{section.title}</h2>
        <p className="custom-content">{section.content}</p>
      </section>
    ))
  }

  // Render empty state
  const renderEmptyState = () => {
    if (!summary && skills.length === 0 && education.length === 0 && projects.length === 0) {
      return (
        <div className="empty-preview">
          <p>Start filling in your details to see the preview</p>
        </div>
      )
    }
    return null
  }

  // Section renderer map
  const sectionRenderers = {
    contact: renderContact,
    summary: renderSummary,
    skills: renderSkills,
    education: renderEducation,
    projects: renderProjects,
    internship: renderInternship,
    certificates: renderCertificates,
    languages: renderLanguages,
    custom: renderCustomSections
  }

  // Render sections based on template order
  const renderSectionsByOrder = (sections) => {
    return sections.map(section => {
      const renderer = sectionRenderers[section]
      if (renderer) {
        return <div key={section}>{renderer()}</div>
      }
      return null
    }).filter(Boolean)
  }

  // Two-column layout
  if (currentTemplate.layout === 'two_column') {
    return (
      <div className="resume-preview" style={zoomLevel !== 1 ? { overflow: 'auto', maxHeight: '90vh' } : {}}>
        <div style={zoomLevel !== 1 ? zoomStyle : {}}>
          <div 
            className={`resume-paper template-${selectedTemplate}`} 
            id="resume-to-print"
            style={templateStyles}
          >
            <div className="two-column-layout">
              {/* Sidebar */}
              <div className="resume-sidebar">
                {renderContact()}
                {currentTemplate.sidebarSections
                  .filter(s => s !== 'contact')
                  .map(section => {
                    const renderer = sectionRenderers[section]
                    return renderer ? <div key={section}>{renderer()}</div> : null
                  })}
              </div>
              
              {/* Main Content */}
              <div className="resume-main">
                {currentTemplate.mainSections.map(section => {
                  const renderer = sectionRenderers[section]
                  return renderer ? <div key={section}>{renderer()}</div> : null
                })}
              </div>
            </div>
            {renderEmptyState()}
          </div>
        </div>
      </div>
    )
  }

  // Single column layout (default)
  return (
    <div className="resume-preview" style={zoomLevel !== 1 ? { overflow: 'auto', maxHeight: '90vh' } : {}}>
      <div style={zoomLevel !== 1 ? zoomStyle : {}}>
        <div 
          className={`resume-paper template-${selectedTemplate}`} 
          id="resume-to-print"
          style={templateStyles}
        >
          {renderSectionsByOrder(currentTemplate.sectionOrder)}
          {renderEmptyState()}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
