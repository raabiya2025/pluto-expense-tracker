import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log("Register response:", data);

            if (response.ok) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                alert(data.error);
            }

        } catch (error) {
            console.error("Registration error:", error);
        }
    }

return (
    <div className="auth-page">
        <div className="auth-card">

            <h1>Create your account</h1>

            <p className="auth-subtitle">
                Start taking control of your money with Pluto.
            </p>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Create a password"
                    />
                </div>

                <button
                    className="primary-button"
                    type="submit"
                >
                    Create account
                </button>

            </form>

        </div>
    </div>
);
}

export default Register;