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

export default function CareerSummary({ onNext, onBack }: Props) {
    const [formData, setFormData] = useState({
        jobTitle: '',
        summary: 'An experienced marketing professional with over 5 years of expertise in digital marketing, specializing in SEO, social media strategies, and content creation.'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(formData);
    };

    return (
        <div className="py-8 px-24">
            <h2 className="text-5xl font-semibold text-[#333333] mb-2">
                Your Career Overview
            </h2>
            <p className="text-[#777777] text-lg mb-8">
                A strong career summary will make a lasting impression on recruiters. Let&apos;s create a summary that highlights your experience and goals.
            </p>

            <div className="space-y-6">
              <div className="relative">
  <label className="block text-xl font-medium text-[#101010] mb-2">
    Job Title
  </label>

  <div className="relative">
    <select
      name="jobTitle"
      value={formData.jobTitle}
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
      "
    >
      <option value="">Select your most recent or current job title</option>
      <option value="Frontend Developer">Frontend Developer</option>
      <option value="Backend Developer">Backend Developer</option>
      <option value="Full Stack Developer">Full Stack Developer</option>
      <option value="UI/UX Designer">UI/UX Designer</option>
      <option value="Project Manager">Project Manager</option>
    </select>

    {/* Dropdown Arrow Icon */}
    <FiChevronDown
      className="
        absolute right-4 top-1/2 -translate-y-1/2 
        text-gray-500 pointer-events-none
      "
      size={22}
    />
  </div>
</div>

                <div>
                    <label className="block text-xl font-medium text-[#101010] mb-2">
                        Summary
                    </label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows={6}
                        className="w-full p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                    />
                </div>

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