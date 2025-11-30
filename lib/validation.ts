/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ValidationErrors {
  [key: string]: string
}

export const validatePersonalInfo = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required'
  }
  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required'
  }
  if (!data.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format'
  }
  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required'
  }
  if (!data.address?.trim()) {
    errors.address = 'Address is required'
  }
  if (!data.city?.trim()) {
    errors.city = 'City is required'
  }
  if (!data.zipCode?.trim()) {
    errors.zipCode = 'ZIP code is required'
  }

  return errors
}

export const validateCareerSummary = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.jobTitle?.trim()) {
    errors.jobTitle = 'Job title is required'
  }
  if (!data.summary?.trim()) {
    errors.summary = 'Career summary is required'
  } else if (data.summary.trim().length < 50) {
    errors.summary = 'Career summary should be at least 50 characters'
  }

  return errors
}

export const validateWorkExperience = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.jobTitle?.trim()) {
    errors.jobTitle = 'Job title is required'
  }
  if (!data.companyName?.trim()) {
    errors.companyName = 'Company name is required'
  }
  if (!data.startDate) {
    errors.startDate = 'Start date is required'
  }
  if (!data.endDate) {
    errors.endDate = 'End date is required'
  }
  if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
    errors.endDate = 'End date must be after start date'
  }
  if (!data.jobDescription?.trim()) {
    errors.jobDescription = 'Job description is required'
  }

  return errors
}

export const validateEducation = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.degree?.trim()) {
    errors.degree = 'Degree is required'
  }
  if (!data.institutionName?.trim()) {
    errors.institutionName = 'Institution name is required'
  }
  if (!data.major?.trim()) {
    errors.major = 'Major is required'
  }
  if (!data.startDate) {
    errors.startDate = 'Start date is required'
  }
  if (!data.endDate) {
    errors.endDate = 'End date is required'
  }
  if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
    errors.endDate = 'End date must be after start date'
  }

  return errors
}

export const validateCertification = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.certificationTitle?.trim()) {
    errors.certificationTitle = 'Certification title is required'
  }
  if (!data.issuingOrganization?.trim()) {
    errors.issuingOrganization = 'Issuing organization is required'
  }
  if (!data.issueDate) {
    errors.issueDate = 'Issue date is required'
  }

  return errors
}

export const validateContactInfo = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (data.linkedinProfile && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(data.linkedinProfile)) {
    errors.linkedinProfile = 'Invalid LinkedIn URL'
  }
  if (data.personalWebsite && !/^https?:\/\/.*$/.test(data.personalWebsite)) {
    errors.personalWebsite = 'Invalid website URL'
  }
  if (data.otherSocialMediaURL && !/^https?:\/\/.*$/.test(data.otherSocialMediaURL)) {
    errors.otherSocialMediaURL = 'Invalid URL'
  }

  return errors
}
