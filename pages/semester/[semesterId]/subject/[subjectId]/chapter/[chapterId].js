import Image from 'next/image';
import Layout from '../../../../../../components/Layout';
import curriculum from '../../../../../../data/curriculum.json';

export default function Chapter({ semester, subject, chapter }) {
    if (!chapter) return null;

    return (
        <Layout title={`${chapter.name} - ${subject.name}`}>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{chapter.name}</h1>
                <p className="mt-2 text-gray-600">{semester.name} &bull; {subject.name}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Videos and Notes */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Videos Section */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-red-500">▶</span> Video Tutorials
                        </h2>
                        {chapter.videos && chapter.videos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {chapter.videos.map((video, idx) => (
                                    <a
                                        key={idx}
                                        href={video.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                                    >
                                        <div className="aspect-video bg-gray-200 relative">
                                            {/* Placeholder for thumbnail logic if actual images used */}
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                                <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                                            </div>
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center z-10">
                                                <span className="w-12 h-12 rounded-full bg-white/90 text-red-600 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                                                    ▶
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 line-clamp-2">{video.title}</h3>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No specific videos added yet.</p>
                        )}
                    </section>

                    {/* Notes Section */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-yellow-500">📄</span> Notes & Resources
                        </h2>
                        {chapter.notes && chapter.notes.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                                {chapter.notes.map((note, idx) => (
                                    <a
                                        key={idx}
                                        href={note.url}
                                        className="flexItems-center p-4 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="mr-3 text-2xl text-gray-400 group-hover:text-indigo-500 transition-colors">📄</div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 group-hover:text-indigo-700">{note.title}</h3>
                                            <p className="text-xs text-gray-500 mt-0.5">Click to view/download</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No notes added yet.</p>
                        )}
                    </section>
                </div>

                {/* Sidebar: AI Recommendations */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sticky top-24 border border-indigo-100">
                        <h2 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                            <span>✨</span> AI Recommended
                        </h2>

                        <div className="space-y-6">
                            {chapter.aiRecommendation?.video && (
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
                                    <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded mb-2">Best Video</span>
                                    <p className="text-sm font-semibold text-gray-800 mb-1">{chapter.aiRecommendation.video.title}</p>
                                    <p className="text-xs text-gray-500 mb-2">"{chapter.aiRecommendation.video.reason}"</p>
                                    <a href={chapter.aiRecommendation.video.url} className="text-indigo-600 text-sm font-medium hover:underline">Watch Now →</a>
                                </div>
                            )}

                            {chapter.aiRecommendation?.note && (
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
                                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded mb-2">Top Note</span>
                                    <p className="text-sm font-semibold text-gray-800 mb-1">{chapter.aiRecommendation.note.title}</p>
                                    <p className="text-xs text-gray-500 mb-2">"{chapter.aiRecommendation.note.reason}"</p>
                                    <a href={chapter.aiRecommendation.note.url} className="text-indigo-600 text-sm font-medium hover:underline">Read Now →</a>
                                </div>
                            )}

                            {(!chapter.aiRecommendation?.video && !chapter.aiRecommendation?.note) && (
                                <p className="text-sm text-gray-500">AI is analyzing learning patterns to generate recommendations.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = [];
    curriculum.semesters.forEach((sem) => {
        sem.subjects.forEach((sub) => {
            if (sub.chapters) {
                sub.chapters.forEach(chap => {
                    paths.push({
                        params: { semesterId: sem.id, subjectId: sub.id, chapterId: chap.id },
                    });
                })
            }
        });
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const semester = curriculum.semesters.find((s) => s.id === params.semesterId);
    const subject = semester?.subjects.find((s) => s.id === params.subjectId);
    const chapter = subject?.chapters.find((c) => c.id === params.chapterId);

    if (!semester || !subject || !chapter) {
        return { notFound: true };
    }

    return {
        props: { semester, subject, chapter },
    };
}
