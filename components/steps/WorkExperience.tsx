/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowForward } from "react-icons/io";
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkExperience } from '../../redux/formSlice';
import { validateWorkExperience } from '../../lib/validation';
import type { RootState } from '../../redux/store';
import Image from 'next/image';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function WorkExperience({ onNext, onBack }: Props) {
  const dispatch = useDispatch();
  const savedData = useSelector((state: RootState) => state.form.formData.workExperience);
  const latestWork = savedData?.length ? savedData[savedData.length - 1] : undefined;

  const [formData, setFormData] = useState({
    jobTitle: latestWork?.jobTitle || '',
    companyName: latestWork?.companyName || '',
    startDate: latestWork?.startDate || '',
    endDate: latestWork?.endDate || '',
    jobDescription: latestWork?.jobDescription || '',
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>(latestWork?.skills || []);
  const [achievementFile, setAchievementFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAchievementFile(e.target.files[0]);
      setErrors({ ...errors, achievementFile: undefined }); // clear file error if any
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateWorkExperience(formData);

    // Require all fields
    Object.keys(formData).forEach(key => {
      if (!formData[key as keyof typeof formData]) {
        validationErrors[key] = "This field is required";
      }
    });

    // Require achievement file
    if (!achievementFile) {
      validationErrors.achievementFile = "Achievement file is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Dispatch only serializable fields to Redux
    dispatch(addWorkExperience({
      ...formData,
      skills: selectedSkills,
      achievementFileName: achievementFile?.name // store file name in Redux, actual file stays local
    }));

    // Pass the actual file to parent
    onNext({ ...formData, skills: selectedSkills, achievementFile });
  };

  const handleSkip = () => {
    onNext({});
  };

  return (
    <div className="py-8 px-4 sm:px-6 md:px-16 lg:px-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#333333]">
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

      <p className="text-[#777777] text-base sm:text-lg mb-8">
        Highlight your work experience and skills. The more detail you provide, the better the AI can tailor your resume to match job opportunities.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Job Title */}
        <div>
          <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
            Job Title
          </label>
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g., Senior Software Engineer"
            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.jobTitle ? 'border-red-500' : 'border-[#D4D4D4]'}`}
            required
          />
          {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
            Company Name
          </label>
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g., Google Inc."
            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.companyName ? 'border-red-500' : 'border-[#D4D4D4]'}`}
            required
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Start Date</label>
            <input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.startDate ? 'border-red-500' : 'border-[#D4D4D4]'}`}
              required
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">End Date</label>
            <input
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              type="date"
              className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.endDate ? 'border-red-500' : 'border-[#D4D4D4]'}`}
              required
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Job Description/Responsibilities</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your responsibilities and achievements..."
            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none ${errors.jobDescription ? 'border-red-500' : 'border-[#D4D4D4]'}`}
            required
          />
          {errors.jobDescription && <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>}
        </div>

        {/* Achievements & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Achievements */}
          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Achievements</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-emerald-500 transition-colors">
              <input
                type="file"
                id="achievements"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="achievements" className="cursor-pointer">
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-500">Drop file or browse</p>
              </label>
              {achievementFile && (
                <Image
                  src={URL.createObjectURL(achievementFile)}
                  alt="Achievement"
                  className="mt-2 w-32 h-32 object-cover rounded mx-auto"
                  width={130}
                  height={130}
                />
              )}
              {errors.achievementFile && <p className="text-red-500 text-sm mt-1">{errors.achievementFile}</p>}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Skills</label>
            <div className="border border-gray-300 rounded-lg p-3 min-h-[180px]">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedSkills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="text-gray-500 hover:text-gray-700">×</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type a skill and press Enter"
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                    e.preventDefault();
                    const newSkill = e.currentTarget.value.trim();
                    if (!selectedSkills.includes(newSkill)) {
                      setSelectedSkills([...selectedSkills, newSkill]);
                    }
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
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
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
          >
            Next <IoArrowForward className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}