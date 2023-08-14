'use client'

import GoogleSignInButton from '../components/buttons/GoogleSignInButton'
import FacebookSignInButton from '../components/buttons/FacebookSignInButton'
import Link from 'next/link'
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [error, setError] = useState<string | null >(null);
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        const form = new FormData(e.target as HTMLFormElement);

        try{
            const response = await signIn('credentials', {
                email: form.get('email'),
                password: form.get('password'),
                redirect: false,
            });

            if (response?.error) {
                setError('Credenciales incorrectas. Intenta nuevamente.');
            } else {
                // Handle successful sign-in if needed
                router.push('/');
                // You can manually redirect here using router.push('/desired-page')
            }
        } catch(err){
            setError('Hubo un error al iniciar sesión.')
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-current dark:bg-slate-900 rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                Login
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800  dark:text-white dark:opacity-80"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <Link
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Olvidaste tu contraseña?
                    </Link>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>
                {error && ( <p className="mt-8 text-xs font-light text-center text-red-600 animate-[pulse_2s]">{error}</p> )}
                <p className="mt-8 text-xs font-light text-center text-gray-700  dark:text-white dark:opacity-60">
                    {' '}No tienes una cuenta?{' '}
                    <Link
                        href="/signUp"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Regístrate
                    </Link>
                </p>

                <GoogleSignInButton />
                <FacebookSignInButton />
            </div>
        </div>
);
}
