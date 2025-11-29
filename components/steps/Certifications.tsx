/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, addCertification } from '../../redux/formSlice';
import { validateEducation, validateCertification } from '../../lib/validation';
import type { RootState } from '../../redux/store';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function Certifications({ onNext, onBack }: Props) {
    const dispatch = useDispatch();
    const [showEducation, setShowEducation] = useState(true);

    const [educationData, setEducationData] = useState({
        degree: '',
        institutionName: '',
        major: '',
        startDate: '',
        endDate: ''
    });

    const [certificationData, setCertificationData] = useState({
        certificationTitle: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: ''
    });

    const [educationErrors, setEducationErrors] = useState<any>({});
    const [certificationErrors, setCertificationErrors] = useState<any>({});

    const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEducationData({ ...educationData, [e.target.name]: e.target.value });
    };

    const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCertificationData({ ...certificationData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (showEducation) {
            const validationErrors = validateEducation(educationData);
            if (Object.keys(validationErrors).length > 0) {
                setEducationErrors(validationErrors);
                return;
            }
            setEducationErrors({});
            dispatch(addEducation(educationData));
        } else {
            const validationErrors = validateCertification(certificationData);
            if (Object.keys(validationErrors).length > 0) {
                setCertificationErrors(validationErrors);
                return;
            }
            setCertificationErrors({});
            dispatch(addCertification(certificationData));
        }
        onNext({ education: educationData, certification: certificationData });
    };

    return (
        <div className="py-8 px-24">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-5xl font-semibold text-[#333333] mb-2">
                    {showEducation ? 'Your Educational Background' : 'Your Certifications'}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowEducation(true)}
                        className={`px-4 py-2 text-sm rounded transition-colors ${showEducation
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Education
                    </button>
                    <button
                        onClick={() => setShowEducation(false)}
                        className={`px-4 py-2 text-sm rounded transition-colors ${!showEducation
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Certifications
                    </button>
                </div>
            </div>

            <p className="text-[#777777] text-lg mb-8">
                Provide your academic qualifications and any relevant certifications to strengthen your resume.
            </p>

            {showEducation ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            Your Degree
                        </label>
                        <input
                            name="degree"
                            value={educationData.degree}
                            onChange={handleEducationChange}
                            placeholder="e.g., Bachelor's, Master's"
                            className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${educationErrors.degree ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {educationErrors.degree && <p className="text-red-500 text-sm mt-1">{educationErrors.degree}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xl font-medium text-[#101010] mb-2">
                                Institution Name
                            </label>
                            <input
                                name="institutionName"
                                value={educationData.institutionName}
                                onChange={handleEducationChange}
                                placeholder="Dhaka University"
                                className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${educationErrors.institutionName ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                            />
                            {educationErrors.institutionName && <p className="text-red-500 text-sm mt-1">{educationErrors.institutionName}</p>}
                        </div>

                        <div>
                            <label className="block text-xl font-medium text-[#101010] mb-2">
                                Major
                            </label>
                            <input
                                name="major"
                                value={educationData.major}
                                onChange={handleEducationChange}
                                placeholder="Electronic and Communication Engineering (ECE)"
                                className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${educationErrors.major ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                            />
                            {educationErrors.major && <p className="text-red-500 text-sm mt-1">{educationErrors.major}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            Graduation
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    name="startDate"
                                    value={educationData.startDate}
                                    onChange={handleEducationChange}
                                    type="date"
                                    placeholder="Start Date"
                                    className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    name="endDate"
                                    value={educationData.endDate}
                                    onChange={handleEducationChange}
                                    type="date"
                                    placeholder="End Date"
                                    className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                />
                            </div>
                        </div>
                    </div>



                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="text-emerald-500 text-base font-medium flex items-center gap-2 hover:text-emerald-600 transition-colors"
                    >
                        <span className="text-xl">+</span>
                        Add Another Degree
                    </motion.button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            Certification Title
                        </label>
                        <input
                            name="certificationTitle"
                            value={certificationData.certificationTitle}
                            onChange={handleCertificationChange}
                            placeholder="e.g., AWS Certified Solutions Architect"
                            className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${certificationErrors.certificationTitle ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {certificationErrors.certificationTitle && <p className="text-red-500 text-sm mt-1">{certificationErrors.certificationTitle}</p>}
                    </div>

                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            Issuing Organization
                        </label>
                        <input
                            name="issuingOrganization"
                            value={certificationData.issuingOrganization}
                            onChange={handleCertificationChange}
                            placeholder="e.g., Amazon Web Services"
                            className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${certificationErrors.issuingOrganization ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {certificationErrors.issuingOrganization && <p className="text-red-500 text-sm mt-1">{certificationErrors.issuingOrganization}</p>}
                    </div>

                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            Certificate Issue
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    name="issueDate"
                                    value={certificationData.issueDate}
                                    onChange={handleCertificationChange}
                                    type="date"
                                    placeholder="Issue Date"
                                    className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    name="expiryDate"
                                    value={certificationData.expiryDate}
                                    onChange={handleCertificationChange}
                                    type="date"
                                    placeholder="Expiry Date (if applicable)"
                                    className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="text-emerald-500 text-base font-medium flex items-center gap-2 hover:text-emerald-600 transition-colors"
                    >
                        <span className="text-xl">+</span>
                        Add Another Certification
                    </motion.button>
                </div>
            )}

            <div className="flex gap-4 pt-8 mt-8 border-t border-t-[#E0E0E0]">
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
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                    Next <IoArrowForward className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}