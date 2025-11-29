/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import PersonalInformation from '../../../components/steps/PersonalInformation';
import CareerSummary from '../../../components/steps/CareerSummary';
import WorkExperience from '../../../components/steps/WorkExperience';
import Certifications from '../../../components/steps/Certifications';
import ContactInformation from '../../../components/steps/ContactInformation';
import AIGeneration from '../../../components/steps/AIGeneration';

interface Step {
    id: number;
    label: string;
}

const steps: Step[] = [
    { id: 1, label: 'Personal Information' },
    { id: 2, label: 'Career Summary' },
    { id: 3, label: 'Work Experience' },
    { id: 4, label: 'Education & Certifications' },
    { id: 5, label: 'Contact Information' },
    { id: 6, label: 'AI Resume Generation' },
    { id: 7, label: 'Review & Download' }
];

export default function StepperPage() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [formData, setFormData] = useState<any>({});

    const goToStep = (stepId: number): void => {
        if (stepId <= currentStep || completedSteps.includes(stepId)) {
            setCurrentStep(stepId);
        }
    };

    const handleNext = (data: any): void => {
        setFormData((prev: any) => ({ ...prev, ...data }));

        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep]);
        }

        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = (): void => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInformation onNext={handleNext} onBack={handleBack} />;
            case 2:
                return <CareerSummary onNext={handleNext} onBack={handleBack} />;
            case 3:
                return <WorkExperience onNext={handleNext} onBack={handleBack} />;
            case 4:
                return <Certifications onNext={handleNext} onBack={handleBack} />;
            case 5:
                return <ContactInformation onNext={handleNext} onBack={handleBack} />;
            case 6:
                return <AIGeneration onNext={handleNext} onBack={handleBack} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div>
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full" style={{ zIndex: 0 }} />
                        <motion.div
                            className="absolute top-5 left-0 h-0.5 bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{
                                width: `${(Math.max(...completedSteps, currentStep) - 1) / (steps.length - 1) * 100}%`
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{ zIndex: 0 }}
                        />

                        {steps.map((step: Step, index: number) => {
                            const isCompleted: boolean = completedSteps.includes(step.id);
                            const isCurrent: boolean = currentStep === step.id;
                            const isAccessible: boolean = step.id <= currentStep || isCompleted;

                            return (
                                <div key={step.id} className="flex flex-col items-center relative" style={{ zIndex: 1 }}>
                                    <motion.button
                                        onClick={() => goToStep(step.id)}
                                        disabled={!isAccessible}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${isCompleted
                                            ? 'bg-emerald-500 text-white'
                                            : isCurrent
                                                ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                                                : isAccessible
                                                    ? 'bg-white border-2 border-gray-300 text-gray-400 hover:border-emerald-500 hover:text-emerald-500'
                                                    : 'bg-white border-2 border-gray-200 text-gray-300 cursor-not-allowed'
                                            }`}
                                        whileHover={isAccessible ? { scale: 1.1 } : {}}
                                        whileTap={isAccessible ? { scale: 0.95 } : {}}
                                    >
                                        {isCompleted ? (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Check className="w-5 h-5" />
                                            </motion.div>
                                        ) : (
                                            `0${step.id}`
                                        )}
                                    </motion.button>
                                    <motion.div
                                        className={`text-lg  mt-2 text-center max-w-40 ${isCurrent ? 'text-gray-900 font-medium' : 'text-[#333333]'
                                            }`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {step.label}
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}