import Layout from '../components/Layout';
import Card from '../components/Card';
import curriculum from '../data/curriculum.json';

export default function Home() {
  return (
    <Layout title="Home" showBreadcrumbs={false}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Welcome to <span className="text-indigo-600">CSIT Portal</span>
        </h2>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Your one-stop destination for study materials, notes, and video recommendations.
          Select your semester to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {curriculum.semesters.map((semester) => (
          <Card
            key={semester.id}
            title={semester.name}
            subtitle={`${semester.subjects?.length || 0} Subjects`}
            href={`/semester/${semester.id}`}
            color={semester.color}
          />
        ))}
      </div>
    </Layout>
  );
}
