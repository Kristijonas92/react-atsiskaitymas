import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState = ("")
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Wrong password");
            return;
        }
        const response = await fetch("", {
            method: "POST",
            headers: { "Content-Type": "aplication/json" },
            body: JSON.stringify({ email })
        });

        const { registered } = await response.json();
        if (registered) {
            setError("This e-mail already registered");
            return;
        }

        await fetch("", {
            method: "POST",
            headers: { "Content-Type": "aplication/json" },
            body: JSON.stringify({ email, password }),
        });

        navigate("/")
    }



    return (
        <>
        
        </>
    );
}

export default Register;