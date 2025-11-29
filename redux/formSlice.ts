import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PersonalInfo {
  firstName: string
  lastName: string
  phone: string
  email: string
  country: string
  address: string
  city: string
  state: string
  zipCode: string
}

export interface CareerSummary {
  jobTitle: string
  summary: string
}

export interface WorkExperience {
  jobTitle: string
  companyName: string
  startDate: string
  endDate: string
  jobDescription: string
  skills: string[]
}

export interface Education {
  degree: string
  institutionName: string
  major: string
  startDate: string
  endDate: string
}

export interface Certification {
  certificationTitle: string
  issuingOrganization: string
  issueDate: string
  expiryDate: string
}

export interface ContactInfo {
  linkedinProfile: string
  personalWebsite: string
  otherSocialMedia: string
  otherSocialMediaURL: string
}

export interface FormState {
  formData: {
    personalInfo: PersonalInfo
    careerSummary: CareerSummary
    workExperience: WorkExperience[]
    education: Education[]
    certifications: Certification[]
    contactInfo: ContactInfo
  }
  generatedResume: string
}

const initialState: FormState = {
  formData: {
    personalInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      country: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    careerSummary: {
      jobTitle: '',
      summary: ''
    },
    workExperience: [],
    education: [],
    certifications: [],
    contactInfo: {
      linkedinProfile: '',
      personalWebsite: '',
      otherSocialMedia: '',
      otherSocialMediaURL: ''
    }
  },
  generatedResume: ''
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.formData.personalInfo = action.payload
    },
    setCareerSummary: (state, action: PayloadAction<CareerSummary>) => {
      state.formData.careerSummary = action.payload
    },
    addWorkExperience: (state, action: PayloadAction<WorkExperience>) => {
      state.formData.workExperience.push(action.payload)
    },
    setWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      state.formData.workExperience = action.payload
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.formData.education.push(action.payload)
    },
    setEducation: (state, action: PayloadAction<Education[]>) => {
      state.formData.education = action.payload
    },
    addCertification: (state, action: PayloadAction<Certification>) => {
      state.formData.certifications.push(action.payload)
    },
    setCertifications: (state, action: PayloadAction<Certification[]>) => {
      state.formData.certifications = action.payload
    },
    setContactInfo: (state, action: PayloadAction<ContactInfo>) => {
      state.formData.contactInfo = action.payload
    },
    setGeneratedResume: (state, action: PayloadAction<string>) => {
      state.generatedResume = action.payload
    },
    resetForm: (state) => {
      state.formData = initialState.formData
      state.generatedResume = ''
    }
  },
})

export const {
  setPersonalInfo,
  setCareerSummary,
  addWorkExperience,
  setWorkExperience,
  addEducation,
  setEducation,
  addCertification,
  setCertifications,
  setContactInfo,
  setGeneratedResume,
  resetForm
} = formSlice.actions

export default formSlice.reducer