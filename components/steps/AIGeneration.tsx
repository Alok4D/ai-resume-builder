/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function AIGeneration({ onNext, onBack }: Props) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleGenerate = () => {
        setIsGenerating(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsGenerating(false);
                        onNext({ generated: true });
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };

    return (
        <div className="py-8 px-24">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-5xl font-semibold text-[#333333] mb-2">
                    AI Resume Magic
                </h2>
                <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors">
                    Generate
                </button>
            </div>

            <p className="text-[#777777] text-lg mb-8">
                Now, let&apos;s turn all the information you&apos;ve provided into a professional resume! Our AI will generate a polished version that showcases your strengths and matches industry standards.
            </p>

            <div className="space-y-6">
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                        AI is refining your resume...
                    </p>

                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="bg-emerald-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <motion.button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    whileHover={!isGenerating ? { scale: 1.02 } : {}}
                    whileTap={!isGenerating ? { scale: 0.98 } : {}}
                    className={`w-full px-6 py-4 rounded-lg font-medium text-white transition-all ${isGenerating
                        ? 'bg-emerald-400 cursor-not-allowed'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                        }`}
                >
                    {isGenerating ? 'Generating Resume...' : 'Generate Resume'}
                </motion.button>
            </div>
        </div>
    );
}