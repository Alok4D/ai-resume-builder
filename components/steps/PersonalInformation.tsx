/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalInfo } from '../../redux/formSlice';
import { validatePersonalInfo } from '../../lib/validation';
import type { RootState } from '../../redux/store';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function PersonalInformation({ onNext, onBack }: Props) {
    const dispatch = useDispatch();
    const savedData = useSelector((state: RootState) => state.form.formData.personalInfo);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        country: 'Bangladesh',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (savedData.firstName) {
            setFormData(savedData);
        }
    }, [savedData]);

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
        dispatch(setPersonalInfo(formData));
        onNext(formData);
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

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                    >
                        <Link
                            href={'/'}
                            className="w-full flex justify-center items-center px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors gap-2"
                        >
                            <IoArrowBack className="w-5 h-5" /> Back
                        </Link>
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
