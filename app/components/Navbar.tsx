import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const { auth, isLoading } = usePuterStore();
    const navigate = useNavigate();

    const handleAuthAction = async () => {
        if (auth.isAuthenticated) {
            await auth.signOut();
            navigate('/auth?next=/');
        } else {
            navigate('/auth?next=/');
        }
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>
            <div className="flex items-center gap-4">
                {auth.isAuthenticated && (
                    <>
                        <Link to="/upload" className="primary-button w-fit">
                            Upload Resume
                        </Link>
                        <span className="text-sm text-gray-600">
                            {auth.user?.username}
                        </span>
                    </>
                )}
                <button
                    onClick={handleAuthAction}
                    disabled={isLoading}
                    className="primary-button w-fit"
                >
                    {isLoading ? 'Loading...' : auth.isAuthenticated ? 'Log Out' : 'Log In'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;