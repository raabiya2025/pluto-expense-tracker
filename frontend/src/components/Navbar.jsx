import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Pluto
            </Link>

            <div className="nav-links">
                {!token && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

                {token && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>

                        <button
                            className="nav-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;