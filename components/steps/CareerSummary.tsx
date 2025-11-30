/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from "react-icons/fi";
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setCareerSummary } from '../../redux/formSlice';
import { validateCareerSummary } from '../../lib/validation';
import type { RootState } from '../../redux/store';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function CareerSummary({ onNext, onBack }: Props) {
    const dispatch = useDispatch();
    const savedData = useSelector((state: RootState) => state.form.formData.careerSummary);
    
    const [formData, setFormData] = useState({
        jobTitle: '',
        summary: ''
    });
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (savedData.jobTitle) {
            setFormData(savedData);
        }
    }, [savedData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateCareerSummary(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setErrors({});
        dispatch(setCareerSummary(formData));
        onNext(formData);
    };

    return (
        <div className="py-8 px-4 sm:px-6 md:px-16 lg:px-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#333333] mb-2">
                Your Career Overview
            </h2>
            <p className="text-[#777777] text-base sm:text-lg mb-8">
                A strong career summary will make a lasting impression on recruiters. Let&apos;s create a summary that highlights your experience and goals.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Job Title */}
                <div className="relative">
                    <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                        Job Title
                    </label>
                    <div className="relative">
                        <select
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className={`w-full p-3 sm:p-4 pr-12 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none ${errors.jobTitle ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        >
                            <option value="">Select your most recent or current job title</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Project Manager">Project Manager</option>
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={22} />
                    </div>
                    {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
                </div>

                {/* Summary */}
                <div>
                    <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                        Summary
                    </label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Write a brief summary of your career..."
                        className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none ${errors.summary ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                    />
                    {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <motion.button
                        type="button"
                        onClick={onBack}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                    >
                        <div className="w-full flex justify-center items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors gap-2">
                            <IoArrowBack className="w-5 h-5" /> Back
                        </div>
                    </motion.button>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex justify-center items-center gap-2"
                    >
                        Next <IoArrowForward className="w-5 h-5" />
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
