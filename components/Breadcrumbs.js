import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs() {
    const router = useRouter();
    const pathnames = router.asPath.split('/').filter((x) => x);

    return (
        <nav className="text-sm font-medium text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const label = value.replace(/-/g, ' ').replace(/^./, (str) => str.toUpperCase());

                    return (
                        <li key={to} className="flex items-center">
                            <span className="mx-2 text-gray-300">/</span>
                            {isLast ? (
                                <span className="text-gray-900 font-semibold">{label}</span>
                            ) : (
                                <Link href={to} className="hover:text-gray-900 transition-colors">{label}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
