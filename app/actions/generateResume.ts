/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateResume(formData: any) {
  try {
    // Try AI generation first
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.GOOGLE_GENERATIVE_AI_API_KEY!
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const workExpText = formData.workExperience?.length
        ? formData.workExperience
            .map(
              (exp: any) =>
                `${exp.jobTitle} at ${exp.companyName} (${exp.startDate} - ${exp.endDate}): ${exp.jobDescription}`
            )
            .join("\n")
        : "No work experience";

      const educationText = formData.education?.length
        ? formData.education
            .map(
              (edu: any) =>
                `${edu.degree} in ${edu.major} from ${edu.institutionName} (${edu.startDate} - ${edu.endDate})`
            )
            .join("\n")
        : "No education";

      const certText = formData.certifications?.length
        ? formData.certifications
            .map(
              (cert: any) =>
                `${cert.certificationTitle} by ${cert.issuingOrganization}`
            )
            .join("\n")
        : "No certifications";

      const prompt = `Create a professional resume in HTML format with inline CSS for:

      Name: ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}
      Email: ${formData.personalInfo.email}
      Phone: ${formData.personalInfo.phone}
      Location: ${formData.personalInfo.address}, ${formData.personalInfo.city}, ${formData.personalInfo.state}, ${formData.personalInfo.country}
      Profile Picture (Base64 URL): ${formData.personalInfo.profilePicture || ''}
      Languages: ${formData.personalInfo.languages?.join(', ') || ''}

      Job Title: ${formData.careerSummary.jobTitle}
      Summary: ${formData.careerSummary.summary}
      General Skills: ${formData.careerSummary.skills?.join(', ') || ''}
      Co-curricular Activities / Hobbies: ${formData.careerSummary.hobbies?.join(', ') || ''}

      Social/Portfolio:
      LinkedIn: ${formData.contactInfo?.linkedinProfile || ''}
      Website: ${formData.contactInfo?.personalWebsite || ''}
      Other: ${formData.contactInfo?.otherSocialMediaURL || ''}

      Work Experience:
      ${workExpText}

      Education:
      ${educationText}

      Certifications:
      ${certText}

      CRITICAL LAYOUT INSTRUCTIONS:
      You MUST design the resume with a STRICT 2-COLUMN LAYOUT exactly like this:
      1. LEFT COLUMN (approx 30-35% width, light gray/white background):
         - Circular profile picture at the top (use the base64 URL provided). If no picture, omit it.
         - PORTFOLIO section (links).
         - SKILLS section (General Skills as a bulleted list).
         - LANGUAGES section.
         - CO-CURRICULAR ACTIVITIES section.
      
      2. RIGHT COLUMN (approx 65-70% width):
         - HEADER at the top: Full Name (large, uppercase) and Job Title. Contact info (Phone, Email, Location) neatly placed below the name.
         - ABOUT ME section (using the Summary).
         - EDUCATION QUALIFICATION section.
         - TRAINING / CERTIFICATION section.
         - WORK EXPERIENCE section.
      
      Use clean, modern fonts (like sans-serif).
      Use a professional color palette with dark blue/gray for headers and standard text colors.
      Make sure to use CSS Flexbox or CSS Grid for the layout to ensure it renders correctly as a 2-column page. Do NOT use markdown, return pure valid HTML string.`;

      const result = await model.generateContent(prompt);
      const aiResume = result.response.text();

      return { success: true, resume: aiResume };
    } catch (aiError: any) {
      console.log("AI generation failed, using template:", aiError.message);
      // Fallback to template if AI fails
    }

    // Fallback template
    const templateHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${formData.personalInfo.firstName} ${formData.personalInfo.lastName} - Resume</title>
          <style>
              body { margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #333; }
              .resume-container { max-width: 1000px; margin: 40px auto; background: white; display: flex; flex-direction: row; box-shadow: 0 4px 6px rgba(0,0,0,0.1); min-height: 1122px; }
              .left-column { width: 32%; padding: 40px 30px; border-right: 1px solid #e5e7eb; }
              .right-column { width: 68%; padding: 40px 40px; }
              .profile-img-container { text-align: center; margin-bottom: 30px; }
              .profile-img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 4px solid #60a5fa; padding: 4px; }
              .section-title { font-size: 16px; font-weight: 700; color: #1f2937; text-transform: uppercase; margin: 30px 0 15px 0; letter-spacing: 1px; }
              .left-column ul { list-style-type: none; padding: 0; margin: 0; }
              .left-column ul li { margin-bottom: 10px; font-size: 14px; position: relative; padding-left: 15px; color: #4b5563; }
              .left-column ul li::before { content: '•'; color: #60a5fa; position: absolute; left: 0; font-size: 18px; top: -2px; }
              .link-item { color: #2563eb; text-decoration: none; font-size: 14px; display: block; margin-bottom: 8px; word-break: break-all; }
              .header-section { margin-bottom: 40px; }
              .name { font-size: 36px; font-weight: 800; color: #1e293b; text-transform: uppercase; margin: 0 0 5px 0; letter-spacing: 2px; }
              .job-title { font-size: 18px; color: #64748b; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px; }
              .contact-info { display: flex; flex-wrap: wrap; gap: 15px; font-size: 13px; color: #64748b; }
              .contact-item { display: flex; align-items: center; gap: 5px; }
              .right-section-title { font-size: 18px; font-weight: 700; color: #1e293b; text-transform: uppercase; margin: 30px 0 15px 0; letter-spacing: 1px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
              .summary-text { font-size: 15px; line-height: 1.6; color: #475569; margin: 0; }
              .item-block { margin-bottom: 20px; }
              .item-title { font-size: 16px; font-weight: 700; color: #334155; margin: 0 0 5px 0; }
              .item-subtitle { font-size: 15px; color: #64748b; margin: 0 0 5px 0; }
              .item-date { font-size: 13px; color: #94a3b8; margin: 0 0 10px 0; }
              .item-desc { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; }
          </style>
      </head>
      <body>
          <div class="resume-container">
              <div class="left-column">
                  ${formData.personalInfo.profilePicture ? `<div class="profile-img-container"><img src="${formData.personalInfo.profilePicture}" alt="Profile" class="profile-img"></div>` : ''}
                  
                  <h3 class="section-title">Portfolio</h3>
                  ${formData.contactInfo?.linkedinProfile ? `<a href="${formData.contactInfo.linkedinProfile}" class="link-item">LinkedIn</a>` : ''}
                  ${formData.contactInfo?.personalWebsite ? `<a href="${formData.contactInfo.personalWebsite}" class="link-item">Website</a>` : ''}
                  ${formData.contactInfo?.otherSocialMediaURL ? `<a href="${formData.contactInfo.otherSocialMediaURL}" class="link-item">Other</a>` : ''}

                  <h3 class="section-title">Skills</h3>
                  <ul>
                      ${(formData.careerSummary?.skills || []).map((skill: string) => `<li>${skill}</li>`).join('')}
                  </ul>

                  <h3 class="section-title">Languages</h3>
                  <ul>
                      ${(formData.personalInfo?.languages || []).map((lang: string) => `<li>${lang}</li>`).join('')}
                  </ul>

                  <h3 class="section-title">Co-Curricular Activities</h3>
                  <ul>
                      ${(formData.careerSummary?.hobbies || []).map((hobby: string) => `<li>${hobby}</li>`).join('')}
                  </ul>
              </div>
              
              <div class="right-column">
                  <div class="header-section">
                      <h1 class="name">${formData.personalInfo.firstName} ${formData.personalInfo.lastName}</h1>
                      <h2 class="job-title">${formData.careerSummary.jobTitle}</h2>
                      <div class="contact-info">
                          <span class="contact-item">📞 ${formData.personalInfo.phone}</span>
                          <span class="contact-item">✉️ ${formData.personalInfo.email}</span>
                          <span class="contact-item">📍 ${formData.personalInfo.address}, ${formData.personalInfo.city}, ${formData.personalInfo.country}</span>
                      </div>
                  </div>

                  <h3 class="right-section-title">About Me</h3>
                  <p class="summary-text">${formData.careerSummary.summary}</p>

                  <h3 class="right-section-title">Education Qualification</h3>
                  ${formData.education?.length ? formData.education.map((edu: any) => `
                      <div class="item-block">
                          <h4 class="item-title">${edu.degree} in ${edu.major}</h4>
                          <p class="item-subtitle">${edu.institutionName}</p>
                          <p class="item-date">${edu.startDate} - ${edu.endDate}</p>
                      </div>
                  `).join('') : ''}

                  <h3 class="right-section-title">Training / Certification</h3>
                  ${formData.certifications?.length ? formData.certifications.map((cert: any) => `
                      <div class="item-block">
                          <h4 class="item-title">${cert.certificationTitle}</h4>
                          <p class="item-subtitle">${cert.issuingOrganization}</p>
                          <p class="item-date">${cert.issueDate} - ${cert.expiryDate}</p>
                      </div>
                  `).join('') : ''}

                  <h3 class="right-section-title">Work Experience</h3>
                  ${formData.workExperience?.length ? formData.workExperience.map((exp: any) => `
                      <div class="item-block">
                          <h4 class="item-title">${exp.jobTitle} <span style="float:right; font-size:13px; font-weight:normal; color:#94a3b8;">${exp.startDate} - ${exp.endDate}</span></h4>
                          <p class="item-subtitle">${exp.companyName}</p>
                          <p class="item-desc">${exp.jobDescription}</p>
                      </div>
                  `).join('') : ''}
              </div>
          </div>
      </body>
      </html>
    `;

    return { success: true, resume: templateHTML };
  } catch (error: any) {
    console.error("Error generating resume:", error);
    return {
      success: false,
      error: error.message || "Failed to generate resume",
    };
  }
}
