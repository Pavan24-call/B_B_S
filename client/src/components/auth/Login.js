import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password)
    }
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="flex-container">
            <div className="form-container">
                <div className="sgnUp">
                    {/* Left Panel */}
                    <div className="col-md-6 right-divider pdding">
                        <h3 className="lead-text mn-txt" style={{ margin: 0, fontWeight: 600 }}>
                            Welcome Back
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', margin: '1rem 0 2rem 0', padding: '0 20px', lineHeight: '1.6' }}>
                            Sign in to your Youth Travels account to book tickets, manage reservations, and check booking history.
                        </p>
                        
                        <div className="icon-soc-fb" style={{ display: 'flex', gap: '10px', width: '85%' }}>
                            <FaFacebookF /> Continue with Facebook
                        </div>
                        <div className="icon-soc-gg" style={{ display: 'flex', gap: '10px', width: '85%', marginTop: '10px' }}>
                            <FaGoogle /> Continue with Google
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="left-divider">
                        <form className="form" onSubmit={onSubmit} style={{ maxWidth: '350px', margin: '0 auto' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center' }}>
                                Sign In
                            </h2>

                            <div className="form-group2">
                                <label htmlFor="email">Email Address</label>
                                <input 
                                    required 
                                    name="email" 
                                    placeholder="name@example.com" 
                                    value={email} 
                                    type="email" 
                                    className="form-control" 
                                    onChange={onChange} 
                                />
                            </div>

                            <div className="form-group2">
                                <label htmlFor="password">Password</label>
                                <input 
                                    required 
                                    id="password" 
                                    name="password" 
                                    value={password} 
                                    placeholder="••••••••" 
                                    type="password" 
                                    className="form-control" 
                                    onChange={onChange} 
                                />
                            </div>

                            <div className="form-group2" style={{ marginTop: '2rem' }}>
                                <input 
                                    type="submit" 
                                    value="Login" 
                                    className="btn btn-primary" 
                                    style={{ width: '100%', borderRadius: '12px !important', height: '48px', padding: '0 !important' }} 
                                />
                            </div>
                            
                            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                                <Link to="/register" style={{ fontWeight: 600, color: 'var(--primary-color)' }}>Register Here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
