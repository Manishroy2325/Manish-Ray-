
import React from 'react';
import { UserProfile, Workout } from '../types';
import { PLANS, FOCUS_AREAS_WORKOUTS } from '../constants';
import { Flame, Zap, BarChart, ArrowRight } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
  onStartWorkout: (workout: Workout) => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; value: string | number; label: string; color: string }> = ({ icon, value, label, color }) => (
    <div className={`bg-slate-800 p-4 rounded-lg flex items-center space-x-4 shadow-lg`}>
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-slate-400">{label}</p>
        </div>
    </div>
);

const WorkoutCard: React.FC<{ workout: Workout; onStart: (workout: Workout) => void }> = ({ workout, onStart }) => (
    <div className="bg-slate-800 p-4 rounded-lg flex justify-between items-center shadow-md hover:bg-slate-700 transition-colors cursor-pointer" onClick={() => onStart(workout)}>
        <div>
            <h4 className="font-bold text-lg">{workout.title}</h4>
            <p className="text-sm text-slate-400">{workout.exercises.length} Exercises | ~{workout.totalCalories} kcal</p>
        </div>
        <ArrowRight className="text-orange-400" />
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ userProfile, onStartWorkout }) => {
  const nextWorkout = PLANS[userProfile.level]?.[0]?.dailyWorkouts.find(dw => !dw.isRestDay)?.workout;
  const quickWorkout = FOCUS_AREAS_WORKOUTS[0];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Hello!</h1>
        <p className="text-slate-300">Ready to crush your goals today?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<Flame size={24} />} value={userProfile.progress.caloriesBurned} label="Total Calories" color="bg-red-500" />
        <StatCard icon={<Zap size={24} />} value={userProfile.progress.workoutsCompleted} label="Workouts Done" color="bg-blue-500" />
        <StatCard icon={<BarChart size={24} />} value={userProfile.level} label="Your Level" color="bg-green-500" />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Your Next Workout</h3>
        {nextWorkout ? (
            <WorkoutCard workout={nextWorkout} onStart={onStartWorkout} />
        ) : (
            <p>No workout scheduled. Great job!</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Quick Start</h3>
        {quickWorkout && <WorkoutCard workout={quickWorkout} onStart={onStartWorkout} />}
      </div>
    </div>
  );
};

export default Dashboard;
