export interface Step {
    id: number;
    label: string;
}

export interface CertificationFormData {
    certificationTitle: string;
    issuingOrganization: string;
    issueDate: string;
    expiryDate: string;
}

export interface ContactFormData {
    linkedinProfile: string;
    personalWebsite: string;
    otherSocialMedia: string;
    otherSocialMediaURL: string;
}

export interface WorkExperienceFormData {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    jobDescription: string;
    achievements: File | null;
    skills: string[];
}

export interface FormErrors {
    certificationTitle?: string;
    issuingOrganization?: string;
    linkedinProfile?: string;
    personalWebsite?: string;
    jobTitle?: string;
    companyName?: string;
}