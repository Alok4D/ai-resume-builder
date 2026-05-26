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
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            const iframe = document.createElement('iframe');
            iframe.style.position = 'fixed';
            iframe.style.top = '-10000px'; // Hide off-screen
            iframe.style.left = '0';
            iframe.style.width = '800px'; // Exact A4 width approximation
            iframe.style.height = '5000px'; 
            iframe.style.border = 'none';
            document.body.appendChild(iframe);
            
            const doc = iframe.contentWindow?.document;
            if (!doc) throw new Error("Could not create iframe document");

            doc.open();
            doc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Resume</title>
                    <style>
                        html, body { 
                            margin: 0; 
                            padding: 0; 
                            background-color: #ffffff; 
                            width: 800px; 
                            overflow-x: hidden; 
                        }
                        * {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                            box-sizing: border-box;
                        }
                        #resume-capture-wrapper { 
                            width: 800px; 
                            background: white; 
                            overflow: hidden; 
                        }
                        .item-block { page-break-inside: avoid; break-inside: avoid; margin-bottom: 20px; }
                        h1, h2, h3, h4, .section-title, .right-section-title { page-break-after: avoid; break-after: avoid; }
                        ul, li { page-break-inside: avoid; break-inside: avoid; }
                        
                        /* Force text wrapping to prevent right side cutoff */
                        p, span, div, a, li { white-space: normal; word-wrap: break-word; overflow-wrap: break-word; }
                    </style>
                </head>
                <body>
                    <div id="resume-capture-wrapper">
                        ${generatedResume}
                    </div>
                </body>
                </html>
            `);
            doc.close();

            // Wait a little for any images inside the iframe to load
            await new Promise(resolve => setTimeout(resolve, 1000));

            const elementToCapture = doc.getElementById('resume-capture-wrapper');
            if (!elementToCapture) throw new Error("Could not find capture wrapper");

            const html2pdf = (await import('html2pdf.js')).default;

            const opt = {
                margin:       0,
                filename:     'Professional-Resume.pdf',
                image:        { type: 'jpeg', quality: 1.0 }, // Changed to JPEG with max quality to avoid png scale bugs
                html2canvas:  { scale: 2, useCORS: true, windowWidth: 800 },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
            };

            await html2pdf().set(opt).from(elementToCapture).save();

            // Cleanup
            document.body.removeChild(iframe);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Sorry, there was an error downloading the PDF. Please try again.');
        }
    };

    return (
        <div className="py-8 px-4 sm:px-6 md:px-16 lg:px-24 w-full mx-auto">
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
                        <div id="full-resume-preview" className="bg-white p-4 sm:p-8 border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
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
