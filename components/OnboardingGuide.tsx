import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface OnboardingGuideProps {
    userName: string;
    onComplete: () => void;
    onDismiss: () => void;
}

const ONBOARDING_STEPS = [
    {
        id: 1,
        title: 'Welcome to Shyft',
        description: 'Your field service command center. Let us show you around.',
        icon: 'fa-hand-wave',
        iconColor: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
    },
    {
        id: 2,
        title: 'Schedule Jobs',
        description: 'Create and manage jobs for your team. Assign technicians and track progress.',
        icon: 'fa-calendar-plus',
        iconColor: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        action: 'Create Job',
        actionRoute: '/dashboard',
    },
    {
        id: 3,
        title: 'Manage Your Team',
        description: 'Add team members, assign roles, and monitor availability in real-time.',
        icon: 'fa-users-gear',
        iconColor: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        action: 'Add Team Member',
        actionRoute: '/dashboard',
    },
    {
        id: 4,
        title: 'Track Analytics',
        description: 'View revenue, job completion rates, and team performance metrics.',
        icon: 'fa-chart-line',
        iconColor: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        action: 'View Analytics',
        actionRoute: '/dashboard',
    },
    {
        id: 5,
        title: 'You\'re All Set!',
        description: 'Start managing your field operations like a pro. Need help? We\'re here 24/7.',
        icon: 'fa-rocket',
        iconColor: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/20',
        action: 'Get Started',
        isFinal: true,
    },
];

const OnboardingGuide: React.FC<OnboardingGuideProps> = ({ userName, onComplete, onDismiss }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const step = ONBOARDING_STEPS[currentStep];
    const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

    const handleNext = () => {
        if (currentStep < ONBOARDING_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        setIsVisible(false);
        setTimeout(() => {
            onComplete();
        }, 300);
    };

    const handleAction = () => {
        if (step.isFinal) {
            handleComplete();
        } else if (step.actionRoute) {
            navigate(step.actionRoute);
        }
        handleNext();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onDismiss}
            />

            {/* Modal */}
            <div className={`relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                {/* Progress Bar */}
                <div className="h-1 bg-zinc-800">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-500">Step {currentStep + 1} of {ONBOARDING_STEPS.length}</span>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto rounded-2xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center mb-6`}>
                        <i className={`fa-solid ${step.icon} text-3xl ${step.iconColor}`} />
                    </div>

                    {/* Text */}
                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                        {currentStep === 0 ? `Hey ${userName.split(' ')[0]}! 👋` : step.title}
                    </h2>
                    <p className="text-zinc-400 leading-relaxed max-w-sm mx-auto">
                        {step.description}
                    </p>

                    {/* Action Button */}
                    {step.action && (
                        <button
                            onClick={handleAction}
                            className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${step.isFinal
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
                                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                }`}
                        >
                            <i className={`fa-solid ${step.isFinal ? 'fa-rocket' : 'fa-arrow-right'} text-sm`} />
                            {step.action}
                        </button>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className="flex items-center justify-between p-6 border-t border-white/10 bg-zinc-900/50">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentStep === 0
                                ? 'text-zinc-600 cursor-not-allowed'
                                : 'text-zinc-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <i className="fa-solid fa-chevron-left text-sm" />
                        Back
                    </button>

                    {/* Step Dots */}
                    <div className="flex items-center gap-2">
                        {ONBOARDING_STEPS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentStep(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentStep
                                        ? 'w-6 bg-white'
                                        : i < currentStep
                                            ? 'bg-white/50'
                                            : 'bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-white/10 hover:bg-white/20 font-medium transition-colors"
                    >
                        {currentStep === ONBOARDING_STEPS.length - 1 ? 'Finish' : 'Next'}
                        <i className="fa-solid fa-chevron-right text-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingGuide;
