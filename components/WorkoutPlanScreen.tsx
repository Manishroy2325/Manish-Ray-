
import React, { useState } from 'react';
import { WeeklyPlan, Workout } from '../types';
import { Flame, Calendar, Clock, PlayCircle } from 'lucide-react';

interface WorkoutPlanScreenProps {
    plan: WeeklyPlan[];
    onStartWorkout: (workout: Workout) => void;
}

const WorkoutPlanScreen: React.FC<WorkoutPlanScreenProps> = ({ plan, onStartWorkout }) => {
    const [selectedWeek, setSelectedWeek] = useState(plan[0] || null);
    
    if (!plan || plan.length === 0) {
        return <div className="text-center p-8">No plan available for your level yet. Check back soon!</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-400">Your 4-Week Plan</h1>

            <div className="flex space-x-2 overflow-x-auto pb-2">
                {plan.map(week => (
                    week.totalCalories > 0 && // Only show weeks with content
                    <button
                        key={week.week}
                        onClick={() => setSelectedWeek(week)}
                        className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${selectedWeek?.week === week.week ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                        Week {week.week}
                    </button>
                ))}
            </div>

            {selectedWeek && (
                <div className="bg-slate-800 rounded-lg p-4 space-y-4 animate-fade-in">
                    <h2 className="text-2xl font-bold">Week {selectedWeek.week} Overview</h2>
                    <div className="flex items-center space-x-4 text-slate-300">
                        <div className="flex items-center space-x-2">
                            <Flame className="text-red-400" size={20} />
                            <span>~{selectedWeek.totalCalories} Kcal</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Calendar className="text-blue-400" size={20} />
                           <span>{selectedWeek.dailyWorkouts.filter(dw => !dw.isRestDay).length} workout days</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {selectedWeek.dailyWorkouts.map(dw => (
                            <div key={dw.day} className="bg-slate-700 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                   <div className="text-center font-bold bg-slate-600 rounded-full h-12 w-12 flex flex-col justify-center">
                                       <span className="text-xs">DAY</span>
                                       <span>{dw.day}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{dw.isRestDay ? 'Rest Day' : dw.workout?.title}</h3>
                                        {!dw.isRestDay && dw.workout && (
                                             <p className="text-sm text-slate-400">{dw.workout.exercises.length} exercises</p>
                                        )}
                                    </div>
                                </div>
                                {!dw.isRestDay && dw.workout ? (
                                    <button onClick={() => onStartWorkout(dw.workout!)} className="bg-green-500 p-3 rounded-full hover:bg-green-600 transition-colors">
                                        <PlayCircle size={24} />
                                    </button>
                                ) : (
                                   <span className="text-sm text-green-400 font-semibold">RECOVER</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkoutPlanScreen;
