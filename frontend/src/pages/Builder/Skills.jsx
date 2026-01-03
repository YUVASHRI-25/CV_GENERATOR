import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

function Skills() {
  const { resumeData, updateSkills } = useResume()
  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      updateSkills([...resumeData.skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    updateSkills(resumeData.skills.filter(skill => skill !== skillToRemove))
  }

  // Common skills suggestions
  const suggestions = [
    'Python', 'C', 'C++', 'Java', 'JavaScript',
    'HTML', 'CSS', 'React', 'Node.js', 'SQL',
    'Git', 'VS Code', 'Excel', 'Problem Solving', 'Communication'
  ].filter(s => !resumeData.skills.includes(s))

  return (
    <div className="tab-section">
      <h2>💡 Technical Skills</h2>
      <p>Add the skills you have learned. These help ATS systems find your resume.</p>

      <div className="form-group">
        <label htmlFor="skill">Add a Skill</label>
        <div className="input-with-btn">
          <input
            type="text"
            id="skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Python, HTML, Git..."
          />
          <button 
            type="button" 
            className="add-btn"
            onClick={handleAddSkill}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Current Skills */}
      {resumeData.skills.length > 0 && (
        <div className="skills-section">
          <h4>Your Skills ({resumeData.skills.length})</h4>
          <div className="tags-list">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="tag">
                {skill}
                <button 
                  className="tag-remove"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions-section">
          <h4>💡 Quick Add (Click to add)</h4>
          <div className="suggestions-list">
            {suggestions.slice(0, 10).map((skill, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => updateSkills([...resumeData.skills, skill])}
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="tip-box">
        <strong>💡 Tip:</strong> Include programming languages, tools, and soft skills. 
        For first-year students, even basics like MS Excel, Word, or basic coding skills count!
      </div>

      <style>{`
        .skills-section {
          margin-top: 24px;
        }
        
        .skills-section h4 {
          margin-bottom: 12px;
          color: #1a1a2e;
        }
        
        .suggestions-section {
          margin-top: 24px;
          padding: 20px;
          background: #f8f9fb;
          border-radius: 12px;
        }
        
        .suggestions-section h4 {
          margin-bottom: 12px;
          color: #666;
          font-size: 14px;
        }
        
        .suggestions-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .suggestion-btn {
          padding: 8px 14px;
          background: white;
          border: 1px dashed #ccc;
          border-radius: 20px;
          color: #666;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .suggestion-btn:hover {
          border-color: #667eea;
          color: #667eea;
          background: #667eea10;
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

export default Skills
