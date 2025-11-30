/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from "react-icons/fi";
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setContactInfo } from '../../redux/formSlice';
import { validateContactInfo } from '../../lib/validation';
import type { RootState } from '../../redux/store';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function ContactInformation({ onNext, onBack }: Props) {
    const dispatch = useDispatch();
    const savedData = useSelector((state: RootState) => state.form.formData.contactInfo);
    
    const [formData, setFormData] = useState({
        linkedinProfile: '',
        personalWebsite: '',
        otherSocialMedia: 'Facebook',
        otherSocialMediaURL: ''
    });
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (savedData.linkedinProfile) {
            setFormData(savedData);
        }
    }, [savedData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const validationErrors = validateContactInfo(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        dispatch(setContactInfo(formData));
        onNext(formData);
    };

    return (
        <div className="py-8 px-4 sm:px-6 md:px-16 lg:px-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#333333]">
                    Your Contact Information
                </h2>
            </div>

            <p className="text-[#777777] text-base sm:text-lg mb-8">
                Include additional contact details and social media links to showcase your professional presence.
            </p>

            <div className="space-y-6">
                {/* LinkedIn */}
                <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        LinkedIn Profile
                    </label>
                    <input
                        name="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={handleChange}
                        className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                            errors.linkedinProfile ? 'border-red-500' : 'border-[#D4D4D4]'
                        }`}
                    />
                    {errors.linkedinProfile && <p className="text-red-500 text-sm mt-1">{errors.linkedinProfile}</p>}
                </div>

                {/* Personal Website */}
                <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        Personal Website/Portfolio
                    </label>
                    <input
                        name="personalWebsite"
                        value={formData.personalWebsite}
                        onChange={handleChange}
                        className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                            errors.personalWebsite ? 'border-red-500' : 'border-[#D4D4D4]'
                        }`}
                    />
                    {errors.personalWebsite && <p className="text-red-500 text-sm mt-1">{errors.personalWebsite}</p>}
                </div>

                {/* Other Social Media */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            Other Social Media
                        </label>
                        <div className="relative">
                            <select
                                name="otherSocialMedia"
                                value={formData.otherSocialMedia}
                                onChange={handleChange}
                                className="
                                    w-full p-3 sm:p-4 pr-12
                                    text-[#333333]
                                    border border-[#D4D4D4]
                                    rounded-lg bg-[#fcfcfd]
                                    outline-none
                                    focus:ring-2 focus:ring-emerald-500
                                    focus:border-emerald-500
                                    transition-all duration-200
                                    appearance-none
                                    bg-white
                                "
                            >
                                <option value="Facebook">Facebook</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Instagram">Instagram</option>
                                <option value="GitHub">GitHub</option>
                                <option value="Behance">Behance</option>
                                <option value="Dribbble">Dribbble</option>
                            </select>
                            <FiChevronDown
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                size={20}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                            URL
                        </label>
                        <input
                            name="otherSocialMediaURL"
                            value={formData.otherSocialMediaURL}
                            onChange={handleChange}
                            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${
                                errors.otherSocialMediaURL ? 'border-red-500' : 'border-[#D4D4D4]'
                            }`}
                        />
                        {errors.otherSocialMediaURL && <p className="text-red-500 text-sm mt-1">{errors.otherSocialMediaURL}</p>}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-8">
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
    );
}
