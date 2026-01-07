# AI Resume Analyzer

An intelligent, AI-powered web application for analyzing and scoring resumes. Upload your resume in PDF format, and get detailed insights including ATS compatibility scores, keyword analysis, summary, and actionable feedback to improve your resume.

## Features

- 📄 **PDF Upload & Processing**: Seamlessly upload PDF resumes and extract text and images for analysis.
- 🤖 **AI-Powered Analysis**: Leverage AI to analyze resume content, structure, and relevance.
- 📊 **ATS Scoring**: Get compatibility scores for Applicant Tracking Systems (ATS) with detailed breakdowns.
- 🎯 **Keyword Optimization**: Identify key skills and keywords to improve job matching.
- 📈 **Visual Score Gauges**: Interactive score circles, badges, and gauges for quick insights.
- 📋 **Detailed Feedback**: Receive summaries, details, and suggestions for resume improvement.
- 🔐 **User Authentication**: Secure login and account management.
- 🗂️ **Resume Management**: View, compare, and manage multiple resumes.
- 🐳 **Docker Support**: Easy containerization for deployment.
- ⚡ **Fast & Responsive**: Built with React, Vite, and TypeScript for optimal performance.

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **Routing**: React Router
- **PDF Processing**: Custom PDF text extraction and image conversion
- **AI Integration**: Puter API for AI-powered analysis
- **Deployment**: Docker, Node.js server

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-resume-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Usage

1. **Sign Up/Login**: Create an account or log in to access the analyzer.
2. **Upload Resume**: Navigate to the upload page and select a PDF resume file.
3. **View Analysis**: Review the AI-generated scores, summaries, and detailed feedback.
4. **Manage Resumes**: Access your uploaded resumes and analysis history.

## Building for Production

Create a production build:

```bash
npm run build
```

This will generate optimized assets in the `build/` directory.

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t ai-resume-analyzer .

# Run the container
docker run -p 3000:3000 ai-resume-analyzer
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`:

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

Built with ❤️ using React Router and AI technologies.
