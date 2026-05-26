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

            // Create a temporary hidden iframe to isolate from Tailwind's global lab() variables
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '1000px';
            iframe.style.height = '0'; // Keep hidden visually
            iframe.style.border = 'none';
            document.body.appendChild(iframe);
            
            const doc = iframe.contentWindow?.document;
            if (!doc) throw new Error("Could not create iframe document");

            // Write the resume into the iframe WITHOUT global styles
            doc.open();
            doc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Resume</title>
                    <style>
                        body { margin: 0; padding: 0; background-color: #ffffff; }
                        /* Ensure background colors are captured by html2canvas */
                        * {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                        }
                    </style>
                </head>
                <body>
                    <div id="resume-capture-wrapper" style="width: 1000px; background: white;">
                        ${generatedResume}
                    </div>
                </body>
                </html>
            `);
            doc.close();

            // Wait a little for any images inside the iframe to load
            await new Promise(resolve => setTimeout(resolve, 800));

            const elementToCapture = doc.getElementById('resume-capture-wrapper');
            if (!elementToCapture) throw new Error("Could not find capture wrapper");

            // Capture the element inside the iframe using html2canvas
            const canvas = await html2canvas(elementToCapture, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 1000
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = 297; // A4 height in mm
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pdfWidth;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            pdf.save('Professional-Resume.pdf');

            // Cleanup
            document.body.removeChild(iframe);

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
