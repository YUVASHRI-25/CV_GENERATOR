/**
 * LLM Service
 * Handles integration with LLaMA / Mistral for resume enhancement
 * 
 * This service can connect to:
 * - Local LLaMA model (via Ollama)
 * - Mistral API
 * - OpenAI API (fallback)
 */

const axios = require('axios');

// Configuration
const LLM_CONFIG = {
  // Ollama (Local LLaMA/Mistral)
  ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
  model: process.env.LLM_MODEL || 'mistral', // or 'llama2', 'llama3'
  
  // Alternative: OpenAI API
  openaiUrl: 'https://api.openai.com/v1/chat/completions',
  openaiKey: process.env.OPENAI_API_KEY
};

/**
 * Generate professional summary using LLM
 */
const generateProfessionalSummary = async (data) => {
  const { summary, skills, education } = data;

  const prompt = `You are an ATS resume formatter and career advisor.
Generate a professional summary for a first-year engineering student based on the following details.

Current Summary (if any): ${summary || 'Not provided'}
Skills: ${skills?.join(', ') || 'Not provided'}
Education: ${education?.[0]?.degree || 'Engineering student'}

Requirements:
- Keep it concise (2-3 sentences)
- Make it ATS-friendly (use keywords)
- Focus on learning ability and potential
- Use professional language
- Avoid personal pronouns (I, me, my)

Generate ONLY the summary text, no additional explanations.`;

  try {
    const response = await callLLM(prompt);
    return response;
  } catch (error) {
    console.error('LLM Summary Error:', error.message);
    // Fallback: return a template summary
    return generateFallbackSummary(data);
  }
};

/**
 * Enhance complete resume data
 */
const enhanceResumeData = async (resumeData) => {
  const enhanced = { ...resumeData };

  try {
    // Enhance summary if provided or generate new one
    if (resumeData.summary || resumeData.skills?.length > 0) {
      enhanced.summary = await generateProfessionalSummary({
        summary: resumeData.summary,
        skills: resumeData.skills,
        education: resumeData.education
      });
    }

    // Format skills into categories
    if (resumeData.skills?.length > 0) {
      enhanced.formattedSkills = await categorizeSkills(resumeData.skills);
    }

    // Enhance internship descriptions
    if (resumeData.internship?.length > 0) {
      enhanced.internship = await enhanceInternshipDescriptions(resumeData.internship);
    }

    return enhanced;
  } catch (error) {
    console.error('Resume enhancement error:', error.message);
    return resumeData; // Return original if enhancement fails
  }
};

/**
 * Categorize skills using LLM
 */
const categorizeSkills = async (skills) => {
  const prompt = `Categorize these skills for an ATS resume:
Skills: ${skills.join(', ')}

Return as JSON with categories:
{
  "programming": [],
  "tools": [],
  "soft_skills": [],
  "other": []
}

Only return valid JSON, no explanations.`;

  try {
    const response = await callLLM(prompt);
    return JSON.parse(response);
  } catch (error) {
    // Fallback: return uncategorized
    return { all: skills };
  }
};

/**
 * Enhance internship descriptions
 */
const enhanceInternshipDescriptions = async (internships) => {
  const enhanced = [];

  for (const internship of internships) {
    if (internship.description) {
      const prompt = `Rewrite this internship description for an ATS resume.
Make it action-oriented with measurable outcomes.

Original: ${internship.description}

Return only the enhanced description (2-3 bullet points).`;

      try {
        const enhancedDesc = await callLLM(prompt);
        enhanced.push({ ...internship, description: enhancedDesc });
      } catch {
        enhanced.push(internship);
      }
    } else {
      enhanced.push(internship);
    }
  }

  return enhanced;
};

/**
 * Call LLM API (Ollama/Local)
 */
const callLLM = async (prompt) => {
  try {
    // Try Ollama first (local LLM)
    const response = await axios.post(
      `${LLM_CONFIG.ollamaUrl}/api/generate`,
      {
        model: LLM_CONFIG.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 500
        }
      },
      { timeout: 30000 }
    );

    return response.data.response?.trim() || '';
  } catch (ollamaError) {
    console.log('Ollama not available, using fallback...');
    
    // Fallback to OpenAI if configured
    if (LLM_CONFIG.openaiKey) {
      return await callOpenAI(prompt);
    }
    
    throw new Error('No LLM service available');
  }
};

/**
 * Fallback: Call OpenAI API
 */
const callOpenAI = async (prompt) => {
  const response = await axios.post(
    LLM_CONFIG.openaiUrl,
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    },
    {
      headers: {
        'Authorization': `Bearer ${LLM_CONFIG.openaiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
};

/**
 * Fallback summary generator (no LLM)
 */
const generateFallbackSummary = (data) => {
  const skills = data.skills?.slice(0, 3).join(', ') || 'various technical skills';
  const degree = data.education?.[0]?.degree || 'Engineering';
  
  return `Motivated ${degree} student with strong foundation in ${skills}. ` +
    `Eager to apply academic knowledge to real-world challenges. ` +
    `Quick learner with excellent problem-solving abilities and team collaboration skills.`;
};

module.exports = {
  generateProfessionalSummary,
  enhanceResumeData,
  categorizeSkills,
  enhanceInternshipDescriptions
};
