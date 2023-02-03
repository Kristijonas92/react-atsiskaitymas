import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GreatPosts from './img/GreatPosts.png';

const Home = ({ loggedInUser, deletePost }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(loggedInUser)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div>
            <header>
                <img src={GreatPosts} alt="Logo" />
                <nav>
                    <Link to="/home">HOME</Link>
                    <Link to="/add">ADD</Link>
                </nav>
                <button onClick={handleLogout}>LOGOUT</button>
            </header>
            <main>
                {loading ? (
                    <p>Loading...</p>
                ) : posts.length > 0 ? (
                    posts.map(post => (
                        <div style={{ border: '3px solid black' }} key={post.id}>
                            <span>Post by: {post.postOwner && post.postOwner.email }</span>
                            {
                                loggedInUser && loggedInUser.id === post.postOwner.id && (
                                    <>
                                        <button onClick={() => deletePost(post.id)}>Delete</button>
                                    </>
                                )
                            }
                            <hr />
                            <h1>{post.title}</h1>
                            <p>{post.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </main>
            <footer>
                Copyright &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Home;