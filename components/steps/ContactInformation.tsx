/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FiChevronDown } from "react-icons/fi";
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function ContactInformation({ onNext, onBack }: Props) {
    const [formData, setFormData] = useState({
        linkedinProfile: '',
        personalWebsite: '',
        otherSocialMedia: 'Facebook',
        otherSocialMediaURL: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onNext(formData);
    };

    return (
        <div className="py-8 px-24">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-5xl font-semibold text-[#333333] mb-2">
                    Your Contact Information
                </h2>

            </div>

            <p className="text-[#777777] text-lg mb-8">
                Include additional contact details and social media links to showcase your professional presence.
            </p>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Profile
                    </label>
                    <input
                        name="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={handleChange}
                        placeholder="Enter your LinkedIn profile URL"
                        className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Personal Website/Portfolio
                    </label>
                    <input
                        name="personalWebsite"
                        value={formData.personalWebsite}
                        onChange={handleChange}
                        placeholder="Enter your personal website or portfolio URL"
                        className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Other Social Media
                        </label>

                        <div className="relative">
                            <select
                                name="otherSocialMedia"
                                value={formData.otherSocialMedia}
                                onChange={handleChange}
                                className="
        w-full p-4 pr-12
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

                            {/* Dropdown Icon */}
                            <FiChevronDown
                                className="
        absolute right-4 top-1/2 -translate-y-1/2
        text-gray-500 pointer-events-none
      "
                                size={20}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL
                        </label>
                        <input
                            name="otherSocialMediaURL"
                            value={formData.otherSocialMediaURL}
                            onChange={handleChange}
                            placeholder="Enter other social media profile (optional)"
                            className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-6 mt-8">
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