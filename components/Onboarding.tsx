
import React, { useState } from 'react';
import { FitnessLevel, FitnessGoal } from '../types';

interface OnboardingProps {
  onComplete: (level: FitnessLevel, goal: FitnessGoal) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState<FitnessLevel | null>(null);
  const [goal, setGoal] = useState<FitnessGoal | null>(null);

  const handleLevelSelect = (selectedLevel: FitnessLevel) => {
    setLevel(selectedLevel);
    setStep(2);
  };

  const handleGoalSelect = (selectedGoal: FitnessGoal) => {
    setGoal(selectedGoal);
  };

  const handleStart = () => {
    if (level && goal) {
      onComplete(level, goal);
    }
  };

  const renderStepOne = () => (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-orange-400">Welcome to FitFlow!</h1>
      <p className="text-lg text-slate-300 mb-8">Let's start by choosing your current fitness level.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(FitnessLevel).map((l) => (
          <button
            key={l}
            onClick={() => handleLevelSelect(l)}
            className="p-8 bg-slate-800 rounded-lg shadow-lg hover:bg-orange-500 transition-colors duration-300 text-xl font-semibold"
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-400">What's Your Main Goal?</h1>
      <p className="text-lg text-slate-300 mb-8">This will help us personalize your workout plan.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.values(FitnessGoal).map((g) => (
          <button
            key={g}
            onClick={() => handleGoalSelect(g)}
            className={`p-8 rounded-lg shadow-lg transition-all duration-300 text-xl font-semibold ${
              goal === g ? 'bg-blue-500 ring-2 ring-white' : 'bg-slate-800 hover:bg-blue-600'
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <button
        onClick={handleStart}
        disabled={!goal}
        className="w-full md:w-1/2 bg-green-500 text-white font-bold py-4 px-8 rounded-lg text-2xl hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
      >
        Start Your Journey
      </button>
       <button onClick={() => setStep(1)} className="mt-4 text-slate-400 hover:text-white">
        Back
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
            {step === 1 ? renderStepOne() : renderStepTwo()}
        </div>
    </div>
  );
};

export default Onboarding;
