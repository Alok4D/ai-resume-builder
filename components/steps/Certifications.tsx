/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { addEducation, addCertification } from '../../redux/formSlice';

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
    const dispatch = useDispatch();
    const [showEducation, setShowEducation] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [formError, setFormError] = useState(false);

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
            if (parsed.education) {
                (Object.entries(parsed.education) as [keyof EducationForm, any][]).forEach(
                    ([key, value]) => {
                        setValue(`education.${key}`, value);
                    }
                );
            }
            if (parsed.certification) {
                (Object.entries(parsed.certification) as [keyof CertificationForm, any][]).forEach(
                    ([key, value]) => {
                        setValue(`certification.${key}`, value);
                    }
                );
            }

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
        // Save to Redux
        if (data.education) {
            const { achievements, ...educationData } = data.education;
            dispatch(addEducation(educationData));
        }
        if (data.certification) {
            dispatch(addCertification(data.certification));
        }
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
                        className={`px-4 py-2 text-sm rounded transition-colors ${showEducation ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        Education
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowEducation(false)}
                        className={`px-4 py-2 text-sm rounded transition-colors ${!showEducation ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.education?.degree ? "border-red-500" : "border-[#D4D4D4]"
                                }`}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Institution Name</label>
                            <input
                                {...register("education.institutionName", { required: true })}
                                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.education?.institutionName ? "border-red-500" : "border-[#D4D4D4]"
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Major</label>
                            <input
                                {...register("education.major", { required: true })}
                                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.education?.major ? "border-red-500" : "border-[#D4D4D4]"
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
                                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.education?.startDate ? "border-red-500" : "border-[#D4D4D4]"
                                    }`}
                            />
                            <input
                                type="date"
                                {...register("education.endDate", { required: true })}
                                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.education?.endDate ? "border-red-500" : "border-[#D4D4D4]"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Drag and Drop */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors bg-gray-50 ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
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
                        {/* {errors.education?.achievements && <p className="text-red-500 mt-1">File is required</p>} */}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Certification Title</label>
                        <input
                            {...register("certification.certificationTitle", { required: true })}
                            placeholder="High BNCC"
                            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.certification?.certificationTitle ? "border-red-500" : "border-[#D4D4D4]"
                                }`}

                        />
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Issuing Organization</label>
                        <input
                            {...register("certification.issuingOrganization", { required: true })}
                            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.certification?.issuingOrganization ? "border-red-500" : "border-[#D4D4D4]"
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Certificate Issue</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="date"
                                {...register("certification.issueDate", { required: true })}
                                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.certification?.issueDate ? "border-red-500" : "border-[#D4D4D4]"
                                    }`}
                            />
                            <input
                                type="date"
                                {...register("certification.expiryDate", { required: true })}
                                className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.certification?.expiryDate ? "border-red-500" : "border-[#D4D4D4]"
                                    }`}
                            />
                        </div>
                    </div>
                </div>
            )}

            {formError && (
                <p className="text-red-600 text-sm mt-8">
                    Please fill all educaiton and certification required fields before continuing.
                </p>
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
                    type="button"
                    onClick={() => {
                        handleSubmit(onSubmit)()
                        if (Object.keys(errors).length > 0) {
                            setFormError(true)
                        } else {
                            setFormError(false)
                        }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 
       bg-emerald-500 hover:bg-emerald-600"
                >
                    Next <IoArrowForward className="w-5 h-5" />
                </motion.button>

            </div>
        </form>
    );
}
