import Layout from '../../../components/Layout';
import Card from '../../../components/Card';
import curriculum from '../../../data/curriculum.json';

export default function Semester({ semester }) {
    if (!semester) return null;

    return (
        <Layout title={semester.name}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{semester.name}</h1>
                <p className="mt-2 text-gray-600">Select a subject to view chapters and materials.</p>
            </div>

            {semester.subjects && semester.subjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {semester.subjects.map((subject) => (
                        <Card
                            key={subject.id}
                            title={subject.name}
                            subtitle={`${subject.chapters?.length || 0} Chapters`}
                            href={`/semester/${semester.id}/subject/${subject.id}`}
                            color="bg-white ring-indigo-100/50 hover:ring-indigo-300"
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                    <p className="text-gray-500">No subjects available for this semester yet.</p>
                </div>
            )}
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = curriculum.semesters.map((sem) => ({
        params: { semesterId: sem.id },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const semester = curriculum.semesters.find((s) => s.id === params.semesterId);
    return {
        props: { semester },
    };
}
