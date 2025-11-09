
import React, { useState, useCallback } from 'react';
import { getFitnessTip } from '../services/geminiService';
import { Bot, Send, Zap } from 'lucide-react';

const AIAssistantScreen: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const quickPrompts = [
        "How to improve my push-up form?",
        "Best food to eat after a workout?",
        "How important is rest for muscle gain?",
        "How can I stay motivated to work out?",
    ];

    const handleSubmit = useCallback(async (currentPrompt: string) => {
        if (!currentPrompt.trim() || isLoading) return;
        setIsLoading(true);
        setResponse('');
        const tip = await getFitnessTip(currentPrompt);
        setResponse(tip);
        setIsLoading(false);
    }, [isLoading]);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-teal-400 flex items-center justify-center gap-2"><Bot /> AI Fitness Coach</h1>
                <p className="text-slate-300 mt-2">Ask anything about fitness, nutrition, or motivation!</p>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg space-y-4">
                 <div className="flex flex-wrap gap-2">
                    {quickPrompts.map(p => (
                        <button key={p} onClick={() => { setPrompt(p); handleSubmit(p); }} className="bg-slate-700 text-sm px-3 py-1 rounded-full hover:bg-teal-500 transition-colors flex items-center gap-1">
                            <Zap size={14} /> {p}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(prompt)}
                        placeholder="e.g., How can I improve my squat depth?"
                        className="w-full bg-slate-700 p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                        disabled={isLoading}
                    />
                    <button onClick={() => handleSubmit(prompt)} disabled={isLoading || !prompt.trim()} className="bg-teal-500 p-3 rounded-lg hover:bg-teal-600 disabled:bg-slate-600">
                        <Send />
                    </button>
                </div>
            </div>

            {isLoading && (
                 <div className="flex justify-center items-center space-x-2 text-slate-300">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
                    <span>Thinking...</span>
                </div>
            )}
            
            {response && (
                <div className="bg-slate-800 p-5 rounded-lg animate-fade-in">
                    <h3 className="font-bold text-lg mb-2 text-teal-300">Coach's Tip:</h3>
                    <p className="text-slate-200 whitespace-pre-wrap">{response}</p>
                </div>
            )}
        </div>
    );
}

export default AIAssistantScreen;
