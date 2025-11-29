/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { IoArrowBack } from 'react-icons/io5';
import { Download, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function ResumePreview({ onNext, onBack }: Props) {
    const generatedResume = useSelector((state: RootState) => state.form.generatedResume);
    const [error, setError] = useState('');

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
                    Review & Download
                </h2>
            </div>

            <p className="text-[#777777] text-lg mb-8">
                Your professional resume is ready! Review it below and download as PDF.
            </p>

            <div className="space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {generatedResume ? (
                    <>
                        <div id="full-resume-preview" className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
                            <div dangerouslySetInnerHTML={{ __html: generatedResume }} />
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
