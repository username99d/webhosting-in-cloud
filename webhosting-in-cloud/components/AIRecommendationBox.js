import { useState } from 'react';

export default function AIRecommendationBox({ topic, context }) {
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getRecommendation = async () => {
        setLoading(true);
        setError(null);
        try {
            const savedPreference = localStorage.getItem('student_learning_preference');

            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic,
                    context,
                    preference: savedPreference || 'general'
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch recommendation');

            const data = await response.json();
            setRecommendation(data);
        } catch (err) {
            setError("AI is taking a nap. Try again later!");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (recommendation) {
        return (
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🤖</div>
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-2">AI Recommendation</h3>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">{recommendation.reason}</p>

                <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1">Recommended Action</div>
                    <div className="font-medium text-lg text-zinc-900 dark:text-zinc-100 mb-2">{recommendation.suggestion}</div>
                    <a
                        href={recommendation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Open Resource <span className="ml-1">→</span>
                    </a>
                </div>

                <button
                    onClick={() => setRecommendation(null)}
                    className="mt-4 text-xs text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                    Reset Recommendation
                </button>
            </div>
        );
    }

    return (
        <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 text-center border border-dashed border-zinc-300 dark:border-zinc-700">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Need Help Understanding this Topic?</h3>
                <p className="text-zinc-500 text-sm mb-4 max-w-md mx-auto">
                    Our AI knows your learning style. Click below to get a personalized recommendation for the best video, article, or example for this specific topic.
                </p>
                <button
                    onClick={getRecommendation}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Thinking...
                        </>
                    ) : (
                        <>
                            ✨ Get AI Recommendation
                        </>
                    )}
                </button>
                {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}
            </div>
        </div>
    );
}
