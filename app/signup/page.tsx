import React, { useState } from 'react';

const SignupLoginPage: React.FC = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignup) {
            // Handle signup logic
            console.log('Signup:', { email, password });
        } else {
            // Handle login logic
            console.log('Login:', { email, password });
        }
    };

    return (
        <div className="container">
            <h2>{isSignup ? 'Signup' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Switch to Login' : 'Switch to Signup'}
            </button>
        </div>
    );
};

export default SignupLoginPage;