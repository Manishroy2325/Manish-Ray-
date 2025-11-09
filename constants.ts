
import { FourWeekPlan, Workout } from './types';
import { FitnessLevel } from './types';

const beginnerExercises = {
    jumpingJacks: { name: 'Jumping Jacks', type: 'time', duration: 30, calories: 10, muscleGroups: ['Full Body'] },
    pushUps: { name: 'Push Ups (Knees)', type: 'reps', duration: 10, calories: 5, muscleGroups: ['Chest', 'Arms'] },
    squats: { name: 'Squats', type: 'reps', duration: 15, calories: 8, muscleGroups: ['Legs'] },
    plank: { name: 'Plank', type: 'time', duration: 30, calories: 5, muscleGroups: ['Abs'] },
    lunges: { name: 'Lunges', type: 'reps', duration: 12, calories: 7, muscleGroups: ['Legs'] },
    highKnees: { name: 'High Knees', type: 'time', duration: 30, calories: 9, muscleGroups: ['Legs', 'Full Body'] },
    crunches: { name: 'Crunches', type: 'reps', duration: 20, calories: 6, muscleGroups: ['Abs'] },
};

const intermediateExercises = {
    ...beginnerExercises,
    pushUps: { name: 'Push Ups', type: 'reps', duration: 15, calories: 8, muscleGroups: ['Chest', 'Arms'] },
    burpees: { name: 'Burpees', type: 'reps', duration: 10, calories: 15, muscleGroups: ['Full Body'] },
    plank: { name: 'Plank', type: 'time', duration: 60, calories: 10, muscleGroups: ['Abs'] },
    jumpSquats: { name: 'Jump Squats', type: 'reps', duration: 15, calories: 12, muscleGroups: ['Legs'] },
};

const advancedExercises = {
    ...intermediateExercises,
    burpees: { name: 'Burpees', type: 'reps', duration: 15, calories: 20, muscleGroups: ['Full Body'] },
    pistolSquats: { name: 'Pistol Squats', type: 'reps', duration: 10, calories: 15, muscleGroups: ['Legs'] },
    pullUps: { name: 'Pull Ups (if bar available)', type: 'reps', duration: 8, calories: 12, muscleGroups: ['Back', 'Arms'] },
    handstandPushups: { name: 'Handstand Pushups (Wall)', type: 'reps', duration: 5, calories: 18, muscleGroups: ['Arms', 'Shoulders'] },
};

const createWorkout = (title: string, exercises: any[], level?: FitnessLevel): Workout => ({
    title,
    exercises,
    totalCalories: exercises.reduce((sum, ex) => sum + ex.calories * 2, 0), // Assuming 2 sets
    level
});

const beginnerPlanWorkouts = {
    day1: createWorkout('Full Body Basics', [beginnerExercises.jumpingJacks, beginnerExercises.squats, beginnerExercises.pushUps, beginnerExercises.plank], FitnessLevel.Beginner),
    day2: createWorkout('Core & Legs', [beginnerExercises.highKnees, beginnerExercises.lunges, beginnerExercises.crunches, beginnerExercises.plank], FitnessLevel.Beginner),
    day3: createWorkout('Full Body Blast', [beginnerExercises.jumpingJacks, beginnerExercises.squats, beginnerExercises.pushUps, beginnerExercises.lunges], FitnessLevel.Beginner),
};

const intermediatePlanWorkouts = {
    day1: createWorkout('Full Body Power', [intermediateExercises.burpees, intermediateExercises.jumpSquats, intermediateExercises.pushUps, intermediateExercises.plank], FitnessLevel.Intermediate),
    day2: createWorkout('Core Crusher', [intermediateExercises.crunches, intermediateExercises.highKnees, { ...intermediateExercises.plank, duration: 90 }, intermediateExercises.burpees], FitnessLevel.Intermediate),
    day3: createWorkout('Legs & Arms', [intermediateExercises.jumpSquats, intermediateExercises.lunges, intermediateExercises.pushUps, { name: 'Diamond Pushups', type: 'reps', duration: 10, calories: 9, muscleGroups: ['Arms', 'Chest'] }], FitnessLevel.Intermediate),
};

const advancedPlanWorkouts = {
    day1: createWorkout('Explosive Power', [advancedExercises.burpees, advancedExercises.pistolSquats, advancedExercises.handstandPushups, { ...advancedExercises.plank, duration: 120 }], FitnessLevel.Advanced),
    day2: createWorkout('Advanced Core', [{name: 'V-Ups', type: 'reps', duration: 20, calories: 15, muscleGroups: ['Abs']}, {name: 'Hanging Leg Raises', type: 'reps', duration: 15, calories: 18, muscleGroups: ['Abs']}, advancedExercises.burpees], FitnessLevel.Advanced),
    day3: createWorkout('Strength & Endurance', [advancedExercises.pullUps, advancedExercises.pistolSquats, advancedExercises.handstandPushups, advancedExercises.jumpSquats], FitnessLevel.Advanced),
};


