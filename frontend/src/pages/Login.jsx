import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
    localStorage.setItem("token", data.token);

    console.log("Login successful!");

    navigate("/dashboard");
} else {
    console.log("Login failed:", data);
}
    }

    return (
         <div className="auth-page">
            <div className="auth-card">
            <h1>Login</h1>
            <p className="auth-subtitle">
                    Log in to continue managing your money.
                </p>

            <form onSubmit={handleSubmit}>
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
                        placeholder="Enter your password"
                    />
                </div>

                

                <button
                 className="primary-button"
                  type="submit">Login</button>
            </form>
        </div>
        </div>
    );
}

export default Login;