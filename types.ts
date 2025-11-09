
export enum FitnessLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export enum FitnessGoal {
  WeightLoss = 'Weight Loss',
  MuscleGain = 'Muscle Gain',
  FullBody = 'Full Body Fitness',
}

export interface Exercise {
  name: string;
  type: 'reps' | 'time';
  duration: number; // seconds for time, or number of reps
  calories: number;
  videoUrl?: string; // Placeholder for video demonstration
  muscleGroups: string[];
}

export interface Workout {
  title: string;
  exercises: Exercise[];
  totalCalories: number;
  level?: FitnessLevel;
}


export interface DailyWorkout {
  day: number;
  workout: Workout | null; // null for rest days
  isRestDay: boolean;
}

export interface WeeklyPlan {
  week: number;
  dailyWorkouts: DailyWorkout[];
  totalCalories: number;
}

export interface FourWeekPlan {
  [key: string]: WeeklyPlan[];
}

export interface WeightEntry {
  date: string; // ISO string
  weight: number; // in kg
}

export interface UserProfile {
  level: FitnessLevel;
  goal: FitnessGoal;
  height: number; // in cm
  progress: {
    workoutsCompleted: number;
    caloriesBurned: number;
    weightHistory: WeightEntry[];
    photos: {
      before: string | null;
      after: string | null;
    };
  };
}
