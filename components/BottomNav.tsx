
import React from 'react';
import { LucideProps } from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<LucideProps>;
}

interface BottomNavProps {
    items: NavItem[];
    activeScreen: string;
    setActiveScreen: (screen: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ items, activeScreen, setActiveScreen }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 shadow-lg">
            <div className="flex justify-around items-center max-w-2xl mx-auto">
                {items.map(item => {
                    const isActive = activeScreen === item.id;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveScreen(item.id)}
                            className={`flex flex-col items-center justify-center w-full py-2 px-1 text-center transition-colors duration-200 ${
                                isActive ? 'text-orange-400' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <Icon size={24} className="mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
