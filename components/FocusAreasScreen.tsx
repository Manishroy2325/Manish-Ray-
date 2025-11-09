
import React from 'react';
import { Workout } from '../types';
import { Target, Zap, Play } from 'lucide-react';

interface FocusAreasScreenProps {
    workouts: Workout[];
    onStartWorkout: (workout: Workout) => void;
}

const FocusAreasScreen: React.FC<FocusAreasScreenProps> = ({ workouts, onStartWorkout }) => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-blue-400 flex items-center gap-2"><Target /> Focus Areas</h1>
            <p className="text-slate-300">Target specific muscle groups with these specialized workouts.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workouts.map(workout => (
                    <div key={workout.title} className="bg-slate-800 rounded-lg shadow-lg p-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">{workout.title}</h2>
                            <div className="flex items-center text-slate-400 text-sm mb-4">
                                <Zap size={16} className="mr-2 text-yellow-400"/>
                                <span>{workout.exercises.length} Exercises</span>
                                <span className="mx-2">|</span>
                                <span>~{workout.totalCalories} kcal</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {Array.from(new Set(workout.exercises.flatMap(e => e.muscleGroups))).slice(0, 3).map(group => (
                                    <span key={group} className="bg-slate-700 text-xs font-semibold px-2 py-1 rounded-full">{group}</span>
                                ))}
                            </div>
                        </div>
                        <button 
                            onClick={() => onStartWorkout(workout)}
                            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                        >
                            <Play size={20} />
                            Start Workout
                        </button>
                    </div>
                ))}
            </div>
             <div className="text-center p-4">
                <p className="text-lg font-semibold text-yellow-400">FitFlow Pro Feature!</p>
                <p className="text-slate-400">Unlock more targeted workouts and challenges by upgrading.</p>
                <button className="mt-2 bg-yellow-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors">
                    Upgrade Now
                </button>
            </div>
        </div>
    );
}

export default FocusAreasScreen;
