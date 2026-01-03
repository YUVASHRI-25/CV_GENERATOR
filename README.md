# Resume Builder - ATS Friendly Resume Generator

A full-stack web application that helps first-year engineering students create professional, ATS-friendly resumes using AI-powered enhancements.

## 🎯 Project Overview

```
User (Browser)
       |
       |  React Frontend
       |  (Forms, Tabs, Preview)
       |
API Requests (JSON)
       |
Node.js + Express Backend
       |
Resume Processing Engine
(Template + LLM + Parsing)
       |
Generated Resume (PDF / DOCX)
```

## 📁 Project Structure

```
CV/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ResumePreview.jsx
│   │   │
│   │   ├── pages/            # Page components
│   │   │   ├── GetStarted.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Builder.jsx
│   │   │   └── Builder/      # Builder tab components
│   │   │       ├── Contact.jsx
│   │   │       ├── Skills.jsx
│   │   │       ├── Education.jsx
│   │   │       ├── Internship.jsx
│   │   │       ├── Certificates.jsx
│   │   │       └── Summary.jsx
│   │   │
│   │   ├── context/          # React Context (Global State)
│   │   │   └── ResumeContext.jsx
│   │   │
│   │   ├── services/         # API calls
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── backend/                  # Node.js + Express Backend
    ├── controllers/          # Request handlers
    │   ├── authController.js
    │   └── resumeController.js
    │
    ├── services/             # Business logic
    │   ├── llmService.js     # LLaMA/Mistral integration
    │   ├── templateService.js
    │   └── parsingService.js # Docling integration
    │
    ├── templates/            # ATS resume templates
    │   └── atsTemplate.json
    │
    ├── routes/               # API routes
    │   ├── authRoutes.js
    │   └── resumeRoutes.js
    │
    ├── utils/                # Utility functions
    │   └── pdfGenerator.js
    │
    ├── app.js
    └── server.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- (Optional) Ollama for local LLM

### Installation

1. **Clone the repository**
   ```bash
   cd CV
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 📱 User Journey

### 1. Get Started Page (`/`)
- Landing page with project intro
- Click "Get Started" → navigates to Login

### 2. Login Page (`/login`)
- Simple email/password login
- Register option
- Demo login for testing

### 3. Dashboard (`/dashboard`)
- "Start from Scratch" button
- (Future: Upload Resume option)

### 4. Resume Builder (`/builder`)
- **6 Tabs:**
  - 👤 Contact - Name, email, phone, LinkedIn, GitHub
  - 💡 Skills - Add technical skills with suggestions
  - 🎓 Education - Degree, college, year, GPA
  - 💼 Internship - Work experience (optional for freshers)
  - 📜 Certificates - Online courses, certifications
  - 📝 Summary - Professional summary with AI enhancement

### 5. Generate Resume
- Click "Generate Resume"
- Backend processes with LLM
- Download PDF

## 🤖 AI Integration (LLaMA/Mistral)

### Why LLM?
First-year students often don't know how to write professional summaries. The LLM:
- Improves summary writing
- Formats skills properly
- Makes content ATS-friendly

### Setup Local LLM (Ollama)

1. Install Ollama: https://ollama.ai
2. Pull Mistral model:
   ```bash
   ollama pull mistral
   ```
3. Start Ollama server (runs on port 11434)
4. Update `.env`:
   ```
   OLLAMA_URL=http://localhost:11434
   LLM_MODEL=mistral
   ```

### Example LLM Prompt
```
You are an ATS resume formatter.
Generate a professional summary for a first-year engineering student
using the following details:
- Skills: Python, C, HTML
- Education: B.E CSE
- Summary: I want to learn and grow...
```

## 📄 ATS Template

We use a **fixed ATS-friendly template**:

```json
{
  "layout": "single_column",
  "sections": [
    "summary",
    "skills", 
    "education",
    "internship",
    "certificates"
  ]
}
```

**Why this template?**
- ✅ Simple single-column layout
- ✅ No graphics or fancy formatting
- ✅ Machine-readable by ATS systems
- ✅ Perfect for first-year students

## 📊 Resume Data Flow

```
User Input (Forms)
      ↓
ResumeContext (State)
      ↓
JSON Data Structure
{
  "contact": { name, email, phone },
  "skills": ["Python", "C"],
  "education": [...],
  "internship": [...],
  "certificates": [...],
  "summary": "..."
}
      ↓
API Call to Backend
      ↓
LLM Enhancement
      ↓
Template Application
      ↓
PDF Generation
      ↓
Download
```

## 🔧 API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resume
- `POST /api/resume/generate` - Generate complete resume
- `POST /api/resume/preview` - Preview resume
- `POST /api/resume/enhance-summary` - AI enhance summary
- `GET /api/resume/download/:id` - Download resume

## 🔮 Future Enhancements

1. **Upload Resume** - Parse existing resumes using Docling
2. **Multiple Templates** - Offer template choices
3. **Resume Scoring** - ATS compatibility score
4. **Job Description Matching** - Tailor resume to job

## 📌 Presenting Tips

When presenting this project:

1. **Start with the problem**: "First-year students struggle with resumes"
2. **Show the demo**: Walk through the user journey
3. **Explain the architecture**: Frontend → API → Backend → LLM → PDF
4. **Highlight AI**: Show how LLM improves summaries
5. **Mention ATS**: Explain why ATS-friendly matters

## 🛠 Tech Stack

- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express
- **AI/LLM**: LLaMA/Mistral (via Ollama)
- **PDF**: PDFKit
- **Parsing**: Docling (optional)

## 📝 License

MIT License
