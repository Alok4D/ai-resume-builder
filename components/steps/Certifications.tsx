/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Image from "next/image";

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
}

type EducationForm = {
  degree: string;
  institutionName: string;
  major: string;
  startDate: string;
  endDate: string;
  achievements: File | null;
};

type CertificationForm = {
  certificationTitle: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
};

export default function Certifications({ onNext, onBack }: Props) {
  const [showEducation, setShowEducation] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState } = useForm<{
    education: EducationForm;
    certification: CertificationForm;
  }>({
    defaultValues: {
      education: {
        degree: "",
        institutionName: "",
        major: "",
        startDate: "",
        endDate: "",
        achievements: null,
      },
      certification: {
        certificationTitle: "",
        issuingOrganization: "",
        issueDate: "",
        expiryDate: "",
      },
    },
  });

  const { errors } = formState;
  const education = watch("education");
  const certification = watch("certification");

  useEffect(() => {
    const savedData = localStorage.getItem("educationAndCertificationData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.keys(parsed.education || {}).forEach((key) =>
        setValue(`education.${key}`, parsed.education[key])
      );
      Object.keys(parsed.certification || {}).forEach((key) =>
        setValue(`certification.${key}`, parsed.certification[key])
      );
      if (parsed.education?.achievementsPreview) setPreview(parsed.education.achievementsPreview);
    }
  }, [setValue]);

  const onFileDrop = (file: File) => {
    setValue("education.achievements", file, { shouldValidate: true });
    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const onSubmit = (data: any) => {
    const storageData = {
      ...data,
      education: { ...data.education, achievementsPreview: preview },
    };
    localStorage.setItem("educationAndCertificationData", JSON.stringify(storageData));
    onNext(data);
  };

  return (
    <form className="py-8 px-4 sm:px-6 md:px-16 lg:px-24" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#333333]">
          {showEducation ? "Your Educational Background" : "Your Certifications"}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowEducation(true)}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              showEducation ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Education
          </button>
          <button
            type="button"
            onClick={() => setShowEducation(false)}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              !showEducation ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Certifications
          </button>
        </div>
      </div>

      <p className="text-[#777777] text-base sm:text-lg mb-8">
        Provide your academic qualifications and any relevant certifications to strengthen your resume.
      </p>

      {showEducation ? (
        <div className="space-y-6">
          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Your Degree</label>
            <input
              {...register("education.degree", { required: true })}
              placeholder="e.g., Bachelor's, Master's"
              className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.education?.degree ? "border-red-500" : "border-[#D4D4D4]"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Institution Name</label>
              <input
                {...register("education.institutionName", { required: true })}
                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.education?.institutionName ? "border-red-500" : "border-[#D4D4D4]"
                }`}
              />
            </div>

            <div>
              <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Major</label>
              <input
                {...register("education.major", { required: true })}
                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.education?.major ? "border-red-500" : "border-[#D4D4D4]"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Graduation</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                {...register("education.startDate", { required: true })}
                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.education?.startDate ? "border-red-500" : "border-[#D4D4D4]"
                }`}
              />
              <input
                type="date"
                {...register("education.endDate", { required: true })}
                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.education?.endDate ? "border-red-500" : "border-[#D4D4D4]"
                }`}
              />
            </div>
          </div>

          {/* Drag and Drop */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors bg-gray-50 ${
              isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) onFileDrop(file);
            }}
          >
            <input
              type="file"
              id="education-achievements"
              {...register("education.achievements", { required: true })}
              className="hidden"
              onChange={(e) => e.target.files && onFileDrop(e.target.files[0])}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label htmlFor="education-achievements" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div>
                  <p className="text-base text-gray-700 font-medium mb-1">Drop file or browse</p>
                  <p className="text-sm text-gray-400">Format: .pdf, .doc, .docx, .jpg, .jpeg, .png</p>
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById("education-achievements")?.click()}
                  className="mt-2 px-6 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition-colors"
                >
                  Browse Files
                </button>
              </div>
            </label>

            {preview && (
              <div className="mt-4">
                <Image src={preview} alt="Preview" width={120} height={120} className="mx-auto rounded-md" />
              </div>
            )}
            {education.achievements && !preview && (
              <p className="mt-2 text-gray-600">{education.achievements.name}</p>
            )}
            {errors.education?.achievements && <p className="text-red-500 mt-1">File is required</p>}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Certification Title</label>
            <input
              {...register("certification.certificationTitle", { required: true })}
              placeholder="High BNCC"
              className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.certification?.certificationTitle ? "border-red-500" : "border-[#D4D4D4]"
              }`}
            />
          </div>

          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Issuing Organization</label>
            <input
              {...register("certification.issuingOrganization", { required: true })}
              className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                errors.certification?.issuingOrganization ? "border-red-500" : "border-[#D4D4D4]"
              }`}
            />
          </div>

          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Certificate Issue</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                {...register("certification.issueDate", { required: true })}
                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.certification?.issueDate ? "border-red-500" : "border-[#D4D4D4]"
                }`}
              />
              <input
                type="date"
                {...register("certification.expiryDate", { required: true })}
                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                  errors.certification?.expiryDate ? "border-red-500" : "border-[#D4D4D4]"
                }`}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-t-[#E0E0E0]">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors flex items-center justify-center gap-2"
        >
          <IoArrowBack className="w-5 h-5" /> Back
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
        >
          Next <IoArrowForward className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  );
}


// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
// import { useDispatch, useSelector } from 'react-redux';
// import { addEducation, addCertification } from '../../redux/formSlice';
// import { validateEducation, validateCertification } from '../../lib/validation';
// import type { RootState } from '../../redux/store';

// interface Props {
//     onNext: (data: any) => void;
//     onBack: () => void;
// }

// export default function Certifications({ onNext, onBack }: Props) {
//     const dispatch = useDispatch();
//     const [showEducation, setShowEducation] = useState(true);

//     const [educationData, setEducationData] = useState({
//         degree: '',
//         institutionName: '',
//         major: '',
//         startDate: '',
//         endDate: ''
//     });

//     const [certificationData, setCertificationData] = useState({
//         certificationTitle: '',
//         issuingOrganization: '',
//         issueDate: '',
//         expiryDate: ''
//     });

//     const [educationErrors, setEducationErrors] = useState<any>({});
//     const [certificationErrors, setCertificationErrors] = useState<any>({});

//     const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEducationData({ ...educationData, [e.target.name]: e.target.value });
//     };

//     const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setCertificationData({ ...certificationData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = () => {
//         if (showEducation) {
//             const validationErrors = validateEducation(educationData);
//             if (Object.keys(validationErrors).length > 0) {
//                 setEducationErrors(validationErrors);
//                 return;
//             }
//             setEducationErrors({});
//             dispatch(addEducation(educationData));
//         } else {
//             const validationErrors = validateCertification(certificationData);
//             if (Object.keys(validationErrors).length > 0) {
//                 setCertificationErrors(validationErrors);
//                 return;
//             }
//             setCertificationErrors({});
//             dispatch(addCertification(certificationData));
//         }
//         onNext({ education: educationData, certification: certificationData });
//     };

//     return (
//         <div className="py-8 px-24">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-5xl font-semibold text-[#333333] mb-2">
//                     {showEducation ? 'Your Educational Background' : 'Your Certifications'}
//                 </h2>
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => setShowEducation(true)}
//                         className={`px-4 py-2 text-sm rounded transition-colors ${showEducation
//                             ? 'bg-gray-900 text-white'
//                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                             }`}
//                     >
//                         Education
//                     </button>
//                     <button
//                         onClick={() => setShowEducation(false)}
//                         className={`px-4 py-2 text-sm rounded transition-colors ${!showEducation
//                             ? 'bg-gray-900 text-white'
//                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                             }`}
//                     >
//                         Certifications
//                     </button>
//                 </div>
//             </div>

//             <p className="text-[#777777] text-lg mb-8">
//                 Provide your academic qualifications and any relevant certifications to strengthen your resume.
//             </p>

//             {showEducation ? (
//                 <div className="space-y-6">
//                     <div>
//                         <label className="block text-xl font-medium text-[#101010] mb-2">
//                             Your Degree
//                         </label>
//                         <input
//                             name="degree"
//                             value={educationData.degree}
//                             onChange={handleEducationChange}
//                             placeholder="e.g., Bachelor's, Master's"
//                             className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${educationErrors.degree ? 'border-red-500' : 'border-[#D4D4D4]'}`}
//                         />
//                         {educationErrors.degree && <p className="text-red-500 text-sm mt-1">{educationErrors.degree}</p>}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-xl font-medium text-[#101010] mb-2">
//                                 Institution Name
//                             </label>
//                             <input
//                                 name="institutionName"
//                                 value={educationData.institutionName}
//                                 onChange={handleEducationChange}
//                                 placeholder="Dhaka University"
//                                 className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${educationErrors.institutionName ? 'border-red-500' : 'border-[#D4D4D4]'}`}
//                             />
//                             {educationErrors.institutionName && <p className="text-red-500 text-sm mt-1">{educationErrors.institutionName}</p>}
//                         </div>

//                         <div>
//                             <label className="block text-xl font-medium text-[#101010] mb-2">
//                                 Major
//                             </label>
//                             <input
//                                 name="major"
//                                 value={educationData.major}
//                                 onChange={handleEducationChange}
//                                 placeholder="Electronic and Communication Engineering (ECE)"
//                                 className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${educationErrors.major ? 'border-red-500' : 'border-[#D4D4D4]'}`}
//                             />
//                             {educationErrors.major && <p className="text-red-500 text-sm mt-1">{educationErrors.major}</p>}
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-xl font-medium text-[#101010] mb-2">
//                             Graduation
//                         </label>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="relative">
//                                 <input
//                                     name="startDate"
//                                     value={educationData.startDate}
//                                     onChange={handleEducationChange}
//                                     type="date"
//                                     placeholder="Start Date"
//                                     className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     name="endDate"
//                                     value={educationData.endDate}
//                                     onChange={handleEducationChange}
//                                     type="date"
//                                     placeholder="End Date"
//                                     className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//                                 />
//                             </div>
//                         </div>
//                     </div>



//                     <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.01 }}
//                         whileTap={{ scale: 0.99 }}
//                         className="text-emerald-500 text-base font-medium flex items-center gap-2 hover:text-emerald-600 transition-colors"
//                     >
//                         <span className="text-xl">+</span>
//                         Add Another Degree
//                     </motion.button>
//                 </div>
//             ) : (
//                 <div className="space-y-6">
//                     <div>
//                         <label className="block text-xl font-medium text-[#101010] mb-2">
//                             Certification Title
//                         </label>
//                         <input
//                             name="certificationTitle"
//                             value={certificationData.certificationTitle}
//                             onChange={handleCertificationChange}
//                             placeholder="e.g., AWS Certified Solutions Architect"
//                             className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${certificationErrors.certificationTitle ? 'border-red-500' : 'border-[#D4D4D4]'}`}
//                         />
//                         {certificationErrors.certificationTitle && <p className="text-red-500 text-sm mt-1">{certificationErrors.certificationTitle}</p>}
//                     </div>

//                     <div>
//                         <label className="block text-xl font-medium text-[#101010] mb-2">
//                             Issuing Organization
//                         </label>
//                         <input
//                             name="issuingOrganization"
//                             value={certificationData.issuingOrganization}
//                             onChange={handleCertificationChange}
//                             placeholder="e.g., Amazon Web Services"
//                             className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${certificationErrors.issuingOrganization ? 'border-red-500' : 'border-[#D4D4D4]'}`}
//                         />
//                         {certificationErrors.issuingOrganization && <p className="text-red-500 text-sm mt-1">{certificationErrors.issuingOrganization}</p>}
//                     </div>

//                     <div>
//                         <label className="block text-xl font-medium text-[#101010] mb-2">
//                             Certificate Issue
//                         </label>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="relative">
//                                 <input
//                                     name="issueDate"
//                                     value={certificationData.issueDate}
//                                     onChange={handleCertificationChange}
//                                     type="date"
//                                     placeholder="Issue Date"
//                                     className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     name="expiryDate"
//                                     value={certificationData.expiryDate}
//                                     onChange={handleCertificationChange}
//                                     type="date"
//                                     placeholder="Expiry Date (if applicable)"
//                                     className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.01 }}
//                         whileTap={{ scale: 0.99 }}
//                         className="text-emerald-500 text-base font-medium flex items-center gap-2 hover:text-emerald-600 transition-colors"
//                     >
//                         <span className="text-xl">+</span>
//                         Add Another Certification
//                     </motion.button>
//                 </div>
//             )}

//             <div className="flex gap-4 pt-8 mt-8 border-t border-t-[#E0E0E0]">
//                 <motion.button
//                     type="button"
//                     onClick={onBack}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors flex items-center justify-center gap-2"
//                 >
//                     <IoArrowBack className="w-5 h-5" /> Back
//                 </motion.button>
//                 <motion.button
//                     type="button"
//                     onClick={handleSubmit}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
//                 >
//                     Next <IoArrowForward className="w-5 h-5" />
//                 </motion.button>
//             </div>
//         </div>
//     );
// }