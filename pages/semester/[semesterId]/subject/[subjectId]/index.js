import Layout from '../../../../../components/Layout';
import Card from '../../../../../components/Card';
import curriculum from '../../../../../data/curriculum.json';

export default function Subject({ semester, subject }) {
    if (!subject) return null;

    return (
        <Layout title={`${subject.name} - ${semester.name}`}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{subject.name}</h1>
                <p className="mt-2 text-gray-600">Semester: {semester.name}</p>
            </div>

            {subject.chapters && subject.chapters.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subject.chapters.map((chapter) => (
                        <Card
                            key={chapter.id}
                            title={chapter.name}
                            subtitle="View videos and notes"
                            href={`/semester/${semester.id}/subject/${subject.id}/chapter/${chapter.id}`}
                            color="bg-white ring-gray-100/50 hover:ring-indigo-300"
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                    <p className="text-gray-500">No chapters available for this subject yet.</p>
                </div>
            )}
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = [];
    curriculum.semesters.forEach((sem) => {
        sem.subjects.forEach((sub) => {
            paths.push({
                params: { semesterId: sem.id, subjectId: sub.id },
            });
        });
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const semester = curriculum.semesters.find((s) => s.id === params.semesterId);
    const subject = semester?.subjects.find((s) => s.id === params.subjectId);

    if (!semester || !subject) {
        return { notFound: true };
    }

    return {
        props: { semester, subject },
    };
}
