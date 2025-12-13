import { useState, useEffect } from 'react';

export default function StudentPreferenceModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [preference, setPreference] = useState(null);

    useEffect(() => {
        // Check if preference is already saved
        const saved = localStorage.getItem('student_learning_preference');
        if (!saved) {
            // Delay opening slightly for better UX
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setPreference(saved);
        }
    }, []);

    const savePreference = (pref) => {
        localStorage.setItem('student_learning_preference', pref);
        setPreference(pref);
        setIsOpen(false);
        window.location.reload(); // Reload to apply changes if any components depend on it immediately
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl max-w-md w-full p-6 border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-300">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Customize Your Learning</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    How do you prefer to study? We'll use AI to recommend the best resources for you.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => savePreference('visual')}
                        className="w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center gap-3 group"
                    >
                        <span className="text-2xl">📺</span>
                        <div>
                            <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">Visual Learner</div>
                            <div className="text-sm text-zinc-500">I learn best by watching videos and animations.</div>
                        </div>
                    </button>

                    <button
                        onClick={() => savePreference('reading')}
                        className="w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all flex items-center gap-3 group"
                    >
                        <span className="text-2xl">📖</span>
                        <div>
                            <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-green-600 dark:group-hover:text-green-400">Reading / Notes</div>
                            <div className="text-sm text-zinc-500">I prefer reading comprehensive notes and articles.</div>
                        </div>
                    </button>

                    <button
                        onClick={() => savePreference('example')}
                        className="w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all flex items-center gap-3 group"
                    >
                        <span className="text-2xl">🧩</span>
                        <div>
                            <div className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">Practical Examples</div>
                            <div className="text-sm text-zinc-500">I need real-world examples and code snippets.</div>
                        </div>
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <button onClick={() => setIsOpen(false)} className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                        I'll decide later
                    </button>
                </div>
            </div>
        </div>
    );
}
