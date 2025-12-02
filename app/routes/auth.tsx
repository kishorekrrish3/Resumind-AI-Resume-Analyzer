import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [redirectPath, setRedirectPath] = useState('/');

    useEffect(() => {
        // Parse the 'next' parameter from URL
        const params = new URLSearchParams(location.search);
        const next = params.get('next');
        if (next) {
            setRedirectPath(decodeURIComponent(next));
        }
    }, [location.search]);

    useEffect(() => {
        // Redirect if already authenticated
        if (!isLoading && auth.isAuthenticated) {
            navigate(redirectPath);
        }
    }, [auth.isAuthenticated, isLoading, redirectPath, navigate]);

    const handleSignIn = async () => {
        await auth.signIn();
        // After sign in, the useEffect above will handle the redirect
    };

    const handleSignOut = async () => {
        await auth.signOut();
        navigate('/');
    };

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse" disabled>
                                <p>Loading...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <div className="flex flex-col gap-4">
                                        <p className="text-center text-gray-600">
                                            Logged in as <strong>{auth.user?.username}</strong>
                                        </p>
                                        <button className="auth-button" onClick={handleSignOut}>
                                            <p>Log Out</p>
                                        </button>
                                    </div>
                                ) : (
                                    <button className="auth-button" onClick={handleSignIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth