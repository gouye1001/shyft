import React from 'react';
import Logo from './Logo';

const LoadingScreen: React.FC = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="relative">
                {/* Glowing orb effect behind logo */}
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />

                <div className="relative flex flex-col items-center gap-6">
                    <Logo size="lg" className="animate-pulse" />

                    <div className="flex items-center gap-3 text-zinc-400">
                        <i className="fa-solid fa-circle-notch fa-spin text-xl text-blue-500" />
                        <span className="font-medium tracking-wide">Initializing...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
