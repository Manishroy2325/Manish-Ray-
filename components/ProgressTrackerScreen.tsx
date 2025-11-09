
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { UserProfile, WeightEntry } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Plus, Upload } from 'lucide-react';

interface ProgressTrackerScreenProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const ProgressTrackerScreen: React.FC<ProgressTrackerScreenProps> = ({ userProfile, setUserProfile }) => {
  const [weightInput, setWeightInput] = useState('');
  const [heightInput, setHeightInput] = useState(userProfile.height.toString());
  const beforePhotoRef = useRef<HTMLInputElement>(null);
  const afterPhotoRef = useRef<HTMLInputElement>(null);

  const calculateBMI = useMemo(() => {
    const lastWeight = userProfile.progress.weightHistory[userProfile.progress.weightHistory.length - 1]?.weight;
    if (!lastWeight || !userProfile.height) return { bmi: 0, category: 'N/A' };
    const heightInMeters = userProfile.height / 100;
    const bmi = lastWeight / (heightInMeters * heightInMeters);
    let category = 'Healthy';
    if (bmi < 18.5) category = 'Underweight';
    if (bmi >= 25 && bmi < 30) category = 'Overweight';
    if (bmi >= 30) category = 'Obese';
    return { bmi: parseFloat(bmi.toFixed(1)), category };
  }, [userProfile.progress.weightHistory, userProfile.height]);

  const handleAddWeight = () => {
    const weight = parseFloat(weightInput);
    if (!isNaN(weight) && weight > 0) {
      const newEntry: WeightEntry = { date: new Date().toISOString().split('T')[0], weight };
      setUserProfile(prev => prev ? ({
        ...prev,
        progress: {
          ...prev.progress,
          weightHistory: [...prev.progress.weightHistory, newEntry]
        }
      }) : null);
      setWeightInput('');
    }
  };
  
   const handleUpdateHeight = () => {
    const height = parseFloat(heightInput);
    if (!isNaN(height) && height > 0) {
      setUserProfile(prev => prev ? ({ ...prev, height }) : null);
    }
  };

  const handlePhotoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
            setUserProfile(prev => prev ? ({
                ...prev,
                progress: {
                    ...prev.progress,
                    photos: {
                        ...prev.progress.photos,
                        [type]: e.target!.result as string
                    }
                }
            }) : null);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }, [setUserProfile]);

  const formattedWeightData = userProfile.progress.weightHistory.map(entry => ({
      ...entry,
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const calorieData = [{ name: 'Calories Burned', calories: userProfile.progress.caloriesBurned }];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-green-400">Your Progress</h1>

      {/* BMI & Weight Section */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Weight & BMI Tracker</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-slate-700 rounded-lg">
                <p className="text-4xl font-bold">{calculateBMI.bmi || '--'}</p>
                <p className="text-slate-400">BMI ({calculateBMI.category})</p>
            </div>
             <div className="text-center p-4 bg-slate-700 rounded-lg">
                <p className="text-4xl font-bold">{userProfile.progress.weightHistory.slice(-1)[0]?.weight || '--'} kg</p>
                <p className="text-slate-400">Current Weight</p>
            </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
           <input type="number" value={weightInput} onChange={e => setWeightInput(e.target.value)} placeholder="Enter new weight (kg)" className="bg-slate-700 p-2 rounded flex-grow"/>
           <button onClick={handleAddWeight} className="bg-green-500 p-2 rounded flex items-center justify-center gap-2"><Plus size={16}/> Add Weight</button>
        </div>
         <div className="flex flex-col md:flex-row gap-2 mt-2">
           <input type="number" value={heightInput} onChange={e => setHeightInput(e.target.value)} placeholder="Enter height (cm)" className="bg-slate-700 p-2 rounded flex-grow"/>
           <button onClick={handleUpdateHeight} className="bg-blue-500 p-2 rounded">Update Height</button>
        </div>
      </div>

      {/* Weight Chart */}
      {formattedWeightData.length > 1 && (
        <div className="bg-slate-800 p-4 rounded-lg h-64">
            <h3 className="font-bold mb-2">Weight History</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedWeightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={['dataMin - 2', 'dataMax + 2']}/>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}/>
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#4ade80" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      )}

      {/* Calorie & Workout Tracker */}
      <div className="bg-slate-800 p-4 rounded-lg h-64">
        <h3 className="font-bold mb-2">Calories & Workouts</h3>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calorieData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" hide />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}/>
                <Bar dataKey="calories" fill="#f87171" name="Calories Burned"/>
            </BarChart>
        </ResponsiveContainer>
        <p className="text-center mt-2">Total Workouts: {userProfile.progress.workoutsCompleted}</p>
      </div>

      {/* Visual Transformation */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Visible Changes</h2>
        <div className="grid grid-cols-2 gap-4">
            {['before', 'after'].map(type => (
                <div key={type}>
                    <h4 className="capitalize font-semibold mb-2">{type} Photo</h4>
                    <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                        {userProfile.progress.photos[type as 'before' | 'after'] ? (
                            <img src={userProfile.progress.photos[type as 'before' | 'after']!} alt={`${type} photo`} className="object-cover w-full h-full rounded-lg" />
                        ) : (
                            <button onClick={() => (type === 'before' ? beforePhotoRef : afterPhotoRef).current?.click()} className="text-slate-400 flex flex-col items-center gap-2">
                                <Upload size={32}/>
                                <span>Upload</span>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
        <input type="file" accept="image/*" ref={beforePhotoRef} onChange={(e) => handlePhotoUpload(e, 'before')} className="hidden" />
        <input type="file" accept="image/*" ref={afterPhotoRef} onChange={(e) => handlePhotoUpload(e, 'after')} className="hidden" />
      </div>
    </div>
  );
};

export default ProgressTrackerScreen;