export const PLANS: FourWeekPlan = {
  [FitnessLevel.Beginner]: [
    { week: 1, totalCalories: 1780, dailyWorkouts: [
      { day: 1, workout: beginnerPlanWorkouts.day1, isRestDay: false },
      { day: 2, workout: beginnerPlanWorkouts.day2, isRestDay: false },
      { day: 3, workout: null, isRestDay: true },
      { day: 4, workout: beginnerPlanWorkouts.day1, isRestDay: false },
      { day: 5, workout: beginnerPlanWorkouts.day3, isRestDay: false },
      { day: 6, workout: null, isRestDay: true },
      { day: 7, workout: beginnerPlanWorkouts.day2, isRestDay: false },
    ]},
    // Weeks 2, 3, 4 would be similar with progressive overload
    { week: 2, totalCalories: 2207, dailyWorkouts: [
      { day: 1, workout: {...beginnerPlanWorkouts.day1, title: "W2: Full Body Basics+"}, isRestDay: false },
      { day: 2, workout: {...beginnerPlanWorkouts.day2, title: "W2: Core & Legs+"}, isRestDay: false },
      { day: 3, workout: null, isRestDay: true },
      { day: 4, workout: {...beginnerPlanWorkouts.day1, title: "W2: Full Body Basics+"}, isRestDay: false },
      { day: 5, workout: {...beginnerPlanWorkouts.day3, title: "W2: Full Body Blast+"}, isRestDay: false },
      { day: 6, workout: null, isRestDay: true },
      { day: 7, workout: {...beginnerPlanWorkouts.day2, title: "W2: Core & Legs+"}, isRestDay: false },
    ]},
    { week: 3, totalCalories: 2860, dailyWorkouts: [/* ... */] },
    { week: 4, totalCalories: 3470, dailyWorkouts: [/* ... */] },
  ],
  [FitnessLevel.Intermediate]: [
    { week: 1, totalCalories: 2500, dailyWorkouts: [
      { day: 1, workout: intermediatePlanWorkouts.day1, isRestDay: false },
      { day: 2, workout: intermediatePlanWorkouts.day2, isRestDay: false },
      { day: 3, workout: null, isRestDay: true },
      { day: 4, workout: intermediatePlanWorkouts.day3, isRestDay: false },
      { day: 5, workout: intermediatePlanWorkouts.day1, isRestDay: false },
      { day: 6, workout: null, isRestDay: true },
      { day: 7, workout: intermediatePlanWorkouts.day2, isRestDay: false },
    ]},
    // Weeks 2, 3, 4
  ],
  [FitnessLevel.Advanced]: [
    { week: 1, totalCalories: 3500, dailyWorkouts: [
      { day: 1, workout: advancedPlanWorkouts.day1, isRestDay: false },
      { day: 2, workout: advancedPlanWorkouts.day2, isRestDay: false },
      { day: 3, workout: null, isRestDay: true },
      { day: 4, workout: advancedPlanWorkouts.day3, isRestDay: false },
      { day: 5, workout: advancedPlanWorkouts.day1, isRestDay: false },
      { day: 6, workout: advancedPlanWorkouts.day2, isRestDay: false },
      { day: 7, workout: null, isRestDay: true },
    ]},
     // Weeks 2, 3, 4
  ]
};

export const FOCUS_AREAS_WORKOUTS: Workout[] = [
    createWorkout('Full Body Burn', [beginnerExercises.jumpingJacks, beginnerExercises.squats, beginnerExercises.pushUps, beginnerExercises.plank, beginnerExercises.lunges]),
    createWorkout('Abs Annihilator', [beginnerExercises.crunches, {name: 'Leg Raises', type: 'reps', duration: 20, calories: 7, muscleGroups:['Abs']}, beginnerExercises.plank, {name: 'Russian Twists', type: 'reps', duration: 20, calories: 8, muscleGroups:['Abs']}]),
    createWorkout('Chest Pump', [beginnerExercises.pushUps, {name: 'Wide Pushups', type: 'reps', duration: 15, calories: 6, muscleGroups:['Chest']}, {name: 'Incline Pushups', type: 'reps', duration: 15, calories: 5, muscleGroups:['Chest']}]),
    createWorkout('Arm Builder', [{name: 'Diamond Pushups', type: 'reps', duration: 10, calories: 9, muscleGroups:['Arms', 'Chest']}, {name: 'Arm Circles', type: 'time', duration: 60, calories: 4, muscleGroups:['Arms']}, {name: 'Tricep Dips (Chair)', type: 'reps', duration: 15, calories: 7, muscleGroups:['Arms']}]),
    createWorkout('Leg Day', [beginnerExercises.squats, beginnerExercises.lunges, {name: 'Glute Bridges', type: 'reps', duration: 20, calories: 6, muscleGroups:['Legs']}, {name: 'Calf Raises', type: 'reps', duration: 25, calories: 4, muscleGroups:['Legs']}]),
    createWorkout('Back Strength', [{name: 'Supermans', type: 'reps', duration: 15, calories: 6, muscleGroups:['Back']}, {name: 'Bird Dog', type: 'reps', duration: 12, calories: 5, muscleGroups:['Back', 'Abs']}, {name: 'Good Mornings (Bodyweight)', type: 'reps', duration: 15, calories: 5, muscleGroups:['Back', 'Legs']}]),
];
