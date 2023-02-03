import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import GreatPosts from './img/GreatPosts.png'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const { registered } = await response.json();
            if (registered) {
                setError("This email is already registered");
                return;
            }

            const registrationResponse = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!registrationResponse.ok) {
                throw new Error(registrationResponse.statusText);
            }

            setSuccess("Successfully registered");
            navigate("/home");
        } catch (error) {
            setError("There was a problem registering, please try again later");
        }
    };

    return (
        <>
            <div>
                <header>
                    <img src={GreatPosts} alt="Logo" />
                    <h1>REGISTER</h1>
                    <nav>
                        <Link to="/home">HOME</Link>
                        <Link to="/">LOGIN</Link>
                    </nav>
                </header>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    <button type="submit">SUBMIT</button>
                </form>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>{success}</div>}
                <footer>Copyright &copy; {new Date().getFullYear()}</footer>
            </div>
        </>
    );
};

export default Register;
