import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { 
    FaExchangeAlt, FaBus, FaMapMarkerAlt, FaCalendarAlt, 
    FaStar, FaClock, FaRupeeSign, FaQuoteLeft, FaRoute 
} from 'react-icons/fa'
import { searchBuses } from '../../actions/profile'

const Landing = ({ isAuthenticated }) => {
    const [user, exp1] = useState('Tickets here')
    const [formData, setFormData] = useState({
        start: '',
        end: '',
        date: ''
    });
    const [suggestionsStart, setSuggestionsStart] = useState([])
    const [suggestionsEnd, setSuggestionsEnd] = useState([])

    const { start, end, date } = formData;

    const popularCities = [
        'Hyderabad', 'Ongole', 'Nellore', 'Tirupati', 'Vijayawada', 
        'Guntur', 'Visakhapatnam', 'Chennai', 'Bengaluru', 'Mumbai', 
        'Pune', 'Delhi', 'Jaipur', 'Kolkata', 'Goa', 'Mysuru', 'Kochi'
    ];

    const popularRoutesList = [
        { from: 'Hyderabad', to: 'Bengaluru', desc: 'Direct routes daily' },
        { from: 'Ongole', to: 'Bengaluru', desc: 'Sleeper services' },
        { from: 'Mumbai', to: 'Pune', desc: 'Express highway runs' },
        { from: 'Delhi', to: 'Jaipur', desc: 'Heritage line route' }
    ];

    const testimonials = [
        { name: "Rahul Sharma", role: "Software Engineer", text: "Booking through Youth Travels is incredibly smooth. The UI is gorgeous, and I got my ticket in under a minute!", rating: 5 },
        { name: "Divya Teja", role: "Frequent Traveler", text: "Love the route visualization! The search is fast and the interface is exceptionally polished.", rating: 5 },
        { name: "Suresh Kumar", role: "Business Manager", text: "Reliable and case-insensitive search made booking my Ongole to Chennai trip extremely simple.", rating: 4 }
    ];

    const handleFromCity = e => {
        const val = e.target.value;
        setFormData({ ...formData, start: val });
        localStorage.setItem("start", val);
        if (val.trim() === '') {
            setSuggestionsStart([]);
        } else {
            const filtered = popularCities.filter(c => c.toLowerCase().includes(val.toLowerCase()) && c.toLowerCase() !== val.toLowerCase());
            setSuggestionsStart(filtered);
        }
    }

    const handleToCity = e => {
        const val = e.target.value;
        setFormData({ ...formData, end: val });
        localStorage.setItem("destination", val);
        if (val.trim() === '') {
            setSuggestionsEnd([]);
        } else {
            const filtered = popularCities.filter(c => c.toLowerCase().includes(val.toLowerCase()) && c.toLowerCase() !== val.toLowerCase());
            setSuggestionsEnd(filtered);
        }
    }

    const handleDate = e => {
        setFormData({ ...formData, date: e.target.value });
        localStorage.setItem("date", e.target.value);
    }

    const handleSwap = (e) => {
        e.preventDefault();
        const tempStart = start;
        setFormData({
            ...formData,
            start: end,
            end: tempStart
        });
        localStorage.setItem("start", end);
        localStorage.setItem("destination", tempStart);
    }

    const selectStartSuggestion = (city) => {
        setFormData({ ...formData, start: city });
        localStorage.setItem("start", city);
        setSuggestionsStart([]);
    }

    const selectEndSuggestion = (city) => {
        setFormData({ ...formData, end: city });
        localStorage.setItem("destination", city);
        setSuggestionsEnd([]);
    }

    const handlePopularRouteClick = (from, to) => {
        setFormData({ ...formData, start: from, end: to });
        localStorage.setItem("start", from);
        localStorage.setItem("destination", to);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const handleSubmit = bId => {
            localStorage.setItem("selectedBusId", bId)
        }

        searchBuses({ start, end }).then((busData) => {
            exp1(
                <div className="profile-exp bg-white p-2" style={{ background: 'transparent', border: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <FaRoute style={{ color: '#8b5cf6', fontSize: '1.6rem' }} />
                        <h2 className="text-primary" style={{ margin: 0, fontWeight: 600 }}>Available Buses</h2>
                    </div>
                    
                    {busData && busData.length > 0 ? (
                        <div className="container1">
                            {busData.map(bus => {
                                return (
                                    <div className="card" key={bus._id}>
                                        <div className="box">
                                            <div className="content">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <h2>{bus.company}</h2>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: '20px', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 600 }}>
                                                        <FaStar style={{ fontSize: '0.75rem' }} />
                                                        {bus.rating.toFixed(1)}
                                                    </div>
                                                </div>
                                                
                                                <h3 style={{ marginTop: '5px' }}>{bus.name}</h3>
                                                <p className="bus-company" style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <FaClock /> {bus.duration} • Express
                                                </p>

                                                <div className="stops-list">
                                                    <span>Route Path:</span>
                                                    <strong>{bus.stops.join(' ➔ ')}</strong>
                                                </div>

                                                <div className="bus-footer">
                                                    <div className="price-tag">
                                                        <FaRupeeSign style={{ fontSize: '0.9rem', marginRight: '2px' }} />
                                                        {bus.fare}
                                                    </div>
                                                    <Link 
                                                        to="/book/menu1" 
                                                        className="btn btn-primary" 
                                                        style={{ padding: '0.5rem 1.25rem !important', fontSize: '0.85rem' }}
                                                        onClick={() => handleSubmit(bus._id)}
                                                    >
                                                        Select Seats
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="card" style={{ padding: '3rem', textAlign: 'center', width: '100%' }}>
                            <FaBus style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem', opacity: 0.7 }} />
                            <h4 style={{ color: '#ef4444', fontWeight: 500 }}>No Buses Found</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>
                                We couldn't find any buses traveling between these stops. Try other popular cities.
                            </p>
                        </div>
                    )}
                </div>
            )
        })
    }

    return (
        <div className="landing">
            <div className="landing-inner">
                <h1 className="x-large">WELCOME TO YOUTH TRAVELS</h1>
                <p className="lead" style={{ margin: '0 auto 2.5rem auto' }}>
                    Tomorrow's destination, arrive today. Safe, premium, and reliable bus services across India.
                </p>
            </div>

            {/* Premium Search Box */}
            <div className="rdc">
                <div className="main-container">
                    <form className="form-inline" onSubmit={onSubmit}>
                        {/* Start City Input & Suggestion Box */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '15px', top: '18px', color: '#8b5cf6', pointerEvents: 'none' }}>
                                <FaMapMarkerAlt />
                            </div>
                            <input 
                                type="text" 
                                placeholder="From City" 
                                name="start" 
                                className="selectpicker" 
                                style={{ paddingLeft: '40px' }}
                                value={start} 
                                onChange={handleFromCity} 
                                required
                                autoComplete="off"
                            />
                            {suggestionsStart.length > 0 && (
                                <ul style={{ position: 'absolute', top: '55px', left: 0, right: 0, background: '#120e2e', border: '1px solid var(--card-border)', borderRadius: '12px', zIndex: 10, maxHeight: '200px', overflowY: 'auto', padding: '5px 0' }}>
                                    {suggestionsStart.map((city, idx) => (
                                        <li 
                                            key={idx} 
                                            style={{ padding: '8px 15px', cursor: 'pointer', hover: { background: '#8b5cf6' } }}
                                            onClick={() => selectStartSuggestion(city)}
                                            onMouseEnter={(e) => e.target.style.background = '#8b5cf6'}
                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                        >
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Swap Button */}
                        <button className="btn btn-light swap-icon" onClick={handleSwap} style={{ width: '45px', height: '45px', padding: '0 !important', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaExchangeAlt />
                        </button>

                        {/* End City Input & Suggestion Box */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '15px', top: '18px', color: '#8b5cf6', pointerEvents: 'none' }}>
                                <FaMapMarkerAlt />
                            </div>
                            <input 
                                type="text" 
                                name="end" 
                                placeholder="Destination City" 
                                className="selectpicker" 
                                style={{ paddingLeft: '40px' }}
                                value={end} 
                                onChange={handleToCity}
                                required
                                autoComplete="off"
                            />
                            {suggestionsEnd.length > 0 && (
                                <ul style={{ position: 'absolute', top: '55px', left: 0, right: 0, background: '#120e2e', border: '1px solid var(--card-border)', borderRadius: '12px', zIndex: 10, maxHeight: '200px', overflowY: 'auto', padding: '5px 0' }}>
                                    {suggestionsEnd.map((city, idx) => (
                                        <li 
                                            key={idx} 
                                            style={{ padding: '8px 15px', cursor: 'pointer' }}
                                            onClick={() => selectEndSuggestion(city)}
                                            onMouseEnter={(e) => e.target.style.background = '#8b5cf6'}
                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                        >
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Date Picker */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '15px', top: '18px', color: '#8b5cf6', pointerEvents: 'none' }}>
                                <FaCalendarAlt />
                            </div>
                            <input 
                                type="date" 
                                name="date" 
                                className="selectpicker"
                                style={{ paddingLeft: '40px' }}
                                value={date} 
                                onChange={handleDate}
                                required
                            />
                        </div>

                        <input type="submit" className="btn btn-success" value="Search" />
                    </form>
                    
                    <div className="temp1">
                        Are you a New User?
                        <Link to="/register">Register Here</Link>
                    </div>
                </div>
            </div>

            {/* Popular Routes Section */}
            <div style={{ maxWidth: '1100px', margin: '4rem auto 2rem auto', padding: '0 1.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaRoute style={{ color: '#8b5cf6' }} /> Popular Travel Routes
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                    {popularRoutesList.map((route, index) => (
                        <div 
                            key={index} 
                            className="card" 
                            style={{ padding: '1.5rem', cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}
                            onClick={() => handlePopularRouteClick(route.from, route.to)}
                        >
                            <h4 style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {route.from} <FaExchangeAlt style={{ fontSize: '0.8rem', color: '#8b5cf6' }} /> {route.to}
                            </h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '5px' }}>
                                {route.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Counter Section */}
            <div style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', padding: '3rem 0', margin: '3rem 0' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center', padding: '0 1.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#8b5cf6' }}>500+</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>Active Bus Routes</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#10b981' }}>50+</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>Major Indian Cities</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ec4899' }}>10K+</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>Happy Travelers</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f59e0b' }}>4.8★</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>Average Travel Rating</p>
                    </div>
                </div>
            </div>

            {/* Tickets / Available Bus List Output Section */}
            <div className="tickets">{user}</div>

            {/* Customer Testimonials Section */}
            <div style={{ maxWidth: '1100px', margin: '2rem auto 5rem auto', padding: '0 1.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaQuoteLeft style={{ color: '#8b5cf6', fontSize: '1.25rem' }} /> What Our Passengers Say
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {testimonials.map((t, index) => (
                        <div key={index} className="card" style={{ padding: '2rem', background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)' }}>
                            <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
                                {[...Array(t.rating)].map((_, i) => (
                                    <FaStar key={i} style={{ color: '#f59e0b', fontSize: '0.85rem' }} />
                                ))}
                            </div>
                            <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                                "{t.text}"
                            </p>
                            <div style={{ marginTop: '1.25rem' }}>
                                <strong style={{ fontSize: '0.95rem', color: '#8b5cf6', display: 'block' }}>{t.name}</strong>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
    searchBuses: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { searchBuses })(Landing)
