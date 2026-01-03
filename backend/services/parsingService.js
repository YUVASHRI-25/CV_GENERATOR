/**
 * Parsing Service
 * Handles resume parsing for "Upload Resume" feature
 * Uses Docling for PDF/DOCX parsing (future enhancement)
 */

const axios = require('axios');

// Docling configuration (when available)
const DOCLING_CONFIG = {
  url: process.env.DOCLING_URL || 'http://localhost:5001',
  enabled: process.env.ENABLE_DOCLING === 'true'
};

/**
 * Parse uploaded resume file
 * @param {Buffer} fileBuffer - The file content
 * @param {string} fileType - 'pdf' or 'docx'
 * @returns {Object} Parsed resume data
 */
const parseResume = async (fileBuffer, fileType) => {
  try {
    if (DOCLING_CONFIG.enabled) {
      return await parseWithDocling(fileBuffer, fileType);
    } else {
      return await parseBasic(fileBuffer, fileType);
    }
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw new Error('Failed to parse resume');
  }
};

/**
 * Parse using Docling (advanced parsing)
 */
const parseWithDocling = async (fileBuffer, fileType) => {
  try {
    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), `resume.${fileType}`);

    const response = await axios.post(
      `${DOCLING_CONFIG.url}/parse`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000
      }
    );

    // Convert Docling output to our format
    return normalizeDoclingOutput(response.data);
  } catch (error) {
    console.error('Docling parsing failed:', error.message);
    throw error;
  }
};

/**
 * Basic parsing without Docling
 * For simple text extraction
 */
const parseBasic = async (fileBuffer, fileType) => {
  // This is a placeholder - in production, use pdf-parse or docx library
  console.log('Using basic parsing (Docling not enabled)');
  
  return {
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    skills: [],
    education: [],
    internship: [],
    certificates: [],
    summary: '',
    rawText: 'Basic parsing - implement with pdf-parse library'
  };
};

/**
 * Normalize Docling output to our resume format
 */
const normalizeDoclingOutput = (doclingData) => {
  const normalized = {
    contact: extractContact(doclingData),
    skills: extractSkills(doclingData),
    education: extractEducation(doclingData),
    internship: extractExperience(doclingData),
    certificates: extractCertificates(doclingData),
    summary: extractSummary(doclingData),
    rawText: doclingData.text || ''
  };

  return normalized;
};

/**
 * Extract contact information from parsed data
 */
const extractContact = (data) => {
  const contact = {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: ''
  };

  const text = data.text || '';

  // Email regex
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) contact.email = emailMatch[0];

  // Phone regex (various formats)
  const phoneMatch = text.match(/(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) contact.phone = phoneMatch[0];

  // LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch) contact.linkedin = `https://${linkedinMatch[0]}`;

  // GitHub
  const githubMatch = text.match(/github\.com\/[\w-]+/i);
  if (githubMatch) contact.github = `https://${githubMatch[0]}`;

  // Name (usually first line or before email)
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  if (lines.length > 0) {
    contact.name = lines[0].replace(/[^\w\s]/g, '').trim();
  }

  return contact;
};

/**
 * Extract skills from parsed data
 */
const extractSkills = (data) => {
  const text = data.text || '';
  const skills = [];

  // Common skill keywords
  const skillKeywords = [
    'python', 'java', 'javascript', 'c\\+\\+', 'c#', 'html', 'css',
    'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask',
    'sql', 'mongodb', 'postgresql', 'mysql', 'git', 'docker', 'aws',
    'machine learning', 'data science', 'tensorflow', 'pytorch'
  ];

  for (const skill of skillKeywords) {
    const regex = new RegExp(`\\b${skill}\\b`, 'i');
    if (regex.test(text)) {
      // Capitalize properly
      skills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  }

  return [...new Set(skills)]; // Remove duplicates
};

/**
 * Extract education from parsed data
 */
const extractEducation = (data) => {
  const text = data.text || '';
  const education = [];

  // Common degree patterns
  const degreePatterns = [
    /B\.?E\.?\s*(in\s+)?(\w+)/i,
    /B\.?Tech\.?\s*(in\s+)?(\w+)/i,
    /Bachelor('s)?\s+of\s+(\w+)/i,
    /M\.?S\.?\s*(in\s+)?(\w+)/i,
    /Master('s)?\s+of\s+(\w+)/i
  ];

  for (const pattern of degreePatterns) {
    const match = text.match(pattern);
    if (match) {
      education.push({
        degree: match[0],
        college: '', // Would need more context to extract
        year: ''
      });
      break;
    }
  }

  return education;
};

/**
 * Extract work experience/internships
 */
const extractExperience = (data) => {
  // Placeholder - requires more sophisticated parsing
  return [];
};

/**
 * Extract certificates
 */
const extractCertificates = (data) => {
  // Placeholder - requires more sophisticated parsing
  return [];
};

/**
 * Extract summary/objective
 */
const extractSummary = (data) => {
  const text = data.text || '';
  
  // Look for summary section
  const summaryMatch = text.match(/(?:summary|objective|profile)[:\s]*([^]*?)(?=\n\n|education|experience|skills)/i);
  
  return summaryMatch ? summaryMatch[1].trim() : '';
};

module.exports = {
  parseResume,
  normalizeDoclingOutput
};
