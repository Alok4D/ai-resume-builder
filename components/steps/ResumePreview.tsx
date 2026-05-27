/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { IoArrowBack } from 'react-icons/io5';
import { Download, RefreshCw } from 'lucide-react';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function ResumePreview({ onNext, onBack }: Props) {
    
    const generatedResume = useSelector((state: RootState) => state.form.generatedResume);

    const handleDownloadPDF = async () => {
        if (!generatedResume) return;
        
        try {
            // Dynamically import libraries
            const html2pdf = (await import('html2pdf.js')).default;

            // Create a temporary container in the main document
            const tempContainer = document.createElement('div');
            // Hide it visually but keep it in the layout so html2canvas can read it
            tempContainer.style.position = 'absolute';
            tempContainer.style.top = '0';
            tempContainer.style.left = '0';
            tempContainer.style.width = '800px';
            tempContainer.style.zIndex = '-10000';
            tempContainer.style.opacity = '0';
            tempContainer.style.pointerEvents = 'none';
            
            // Clean up html and body tags from generated resume
            const cleanHtml = generatedResume.replace(/<!doctype html>|<html[^>]*>|<\/html>|<body>|<\/body>/gi, '');
            tempContainer.innerHTML = cleanHtml;
            document.body.appendChild(tempContainer);

            // Wait for images to load
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Find the resume container or use the wrapper
            let elementToCapture = tempContainer.querySelector('.resume-container') as HTMLElement;
            if (!elementToCapture) {
                elementToCapture = tempContainer;
            }

            // Force print styles directly on the element to ensure no blank spaces
            elementToCapture.style.margin = '0';
            elementToCapture.style.boxShadow = 'none';
            elementToCapture.style.width = '100%';

            const opt = {
                margin:       0,
                filename:     'Professional-Resume.pdf',
                image:        { type: 'jpeg' as const, quality: 1.0 },
                html2canvas:  { scale: 2, useCORS: true, windowWidth: 800, scrollY: 0, scrollX: 0 },
                jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
                pagebreak:    { mode: ['css', 'legacy'] }
            };

            await html2pdf().set(opt).from(elementToCapture).save();

            // Cleanup
            document.body.removeChild(tempContainer);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Sorry, there was an error downloading the PDF. Please try again.');
        }
    };

    return (
        <div className="py-8 px-4 sm:px-6 md:px-16 lg:px-24">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-5xl font-semibold text-[#333333] mb-2">
                    Review & Download
                </h2>
            </div>

            <p className="text-[#777777] text-lg mb-8">
                Your professional resume is ready! Review it below and download as PDF.
            </p>

            <div className="space-y-6">

                {generatedResume ? (
                    <>
                        <div id="full-resume-preview" className="bg-white p-4 sm:p-8 border border-gray-200 rounded-lg shadow-sm overflow-x-auto w-full">
                            <div className="w-full max-w-[1000px] mx-auto [&_.resume-container]:!w-full [&_.resume-container]:!mx-auto" dangerouslySetInnerHTML={{ __html: generatedResume }} />
                        </div>

                        <div className="flex gap-4">
                            <motion.button
                                type="button"
                                onClick={onBack}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" /> Regenerate
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={handleDownloadPDF}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" /> Download PDF
                            </motion.button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No resume generated yet</p>
                        <motion.button
                            type="button"
                            onClick={onBack}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <IoArrowBack className="w-5 h-5" /> Go Back to Generate
                        </motion.button>
                    </div>
                )}
            </div>
        </div>
    );
}
