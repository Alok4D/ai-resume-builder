'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateResume(formData: any) {
  try {
    // Try AI generation first
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const workExpText = formData.workExperience?.length
        ? formData.workExperience.map((exp: any) => 
            `${exp.jobTitle} at ${exp.companyName} (${exp.startDate} - ${exp.endDate}): ${exp.jobDescription}`
          ).join('\n')
        : 'No work experience';

      const educationText = formData.education?.length
        ? formData.education.map((edu: any) => 
            `${edu.degree} in ${edu.major} from ${edu.institutionName} (${edu.startDate} - ${edu.endDate})`
          ).join('\n')
        : 'No education';

      const certText = formData.certifications?.length
        ? formData.certifications.map((cert: any) => 
            `${cert.certificationTitle} by ${cert.issuingOrganization}`
          ).join('\n')
        : 'No certifications';

      const prompt = `Create a professional resume in HTML format with inline CSS for:

Name: ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}
Email: ${formData.personalInfo.email}
Phone: ${formData.personalInfo.phone}
Location: ${formData.personalInfo.city}, ${formData.personalInfo.state}

Job Title: ${formData.careerSummary.jobTitle}
Summary: ${formData.careerSummary.summary}

Work Experience:
${workExpText}

Education:
${educationText}

Certifications:
${certText}

Make it professional with modern design, use emerald green (#10b981) as accent color.`;

      const result = await model.generateContent(prompt);
      const aiResume = result.response.text();
      
      return { success: true, resume: aiResume };
    } catch (aiError: any) {
      console.log('AI generation failed, using template:', aiError.message);
      // Fallback to template if AI fails
    }

    // Fallback template
    const workExpHTML = formData.workExperience?.length
      ? formData.workExperience
          .map(
            (exp: any) => `
            <div style="margin-bottom: 20px;">
              <h3 style="margin: 0; color: #2c3e50;">${exp.jobTitle}</h3>
              <p style="margin: 5px 0; color: #7f8c8d; font-weight: 600;">${exp.companyName}</p>
              <p style="margin: 5px 0; color: #95a5a6; font-size: 14px;">${exp.startDate} - ${exp.endDate}</p>
              <p style="margin: 10px 0; line-height: 1.6;">${exp.jobDescription}</p>
              ${exp.skills?.length ? `<p style="margin: 5px 0;"><strong>Skills:</strong> ${exp.skills.join(', ')}</p>` : ''}
            </div>
          `
          )
          .join('')
      : '<p>No work experience provided</p>';

    const educationHTML = formData.education?.length
      ? formData.education
          .map(
            (edu: any) => `
            <div style="margin-bottom: 15px;">
              <h3 style="margin: 0; color: #2c3e50;">${edu.degree} in ${edu.major}</h3>
              <p style="margin: 5px 0; color: #7f8c8d;">${edu.institutionName}</p>
              <p style="margin: 5px 0; color: #95a5a6; font-size: 14px;">${edu.startDate} - ${edu.endDate}</p>
            </div>
          `
          )
          .join('')
      : '<p>No education provided</p>';

    const certHTML = formData.certifications?.length
      ? formData.certifications
          .map(
            (cert: any) => `
            <div style="margin-bottom: 15px;">
              <h3 style="margin: 0; color: #2c3e50;">${cert.certificationTitle}</h3>
              <p style="margin: 5px 0; color: #7f8c8d;">${cert.issuingOrganization}</p>
              <p style="margin: 5px 0; color: #95a5a6; font-size: 14px;">Issued: ${cert.issueDate}${cert.expiryDate ? ` | Expires: ${cert.expiryDate}` : ''}</p>
            </div>
          `
          )
          .join('')
      : '<p>No certifications provided</p>';

    const resumeHTML = `
      <div style="max-width: 800px; margin: 0 auto; padding: 40px; font-family: 'Arial', sans-serif; background: white;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="margin: 0; color: #1a202c; font-size: 36px;">${formData.personalInfo.firstName} ${formData.personalInfo.lastName}</h1>
          <h2 style="margin: 10px 0; color: #10b981; font-size: 20px; font-weight: 500;">${formData.careerSummary.jobTitle}</h2>
          <div style="margin-top: 15px; color: #4a5568; font-size: 14px;">
            <span style="margin: 0 10px;">📧 ${formData.personalInfo.email}</span>
            <span style="margin: 0 10px;">📱 ${formData.personalInfo.phone}</span>
            <span style="margin: 0 10px;">📍 ${formData.personalInfo.city}, ${formData.personalInfo.state}</span>
          </div>
        </div>

        <!-- Professional Summary -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 5px; margin-bottom: 15px;">Professional Summary</h2>
          <p style="line-height: 1.8; color: #4a5568;">${formData.careerSummary.summary}</p>
        </div>

        <!-- Work Experience -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 5px; margin-bottom: 15px;">Work Experience</h2>
          ${workExpHTML}
        </div>

        <!-- Education -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 5px; margin-bottom: 15px;">Education</h2>
          ${educationHTML}
        </div>

        <!-- Certifications -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 5px; margin-bottom: 15px;">Certifications</h2>
          ${certHTML}
        </div>

        <!-- Contact Information -->
        ${formData.contactInfo.linkedinProfile || formData.contactInfo.personalWebsite ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 5px; margin-bottom: 15px;">Links</h2>
          ${formData.contactInfo.linkedinProfile ? `<p>🔗 LinkedIn: <a href="${formData.contactInfo.linkedinProfile}" style="color: #10b981;">${formData.contactInfo.linkedinProfile}</a></p>` : ''}
          ${formData.contactInfo.personalWebsite ? `<p>🌐 Website: <a href="${formData.contactInfo.personalWebsite}" style="color: #10b981;">${formData.contactInfo.personalWebsite}</a></p>` : ''}
          ${formData.contactInfo.otherSocialMediaURL ? `<p>📱 ${formData.contactInfo.otherSocialMedia}: <a href="${formData.contactInfo.otherSocialMediaURL}" style="color: #10b981;">${formData.contactInfo.otherSocialMediaURL}</a></p>` : ''}
        </div>
        ` : ''}
      </div>
    `;

    return { success: true, resume: resumeHTML };
  } catch (error: any) {
    console.error('Error generating resume:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate resume',
    };
  }
}
