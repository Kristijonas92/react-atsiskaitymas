import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GreatPosts from './img/GreatPosts.png'

const Add = ({ loggedInUser }) => {
    const [post, setPost] = useState({ title: '', description: '', email: loggedInUser ? loggedInUser.email : '' });
    const handleChange = event => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const [user, setUser] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        }return
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setPost({ title: '', description: '' });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div>
                <header>
                    <img src={GreatPosts} alt="Logo" />
                    <h1>ADD</h1>
                    <nav>
                        <Link to="/">LOGIN</Link>
                        <Link to="/register">REGISTER</Link>
                    </nav>
                </header>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:<input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={post.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">SUBMIT</button>
            </form>
            <div>
                <footer>
                    Copyright &copy; {new Date().getFullYear()}
                </footer>
            </div>
        </>
    );
}
export default Add;