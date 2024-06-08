import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, Head } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 items-center sm:pt-0">
                <div className='px-4 text-center'>
                    <div className='flex flex-col items-center lg:flex-row lg:items-end'>
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        <p className='text-4xl lg:text-6xl text-white lg:ml-4'>Larasocial</p>
                    </div>
                    <p className='text-white py-4'>Connect with your friends and the world around you.</p>
                    <div className="py-6">
                        {props.auth.user ? (
                            <Link href={route('home')} className="text-sm text-white bg-indigo-700 px-8 py-2 rounded">
                                Continue
                            </Link>
                        ) : (
                            <div className='space-x-4'>
                                <Link href={route('login')} className="text-sm text-white bg-indigo-700 px-8 py-2 rounded">
                                    Log in
                                </Link>

                                <Link
                                    href="#"
                                    className="text-sm text-white bg-indigo-700 px-8 py-2 rounded"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
