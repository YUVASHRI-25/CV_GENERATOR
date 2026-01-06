import { useResume } from '../context/ResumeContext'
import { getTemplatesList } from '../templates/templates'
import './TemplateSelector.css'

function TemplateSelector({ compact = false }) {
  const { selectedTemplate, changeTemplate } = useResume()
  const templates = getTemplatesList()

  const handleTemplateChange = (templateId) => {
    changeTemplate(templateId)
  }

  if (compact) {
    return (
      <div className="template-selector-compact">
        <label className="template-label">Template:</label>
        <div className="template-buttons">
          {templates.map((template) => (
            <button
              key={template.id}
              className={`template-btn ${selectedTemplate === template.id ? 'active' : ''}`}
              onClick={() => handleTemplateChange(template.id)}
              title={template.description}
            >
              <span className="template-icon">{template.preview}</span>
              <span className="template-name">{template.name}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="template-selector">
      <h3 className="template-selector-title">Choose Your Template</h3>
      <p className="template-selector-subtitle">
        Select a template that best fits your style. Your data will remain unchanged.
      </p>
      
      <div className="template-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => handleTemplateChange(template.id)}
          >
            <div className="template-preview-box">
              <span className="template-preview-icon">{template.preview}</span>
              <div className="template-layout-preview">
                {template.layout === 'two_column' ? (
                  <div className="layout-preview two-col">
                    <div className="preview-sidebar"></div>
                    <div className="preview-main">
                      <div className="preview-line"></div>
                      <div className="preview-line short"></div>
                      <div className="preview-line"></div>
                    </div>
                  </div>
                ) : (
                  <div className="layout-preview single-col">
                    <div className="preview-header"></div>
                    <div className="preview-line"></div>
                    <div className="preview-line short"></div>
                    <div className="preview-line"></div>
                    <div className="preview-line short"></div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="template-info">
              <h4 className="template-card-name">{template.name}</h4>
              <p className="template-card-desc">{template.description}</p>
            </div>
            
            {selectedTemplate === template.id && (
              <div className="selected-badge">✓ Selected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector
