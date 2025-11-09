
import React, { useState, useEffect, useCallback } from 'react';
import { Workout, Exercise } from '../types';
import { ChevronLeft, ChevronRight, Pause, Play, X, Volume2 } from 'lucide-react';

interface WorkoutPlayerProps {
  workout: Workout;
  onComplete: (caloriesBurned: number) => void;
  onFinish: () => void;
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ workout, onComplete, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [timer, setTimer] = useState(0);

  const currentExercise = workout.exercises[currentIndex];
  const REST_DURATION = 15; // 15 seconds rest

  useEffect(() => {
    if (isResting) {
      setTimer(REST_DURATION);
    } else {
      if (currentExercise.type === 'time') {
        setTimer(currentExercise.duration);
      } else {
        setTimer(0); // For reps, no timer is needed
      }
    }
    setIsPaused(true); // Pause when moving to a new exercise/rest
  }, [currentIndex, isResting, currentExercise]);

  useEffect(() => {
    let interval: number | undefined;
    if (!isPaused && timer > 0) {
      interval = window.setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    if (timer === 0 && !isPaused) {
        if (currentExercise.type === 'time' || isResting) {
            handleNext();
        }
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, timer]);

  const handleNext = useCallback(() => {
    if (isResting) {
        setIsResting(false);
        if (currentIndex + 1 >= workout.exercises.length) {
            onComplete(workout.totalCalories);
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    } else {
        if (currentIndex < workout.exercises.length) {
            setIsResting(true);
        }
    }
  }, [currentIndex, isResting, workout.exercises.length, onComplete, workout.totalCalories]);

  const handlePrev = () => {
    setIsResting(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const progressPercentage = (currentIndex / workout.exercises.length) * 100;

  const getDisplayContent = () => {
    if (isResting) {
      return {
        title: "REST",
        image: "https://picsum.photos/seed/rest/600/400",
        instruction: `Next: ${workout.exercises[currentIndex]?.name || 'Workout Complete!'}`,
        timerValue: timer
      };
    }
    return {
      title: currentExercise.name,
      image: `https://picsum.photos/seed/${currentExercise.name.replace(/\s/g, '')}/600/400`,
      instruction: currentExercise.type === 'reps' ? `${currentExercise.duration} Reps` : "Get Ready!",
      timerValue: currentExercise.type === 'time' ? timer : null
    };
  };

  const { title, image, instruction, timerValue } = getDisplayContent();

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col p-4 z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold truncate">{workout.title}</h2>
        <button onClick={onFinish} className="p-2 bg-slate-800 rounded-full"><X size={20}/></button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-slate-400 mb-6">{instruction}</p>
        
        <div className="relative w-full max-w-md aspect-video mb-6">
            <img src={image} alt={title} className="rounded-lg object-cover w-full h-full shadow-lg"/>
            {timerValue !== null && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                     <p className="text-7xl font-mono font-bold text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>{timerValue}</p>
                 </div>
            )}
        </div>
      </div>
      
      {/* Coach Tip */}
      <div className="bg-slate-800 p-3 rounded-lg text-center mb-6">
        <p className="font-semibold flex items-center justify-center gap-2"><Volume2 className="text-yellow-400"/> Coach Tip:</p>
        <p className="text-sm text-slate-300">Keep your core engaged throughout the exercise.</p>
      </div>


      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        <button onClick={handlePrev} disabled={currentIndex === 0} className="p-4 bg-slate-800 rounded-full disabled:opacity-50"><ChevronLeft size={28} /></button>
        <button onClick={() => setIsPaused(!isPaused)} className="p-6 bg-orange-500 rounded-full shadow-lg">
          {isPaused ? <Play size={40} className="ml-1" /> : <Pause size={40} />}
        </button>
        <button onClick={isResting || currentExercise.type === 'time' ? handleNext : () => setIsResting(true)} className="p-4 bg-slate-800 rounded-full">
            {isResting || currentExercise.type === 'time' ? <ChevronRight size={28} /> : 'Done'}
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlayer;
