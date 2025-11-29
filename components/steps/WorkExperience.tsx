/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowForward } from "react-icons/io";
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkExperience } from '../../redux/formSlice';
import { validateWorkExperience } from '../../lib/validation';
import type { RootState } from '../../redux/store';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function WorkExperience({ onNext, onBack }: Props) {
    const dispatch = useDispatch();
    const savedData = useSelector((state: RootState) => state.form.formData.workExperience);
    
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        jobDescription: '',
    });
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const removeSkill = (skill: string) => {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateWorkExperience(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setErrors({});
        dispatch(addWorkExperience({ ...formData, skills: selectedSkills }));
        onNext({ ...formData, skills: selectedSkills });
    };

    const handleSkip = () => {
        onNext({});
    };

    return (
        <div className="py-8 px-24">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-5xl font-semibold text-[#333333] mb-2">
                    Your Work Experience & Skills
                </h2>
                <button
                    onClick={handleSkip}
                    type="button"
                    className="px-4 py-2 text-[#101010] text-md bg-[#F5F5F5] rounded-md hover:text-gray-800 transition-colors flex items-center gap-1"
                >
                    Skip <span><IoIosArrowForward /></span>
                </button>
            </div>

            <p className="text-[#777777] text-lg mb-8">
                Highlight your work experience and skills. The more detail you provide, the better the AI can tailor your resume to match job opportunities.
            </p>

            <div className="space-y-6">
                <div>
                    <label className="block text-xl font-medium text-[#101010] mb-2">
                        Job Title
                    </label>
                    <input
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g., Senior Software Engineer"
                        className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.jobTitle ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                    />
                    {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
                </div>

                <div>
                    <label className="block text-xl font-medium text-[#101010] mb-2">
                        Company Name
                    </label>
                    <input
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g., Google Inc."
                        className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.companyName ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            Start Date
                        </label>
                        <input
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            type="date"
                            className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.startDate ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                    </div>
                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            End Date
                        </label>
                        <input
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            type="date"
                            className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.endDate ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-xl font-medium text-[#101010] mb-2">
                        Job Description/Responsibilities
                    </label>
                    <textarea
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe your responsibilities and achievements..."
                        className={`w-full p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none ${errors.jobDescription ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                    />
                    {errors.jobDescription && <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            Achievements
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                            <input type="file" id="achievements" className="hidden" />
                            <label htmlFor="achievements" className="cursor-pointer">
                                <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-sm text-gray-500">Drop file or browse</p>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xl font-medium text-[#101010] mb-2">
                            Skills
                        </label>
                        <div className="border border-gray-300 rounded-lg p-3 min-h-[180px]">
                            <div className="flex flex-wrap gap-2">
                                {selectedSkills.map((skill) => (
                                    <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                        {skill}
                                        <button type="button" onClick={() => removeSkill(skill)} className="text-gray-500 hover:text-gray-700">×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-emerald-500 text-sm font-medium flex items-center gap-2 hover:text-emerald-600"
                >
                    <span className="text-lg">+</span>
                    Add Another Work Experience
                </motion.button>

                <div className="flex gap-4 pt-6">
                    <motion.button
                        type="button"
                        onClick={onBack}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                    >
                        <IoArrowBack className="w-5 h-5" /> Back
                    </motion.button>
                    <motion.button
                        type="button"
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                        Next <IoArrowForward className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}