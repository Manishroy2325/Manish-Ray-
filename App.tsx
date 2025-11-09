
import React, { useState, useCallback } from 'react';
import { FitnessLevel, FitnessGoal, UserProfile, Workout, DailyWorkout } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import WorkoutPlanScreen from './components/WorkoutPlanScreen';
import FocusAreasScreen from './components/FocusAreasScreen';
import ProgressTrackerScreen from './components/ProgressTrackerScreen';
import AIAssistantScreen from './components/AIAssistantScreen';
import WorkoutPlayer from './components/WorkoutPlayer';
import BottomNav from './components/BottomNav';
import { PLANS, FOCUS_AREAS_WORKOUTS } from './constants';
import { Dumbbell, BarChart3, Target, User, Bot } from 'lucide-react';

type Screen = 'dashboard' | 'plan' | 'focus' | 'progress' | 'coach';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const handleOnboardingComplete = useCallback((level: FitnessLevel, goal: FitnessGoal) => {
    setUserProfile({
      level,
      goal,
      progress: {
        workoutsCompleted: 0,
        caloriesBurned: 0,
        weightHistory: [],
        photos: { before: null, after: null },
      },
      height: 175 // default height in cm
    });
  }, []);

  const handleStartWorkout = useCallback((workout: Workout) => {
    setActiveWorkout(workout);
  }, []);

  const handleWorkoutComplete = useCallback((caloriesBurned: number) => {
    if (userProfile) {
      setUserProfile(prevProfile => {
        if (!prevProfile) return null;
        return {
          ...prevProfile,
          progress: {
            ...prevProfile.progress,
            workoutsCompleted: prevProfile.progress.workoutsCompleted + 1,
            caloriesBurned: prevProfile.progress.caloriesBurned + caloriesBurned,
          }
        };
      });
    }
    setActiveWorkout(null);
    setActiveScreen('progress');
  }, [userProfile]);


  const handleFinishWorkout = useCallback(() => {
    setActiveWorkout(null);
  }, []);


  const renderContent = () => {
    if (!userProfile) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }

    if (activeWorkout) {
      return <WorkoutPlayer workout={activeWorkout} onComplete={handleWorkoutComplete} onFinish={handleFinishWorkout} />;
    }

    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} onStartWorkout={handleStartWorkout} />;
      case 'plan':
        const userPlan = PLANS[userProfile.level];
        return <WorkoutPlanScreen plan={userPlan} onStartWorkout={handleStartWorkout} />;
      case 'focus':
        return <FocusAreasScreen workouts={FOCUS_AREAS_WORKOUTS} onStartWorkout={handleStartWorkout} />;
      case 'progress':
        return <ProgressTrackerScreen userProfile={userProfile} setUserProfile={setUserProfile} />;
      case 'coach':
        return <AIAssistantScreen />;
      default:
        return <Dashboard userProfile={userProfile} onStartWorkout={handleStartWorkout} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Dumbbell },
    { id: 'plan', label: 'Plan', icon: Target },
    { id: 'focus', label: 'Focus', icon: User },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'coach', label: 'AI Coach', icon: Bot },
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col">
      <main className="flex-grow pb-20">
        <div className="container mx-auto p-4">
          {renderContent()}
        </div>
      </main>
      {userProfile && !activeWorkout && (
        <BottomNav 
          items={navItems}
          activeScreen={activeScreen} 
          setActiveScreen={(screen) => setActiveScreen(screen as Screen)} 
        />
      )}
    </div>
  );
};

export default App;
