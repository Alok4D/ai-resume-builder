#  AI Resume Builder

<div align="center">
  <h3>🚀 Smart AI-Powered Resume Generator</h3>
  <p>A modern, multi-step CV/Resume builder application built with Next.js, TypeScript, Redux, and AI integration using Google's Gemini model.</p>
  
  <p>
    <a href="https://ai-resume-builder-bd.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_App-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo" />
    </a>
  </p>
</div>

---

## 📊 Project Summary

**AI Resume Builder** is an intelligent, user-friendly web application that transforms the traditional resume creation process through artificial intelligence. Built with cutting-edge technologies, this application guides users through a seamless 7-step process to create professional, ATS-friendly resumes powered by Google's Gemini AI.

### 🎯 **Key Highlights:**

- ✨ **AI-Driven Content Generation** - Smart resume creation using Google Gemini
- 🎨 **Modern UI/UX** - Responsive design with smooth animations
- 💾 **Persistent Data** - Never lose your progress with Redux Persist
- 📱 **Mobile-First** - Works perfectly on all devices
- 📄 **PDF Export** - Download professional resumes instantly
- ⚡ **Real-time Validation** - Instant feedback and error handling

### 🌟 **Live Application:**

🔗 **[https://ai-resume-builder-bd.vercel.app](https://ai-resume-builder-bd.vercel.app)**

##  Features

- **Multi-Step Form**: Intuitive step-by-step resume creation process
- **AI-Powered Generation**: Uses Google Gemini AI to generate professional resumes
- **Redux State Management**: Persistent form data with Redux Toolkit and Redux Persist
- **Smooth Animations**: Framer Motion animations for seamless user experience
- **PDF Export**: Download generated resumes as PDF files
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Theme System**: Centralized color management for easy customization

##  Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Integration**: AI SDK with Google Gemini
- **PDF Generation**: html2pdf.js + jsPDF + html2canvas
- **Form Handling**: React Hook Form
- **Icons**: Lucide React

## 🚀 Recent Updates & Enhancements

- **Flawless PDF Generation**: Migrated to `html2pdf.js` to ensure the generated A4 resume downloads perfectly without text clipping, incorrect scaling, or UI bleeding.
- **Responsive Layout Architecture**: Re-engineered the main `Stepper` page layout to use a globally responsive constraint (`max-w-[1400px] mx-auto`), ensuring all form components and preview screens remain perfectly centered on ultrawide monitors.
- **Dynamic Form Handling**: Improved dynamic form state persistence for custom fields, including job titles and co-curricular activities, ensuring the Google Gemini AI receives complete user data.
- **Dependency Security Updates**: Updated Next.js and React dependencies to resolve deployment vulnerabilities on Vercel.

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

## ✅ Completed Tasks

- Multi-step form implementation with 7 distinct steps
- Redux state management with persistence
- AI resume generation using Gemini API
- PDF download functionality
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Form validation and error handling
- Theme system for easy color customization

## 🌟 Project Showcase

### 📸 Screenshots & Demo

## 📸 Screenshots

![Homepage](assets/images/image.png)
- 📱 **Mobile Responsive**: Fully optimized for all screen sizes
- 🎨 **Modern Design**: Clean, professional interface

### 🚀 Performance Metrics

- ⚡ **Fast Loading** - Optimized bundle size
- 🔒 **Secure** - Server-side API calls
- 📊 **SEO Friendly** - Next.js App Router
- 🎯 **User Friendly** - Intuitive navigation

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
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📞 Contact & Support

- 🌐 **Portfolio**: [https://alok-roy-dev.vercel.app/](https://alok-roy-dev.vercel.app/)
- 📧 **Email**: alokroy602701@gmail.com
- 📱 **Phone**: +880 1719277951

