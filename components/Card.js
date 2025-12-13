import Link from 'next/link';

export default function Card({ title, subtitle, href, color = 'bg-white ring-gray-200' }) {
  return (
    <Link href={href} className={`block p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ring-1 ${color} group h-full`}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{title}</h3>
          {subtitle && <p className="mt-2 text-gray-600 text-sm">{subtitle}</p>}
        </div>
        <div className="mt-4 flex justify-end">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/50 text-gray-500 group-hover:bg-white group-hover:text-primary transition-all">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
