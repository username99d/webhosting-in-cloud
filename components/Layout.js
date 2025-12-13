import Head from 'next/head';
import Breadcrumbs from './Breadcrumbs';

export default function Layout({ title, children, showBreadcrumbs = true }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Head>
                <title>{title ? `${title} | CSIT Portal` : 'CSIT Portal'}</title>
                <meta name="description" content="CSIT Study Materials and Resources" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            CSIT Portal
                        </h1>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Semesters</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Resources</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {showBreadcrumbs && <Breadcrumbs />}
                {children}
            </main>

            <footer className="bg-white border-t border-gray-100 mt-auto py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} CSIT Portal. Built for students.</p>
                </div>
            </footer>
        </div>
    );
}
