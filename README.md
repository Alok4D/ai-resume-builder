# AI Resume Builder

A modern, multi-step CV/Resume builder application built with Next.js, TypeScript, Redux, and AI integration using Google's Gemini model.

## 🚀 Features

- **Multi-Step Form**: Intuitive step-by-step resume creation process
- **AI-Powered Generation**: Uses Google Gemini AI to generate professional resumes
- **Redux State Management**: Persistent form data with Redux Toolkit and Redux Persist
- **Smooth Animations**: Framer Motion animations for seamless user experience
- **PDF Export**: Download generated resumes as PDF files
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Theme System**: Centralized color management for easy customization

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Integration**: AI SDK with Google Gemini
- **PDF Generation**: jsPDF + html2canvas
- **Form Handling**: React Hook Form
- **Icons**: Lucide React

## 📋 Resume Sections

1. **Personal Information**: Basic contact details and address
2. **Career Summary**: Professional summary and objectives
3. **Educational Background**: Academic qualifications and degrees
4. **Work Experience**: Professional work history and achievements
5. **Skills & Expertise**: Technical and soft skills with proficiency levels
6. **Certifications**: Professional certifications and credentials
7. **AI Resume Generation**: Generate and download professional resume

## 🎨 Design Features

- **Stepper Navigation**: Visual progress indicator
- **Form Validation**: Real-time form validation with error messages
- **Dynamic Forms**: Add/edit/remove entries for education, experience, skills, and certifications
- **Smooth Transitions**: Page transitions and micro-animations
- **Professional UI**: Clean, modern interface following design best practices

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Implementation Details

### State Management
- **Redux Toolkit** for efficient state management
- **Redux Persist** for data persistence across browser sessions
- Centralized form state with proper TypeScript interfaces

### AI Integration
- **Server Actions** for secure API calls
- **Google Gemini** model for intelligent resume generation
- Error handling and loading states

### Theme System
- Centralized color management in `lib/theme.ts`
- Easy color scheme changes (as requested in requirements)
- Consistent styling across all components

### Form Handling
- **React Hook Form** for efficient form management
- Real-time validation with custom error messages
- Dynamic form sections with add/edit/remove functionality

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🔄 Development Workflow

### Scrum Update Style Notes:

**Sprint Completion Summary:**

✅ **Completed Tasks:**
- Multi-step form implementation with 7 distinct steps
- Redux state management with persistence
- AI resume generation using Gemini API
- PDF download functionality
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Form validation and error handling
- Theme system for easy color customization

✅ **Technical Achievements:**
- Server Actions implementation for AI integration
- Dynamic form sections with CRUD operations
- Stepper component for navigation
- PDF generation with html2canvas and jsPDF
- TypeScript interfaces for type safety
- Redux Toolkit with proper middleware configuration

✅ **UI/UX Enhancements:**
- Professional design matching requirements
- Smooth page transitions
- Loading states and error handling
- Mobile-responsive layout
- Intuitive navigation flow

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

## 🎨 Color Customization

To change the entire color scheme quickly (as per requirements), simply update the values in `lib/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: '#YOUR_PRIMARY_COLOR',
    secondary: '#YOUR_SECONDARY_COLOR',
    // ... other colors
  }
}
```

## 📄 License

This project is built as a technical assessment and demonstrates modern React/Next.js development practices with AI integration.

---

**Built with ❤️ using Next.js, TypeScript, Redux, and AI technology**