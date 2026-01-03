import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { resumeAPI } from '../services/api'
import ResumePreview from '../components/ResumePreview'

// Builder Tab Components
import Contact from './Builder/Contact'
import Skills from './Builder/Skills'
import Education from './Builder/Education'
import Internship from './Builder/Internship'
import Certificates from './Builder/Certificates'
import Summary from './Builder/Summary'

import './Builder.css'

const TABS = [
  { id: 'contact', label: 'Contact', icon: '👤' },
  { id: 'skills', label: 'Skills', icon: '💡' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'internship', label: 'Internship', icon: '💼' },
  { id: 'certificates', label: 'Certificates', icon: '📜' },
  { id: 'summary', label: 'Summary', icon: '📝' }
]

function Builder() {
  const { resumeData } = useResume()
  const [activeTab, setActiveTab] = useState('contact')
  const [generating, setGenerating] = useState(false)
  const [generatedResume, setGeneratedResume] = useState(null)
  const [error, setError] = useState('')

  const currentTabIndex = TABS.findIndex(t => t.id === activeTab)

  const goToNextTab = () => {
    if (currentTabIndex < TABS.length - 1) {
      setActiveTab(TABS[currentTabIndex + 1].id)
    }
  }

  const goToPrevTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(TABS[currentTabIndex - 1].id)
    }
  }

  const handleGenerateResume = async () => {
    setError('')
    setGenerating(true)

    try {
      const response = await resumeAPI.generate(resumeData)
      if (response.success) {
        setGeneratedResume(response.data)
        alert('Resume generated successfully! Check the preview.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate resume')
    } finally {
      setGenerating(false)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contact':
        return <Contact />
      case 'skills':
        return <Skills />
      case 'education':
        return <Education />
      case 'internship':
        return <Internship />
      case 'certificates':
        return <Certificates />
      case 'summary':
        return <Summary />
      default:
        return <Contact />
    }
  }

  return (
    <div className="builder-page">
      <div className="builder-container">
        {/* Left Side - Form */}
        <div className="builder-form-section">
          {/* Tab Navigation */}
          <div className="tabs-navigation">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                {index < TABS.length - 1 && <span className="tab-arrow">→</span>}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentTabIndex + 1) / TABS.length) * 100}%` }}
            ></div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {renderTabContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="nav-buttons">
            <button 
              className="btn btn-secondary"
              onClick={goToPrevTab}
              disabled={currentTabIndex === 0}
            >
              ← Previous
            </button>

            {currentTabIndex === TABS.length - 1 ? (
              <button 
                className="btn btn-primary generate-btn"
                onClick={handleGenerateResume}
                disabled={generating}
              >
                {generating ? '⏳ Generating...' : '🚀 Generate Resume'}
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={goToNextTab}
              >
                Next →
              </button>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        {/* Right Side - Preview */}
        <div className="builder-preview-section">
          <h3 className="preview-title">📄 Live Preview</h3>
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}

export default Builder
