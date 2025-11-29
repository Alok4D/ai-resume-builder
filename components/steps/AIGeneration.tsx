/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import  { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setGeneratedResume } from '../../redux/formSlice';
import { generateResume } from '../../app/actions/generateResume';
import type { RootState } from '../../redux/store';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';


interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function AIGeneration({ onNext, onBack }: Props) {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form.formData);
    const savedResume = useSelector((state: RootState) => state.form.generatedResume);
    
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [generatedResume, setLocalGeneratedResume] = useState(savedResume);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setIsGenerating(true);
        setProgress(0);
        setError('');

        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 5, 90));
        }, 200);

        try {
            const result = await generateResume(formData);
            
            clearInterval(progressInterval);
            setProgress(100);
            
            if (result.success && result.resume) {
                setLocalGeneratedResume(result.resume);
                dispatch(setGeneratedResume(result.resume));
            } else {
                setError(result.error || 'Failed to generate resume');
            }
        } catch (err) {
            clearInterval(progressInterval);
            setError('An error occurred while generating resume');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow && generatedResume) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Resume</title>
                    <style>
                        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                        @media print {
                            body { margin: 0; }
                        }
                    </style>
                </head>
                <body>
                    ${generatedResume}
                    <script>
                        window.onload = function() {
                            window.print();
                        }
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    return (
        <div className="py-8 px-24">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-5xl font-semibold text-[#333333] mb-2">
                    AI Resume Magic
                </h2>
            </div>

            <p className="text-[#777777] text-lg mb-8">
                Now, let&apos;s turn all the information you&apos;ve provided into a professional resume! Our AI will generate a polished version that showcases your strengths and matches industry standards.
            </p>

            <div className="space-y-6">
                {isGenerating && (
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">
                            AI is refining your resume... {progress}%
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
                )}

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <motion.button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating || !!generatedResume}
                    whileHover={!isGenerating && !generatedResume ? { scale: 1.02 } : {}}
                    whileTap={!isGenerating && !generatedResume ? { scale: 0.98 } : {}}
                    className={`w-full px-6 py-4 rounded-lg font-medium text-white transition-all ${isGenerating || generatedResume
                        ? 'bg-emerald-400 cursor-not-allowed'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                        }`}
                >
                    {isGenerating ? 'Generating Resume...' : generatedResume ? '✓ Resume Generated Successfully' : 'Generate Resume with AI'}
                </motion.button>

                {generatedResume && (
                    <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                        <div className="text-emerald-600 text-5xl mb-3">✓</div>
                        <h3 className="text-xl font-semibold text-emerald-900 mb-2">Resume Generated Successfully!</h3>
                        <p className="text-emerald-700">Click "View Full Resume" below to see and download your professional resume.</p>
                    </div>
                )}

                <div className="flex gap-4 pt-6 border-t">
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
                        onClick={() => generatedResume ? onNext({ generated: true }) : null}
                        disabled={!generatedResume}
                        whileHover={generatedResume ? { scale: 1.02 } : {}}
                        whileTap={generatedResume ? { scale: 0.98 } : {}}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                            generatedResume 
                                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        View Full Resume <IoArrowForward className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}