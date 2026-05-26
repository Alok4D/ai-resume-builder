/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalInfo } from '../../redux/formSlice';
import { validatePersonalInfo } from '../../lib/validation';
import type { RootState } from '../../redux/store';
import Image from 'next/image';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function PersonalInformation({ onNext, onBack }: Props) {
    const dispatch = useDispatch();
    const savedData = useSelector((state: RootState) => state.form.formData.personalInfo);

    const [formData, setFormData] = useState({
        firstName: savedData?.firstName || "",
        lastName:  savedData?.lastName ||'',
        phone: savedData?.phone || '',
        email: savedData?.email || '',
        country: 'Bangladesh',
        address: savedData?.address || '',
        city: savedData?.city || '',
        state: savedData?.state || '',
        zipCode: savedData?.zipCode || '',
        profilePicture: savedData?.profilePicture || '',
        languages: savedData?.languages || []
    });
    const [errors, setErrors] = useState<any>({});
    
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(savedData?.languages || []);

    const removeLanguage = (lang: string) => {
        setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePicture: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validatePersonalInfo(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        const finalData = { ...formData, languages: selectedLanguages };
        dispatch(setPersonalInfo(finalData));
        onNext(finalData);
    };

    return (
        <div className="py-8 px-4 sm:px-6 md:px-16 lg:px-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#333333] mb-2">
                Tell Us About Yourself
            </h2>
            <p className="text-[#777777] text-base sm:text-lg mb-8">
                Fill in your personal details so we can tailor your resume perfectly to your career goals.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Profile Picture */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 mb-4">
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                            {formData.profilePicture ? (
                                <Image src={formData.profilePicture} alt="Profile" width={96} height={96} className="object-cover w-full h-full" />
                            ) : (
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            First Name
                        </label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.firstName ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            Last Name
                        </label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.lastName ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            Phone Number
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.phone ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 sm:p-4 text-[#333333] border rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-[#D4D4D4]'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                </div>

                {/* Country & Address */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    <div className="md:col-span-4">
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            Country/Region
                        </label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full p-3 sm:p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none"
                        >
                            <option>Bangladesh</option>
                            <option>India</option>
                            <option>USA</option>
                        </select>
                    </div>

                    <div className="md:col-span-8">
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            Address
                        </label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 sm:p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* City, State, ZIP */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            City
                        </label>
                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-3 sm:p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            State
                        </label>
                        <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full p-3 sm:p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">
                            ZIP Code
                        </label>
                        <input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="w-full p-3 sm:p-4 text-[#333333] border border-[#D4D4D4] rounded-lg bg-[#fcfcfd] outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Languages */}
                <div>
                    <label className="block text-lg sm:text-xl font-medium text-[#101010] mb-2">Languages</label>
                    <div className="border border-gray-300 rounded-lg p-3 min-h-[100px] bg-[#fcfcfd]">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedLanguages.map((lang) => (
                                <span key={lang} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full">
                                    {lang}
                                    <button type="button" onClick={() => removeLanguage(lang)} className="text-emerald-600 hover:text-emerald-900">×</button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Type a language (e.g., English) and press Enter"
                            className="w-full mt-2 p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                                    e.preventDefault();
                                    const newLang = e.currentTarget.value.trim();
                                    if (!selectedLanguages.includes(newLang)) {
                                        setSelectedLanguages([...selectedLanguages, newLang]);
                                    }
                                    e.currentTarget.value = "";
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <motion.button
                        type="button"
                        onClick={onBack}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex justify-center items-center gap-2"
                    >
                        <IoArrowBack className="w-5 h-5" /> Back
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
