import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { register } from '../../actions/auth'

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        contact: '',
        dob: '',
        gender: ''
    });
    const { name, email, password, password2, contact, dob, gender } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register({ name, email, password, contact, dob, gender })
        }
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
                            Join Us
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', margin: '1rem 0 2rem 0', padding: '0 20px', lineHeight: '1.6' }}>
                            Create your Youth Travels profile to enjoy faster checkouts, track bus routes in real time, and earn travel reward points.
                        </p>
                        
                        <div className="icon-soc-fb" style={{ display: 'flex', gap: '10px', width: '85%' }}>
                            <FaFacebookF /> Continue with Facebook
                        </div>
                        <div className="icon-soc-gg" style={{ display: 'flex', gap: '10px', width: '85%', marginTop: '10px' }}>
                            <FaGoogle /> Continue with Google
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="left-divider" style={{ padding: '2rem 3rem' }}>
                        <form className="form" onSubmit={onSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center' }}>
                                Register
                            </h2>

                            <div className="form-group2">
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    name="name" 
                                    value={name} 
                                    className="form-control" 
                                    onChange={onChange} 
                                    required
                                />
                            </div>

                            <div className="form-group2">
                                <label htmlFor="email">Email Address</label>
                                <input 
                                    required 
                                    name="email" 
                                    placeholder="john.doe@example.com" 
                                    value={email} 
                                    type="email" 
                                    className="form-control" 
                                    onChange={onChange} 
                                />
                            </div>

                            <div className="form-group2">
                                <label htmlFor="mob-number">Mobile Number</label>
                                <input 
                                    required 
                                    id="mob-number" 
                                    placeholder="9876543210" 
                                    type="text" 
                                    name="contact" 
                                    value={contact} 
                                    className="form-control" 
                                    onChange={onChange} 
                                />
                            </div>

                            <div className="form-group2">
                                <label htmlFor="dob">Date of Birth</label>
                                <input 
                                    required 
                                    id="dob" 
                                    type="date" 
                                    className="form-control" 
                                    name="dob" 
                                    value={dob} 
                                    onChange={onChange} 
                                />
                            </div>

                            <div className="form-group2">
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Gender</label>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, fontWeight: 400, color: 'var(--text-main)' }}>
                                        <input required type="radio" id="Male" name="gender" value="Male" onChange={onChange} style={{ width: 'auto', height: 'auto', margin: 0 }} /> Male
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, fontWeight: 400, color: 'var(--text-main)' }}>
                                        <input required type="radio" id="Female" name="gender" value="Female" onChange={onChange} style={{ width: 'auto', height: 'auto', margin: 0 }} /> Female
                                    </label>
                                </div>
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

                            <div className="form-group2">
                                <label htmlFor="password2">Confirm Password</label>
                                <input 
                                    required 
                                    id="password2" 
                                    name="password2" 
                                    value={password2} 
                                    placeholder="••••••••" 
                                    type="password" 
                                    className="form-control" 
                                    onChange={onChange} 
                                />
                            </div>

                            <div className="form-group2" style={{ marginTop: '2rem' }}>
                                <input 
                                    type="submit" 
                                    value="Register" 
                                    className="btn btn-primary" 
                                    style={{ width: '100%', borderRadius: '12px !important', height: '48px', padding: '0 !important' }} 
                                />
                            </div>
                            
                            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
                                <Link to="/login" style={{ fontWeight: 600, color: 'var(--primary-color)' }}>Login Here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
